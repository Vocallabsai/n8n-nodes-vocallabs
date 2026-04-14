import { IExecuteFunctions, IHttpRequestOptions, NodeApiError } from 'n8n-workflow';

export const baseUrl = 'https://api.superflow.run';

/**
 * Makes an authenticated API request using n8n's built-in credential system.
 * On auth error (401 or 502 bad gateway): retries once with a fresh token.
 */
export async function request(
    ctx: IExecuteFunctions,
    options: IHttpRequestOptions,
): Promise<any> {
    const reqOptions: IHttpRequestOptions = {
        ...options,
        json: options.json !== undefined ? options.json : true,
    };

    try {
        return await ctx.helpers.httpRequestWithAuthentication.call(
            ctx, 'vocallabsApi', reqOptions,
        );
    } catch (error: any) {
        const { message, statusCode } = extractApiError(error);

        // On auth error, retry once — n8n will call preAuthentication to refresh the token
        if (isAuthError(statusCode, message)) {
            try {
                return await ctx.helpers.httpRequestWithAuthentication.call(
                    ctx, 'vocallabsApi', reqOptions,
                );
            } catch (retryError: any) {
                const retry = extractApiError(retryError);
                throw new NodeApiError(ctx.getNode(), {
                    message: retry.message,
                    httpCode: String(retry.statusCode),
                });
            }
        }

        throw new NodeApiError(ctx.getNode(), {
            message,
            httpCode: String(statusCode),
        });
    }
}

function isAuthError(statusCode: number, message: string): boolean {
    if (statusCode === 401) return true;
    const msg = message.toLowerCase();
    // VocalLabs API returns 502 with HTML when token is invalid (not standard 401)
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
