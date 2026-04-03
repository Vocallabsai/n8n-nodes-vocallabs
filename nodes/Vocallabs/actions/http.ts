import { IExecuteFunctions, IHttpRequestOptions, NodeApiError } from 'n8n-workflow';

export const baseUrl = 'https://api.superflow.run';

// ── Module-level token management (shared across all concurrent executions) ──
// Keyed by workflowId-nodeId so different workflows/credentials don't interfere
const _refreshPromises = new Map<string, Promise<string>>();
const _tokenCache = new Map<string, string>();

function getMutexKey(ctx: IExecuteFunctions): string {
    const credentialId = ctx.getNode().credentials?.vocallabsApi?.id || 'default';
    return `${ctx.getWorkflow().id}-${credentialId}`;
}

/**
 * Gets a valid auth token — either from cache or by refreshing.
 * Uses a Promise mutex so concurrent calls share a single refresh.
 */
async function getOrRefreshToken(ctx: IExecuteFunctions): Promise<string> {
    const key = getMutexKey(ctx);

    // If a refresh is already in progress for this workflow+node, wait for it
    const existing = _refreshPromises.get(key);
    if (existing) {
        return await existing;
    }

    // We're the first — start a new refresh
    const promise = fetchNewToken(ctx, key);
    _refreshPromises.set(key, promise);
    return await promise;
}

async function fetchNewToken(ctx: IExecuteFunctions, key: string): Promise<string> {
    try {
        const credentials = await ctx.getCredentials('vocallabsApi') as {
            clientId: string;
            clientSecret: string;
        };

        const options: IHttpRequestOptions = {
            method: 'POST',
            url: `${baseUrl}/b2b/createAuthToken/`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                clientId: credentials.clientId,
                clientSecret: credentials.clientSecret,
            },
            json: true,
        };

        const response = await ctx.helpers.httpRequest(options) as any;
        const token = response.auth_token || response.token || response.access_token || response.authToken;

        if (!token) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Authentication token not found in API response',
            });
        }

        // Store in both module-level cache (for concurrency) and staticData (for persistence)
        _tokenCache.set(key, token);
        const staticData = ctx.getWorkflowStaticData('node');
        staticData.authToken = token;

        return token;
    } catch (error: any) {
        const { message, statusCode } = extractApiError(error);
        throw new NodeApiError(ctx.getNode(), {
            message: message,
            httpCode: String(statusCode),
        });
    } finally {
        // Always clear the mutex so the next refresh cycle can start fresh
        _refreshPromises.delete(key);
    }
}

/**
 * Gets the current token from cache or staticData. Returns undefined if none.
 */
function getCachedToken(ctx: IExecuteFunctions): string | undefined {
    const key = getMutexKey(ctx);

    // Try module-level cache first (fast, handles concurrency)
    const cached = _tokenCache.get(key);
    if (cached) return cached;

    // Fall back to staticData (persists across n8n restarts)
    const staticData = ctx.getWorkflowStaticData('node');
    const persisted = staticData.authToken as string | undefined;
    if (persisted) {
        // Populate module-level cache for future concurrent requests
        _tokenCache.set(key, persisted);
    }
    return persisted;
}

/**
 * Invalidates the cached token so the next getOrRefreshToken() fetches a new one.
 */
function invalidateToken(ctx: IExecuteFunctions): void {
    const key = getMutexKey(ctx);
    _tokenCache.delete(key);
    const staticData = ctx.getWorkflowStaticData('node');
    delete staticData.authToken;
}

/**
 * Exported for auth.actions.ts — creates a fresh token (bypasses cache).
 */
export async function getAuthToken(ctx: IExecuteFunctions): Promise<string> {
    return await getOrRefreshToken(ctx);
}

/**
 * Makes an authenticated API request.
 * - Gets token from cache or fetches a new one before the first call
 * - On 401: refreshes token via mutex (1 refresh for all concurrent failures) and retries once
 */
export async function request(
    ctx: IExecuteFunctions,
    options: IHttpRequestOptions,
): Promise<any> {
    // Step 1: Ensure we have a token before making any request
    let token = getCachedToken(ctx);
    if (!token) {
        token = await getOrRefreshToken(ctx);
    }

    // Step 2: Make the request with the current token
    try {
        return await ctx.helpers.httpRequest(buildRequest(options, token));
    } catch (error: any) {
        const { message, statusCode } = extractApiError(error);

        // Step 3: On auth error, invalidate + refresh via mutex + retry ONCE
        if (isAuthError(statusCode, message)) {
            invalidateToken(ctx);
            const newToken = await getOrRefreshToken(ctx);
            // Retry with the fresh token — if this also fails, let it throw
            return await ctx.helpers.httpRequest(buildRequest(options, newToken));
        }

        throw new NodeApiError(ctx.getNode(), {
            message: message,
            httpCode: String(statusCode),
        });
    }
}

function buildRequest(options: IHttpRequestOptions, token: string): IHttpRequestOptions {
    return {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {}),
        },
        json: options.json !== undefined ? options.json : true,
    };
}

function isAuthError(statusCode: number, message: string): boolean {
    if (statusCode === 401) return true;
    const msg = message.toLowerCase();
    // VocalLabs API returns 502 with HTML when token is invalid (not standard 401)
    // Detect this by checking for 502 + Cloudflare HTML error page
    if (statusCode === 502 && msg.includes('bad gateway')) return true;
    return msg.includes('unauthorized')
        || msg.includes('invalid authorization')
        || msg.includes('expired token')
        || msg.includes('invalid token');
}

function extractApiError(error: any): { message: string; statusCode: number } {
    let errorMessage = 'Request failed';
    let statusCode = 500;

    if (error.response?.status) {
        statusCode = error.response.status;
    } else if (error.statusCode) {
        statusCode = error.statusCode;
    } else if (error.httpCode) {
        statusCode = Number(error.httpCode) || 500;
    }

    if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
            // Detect Cloudflare HTML error pages (502 for invalid auth, etc.)
            if (data.includes('<!DOCTYPE html>') || data.includes('<html')) {
                const titleMatch = data.match(/<title>(.*?)<\/title>/i);
                errorMessage = titleMatch
                    ? titleMatch[1].replace(/\s*\|\s*/, ' - ')
                    : `API returned ${statusCode} with HTML error page`;
            } else {
                try {
                    const parsed = JSON.parse(data);
                    errorMessage = parsed.message || parsed.error || parsed.detail || data;
                } catch (e) {
                    errorMessage = data;
                }
            }
        } else if (typeof data === 'object') {
            errorMessage = data.message || data.error || data.detail || JSON.stringify(data);
        }
    } else if (error.message) {
        errorMessage = error.message;
    }

    return { message: errorMessage, statusCode };
}
