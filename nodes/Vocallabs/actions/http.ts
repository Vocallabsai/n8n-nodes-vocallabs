import { IExecuteFunctions, IHttpRequestOptions, NodeApiError } from 'n8n-workflow';

export const baseUrl = 'https://api.superflow.run';

export async function getAuthToken(ctx: IExecuteFunctions): Promise<string> {
    const credentials = await ctx.getCredentials('vocallabsApi') as {
        clientId: string;
        clientSecret: string;
    };

    const staticData = ctx.getWorkflowStaticData('node');
    const cachedToken = staticData.authToken as string | undefined;
    const tokenExpiry = staticData.tokenExpiry as number | undefined;

    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    try {
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
                message: 'Authentication token not found in API response. Please check your VocalLabs credentials.',
                httpCode: '401',
            });
        }

        staticData.authToken = token;
        staticData.tokenExpiry = Date.now() + (23 * 60 * 60 * 1000);

        return token;
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || errorBody.error || error.message || 'Authentication failed';

        if (apiMessage.toLowerCase().includes('ip') && apiMessage.toLowerCase().includes('whitelisted')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `IP Not Whitelisted: ${apiMessage}. To fix: 1) Find your IP with 'curl ifconfig.me' 2) Go to VocalLabs Dashboard → Security 3) Add your IP to whitelist`,
                httpCode: String(statusCode),
            });
        }

        if (statusCode === 401 || statusCode === 403) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid credentials: ${apiMessage}. Update your credentials: 1) VocalLabs Dashboard → API Settings 2) Copy new Client ID and Secret 3) Update n8n credentials`,
                httpCode: String(statusCode),
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Authentication failed: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function request(
    ctx: IExecuteFunctions,
    options: IHttpRequestOptions,
): Promise<any> {
    const token = await getAuthToken(ctx);

    const requestOptions: IHttpRequestOptions = {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {}),
        },
        json: options.json !== undefined ? options.json : true,
    };

    try {
        return await ctx.helpers.httpRequest(requestOptions);
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || errorBody.error || errorBody.detail || error.message || 'Request failed';

        // 401 - Authentication
        if (statusCode === 401) {
            const staticData = ctx.getWorkflowStaticData('node');
            delete staticData.authToken;
            delete staticData.tokenExpiry;

            throw new NodeApiError(ctx.getNode(), {
                message: `Session expired: ${apiMessage}. The workflow will retry automatically. If this persists, update your credentials.`,
                httpCode: '401',
            });
        }

        // 403 - Permission/IP Whitelisting
        if (statusCode === 403) {
            if (apiMessage.toLowerCase().includes('ip') && 
                (apiMessage.toLowerCase().includes('whitelisted') || apiMessage.toLowerCase().includes('not allowed'))) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `IP Not Whitelisted: ${apiMessage}. Fix: 1) Find IP: curl ifconfig.me 2) VocalLabs Dashboard → Security 3) Add IP to whitelist`,
                    httpCode: '403',
                });
            }

            throw new NodeApiError(ctx.getNode(), {
                message: `Access denied: ${apiMessage}. Check: 1) Feature in your plan 2) IP whitelisting settings 3) API permissions`,
                httpCode: '403',
            });
        }

        // 400 - Validation
        if (statusCode === 400) {
            if (apiMessage.toLowerCase().includes('phone')) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Invalid phone number: ${apiMessage}. Phone must include + and country code. Valid: +919876543210, Invalid: 9876543210`,
                    httpCode: '400',
                });
            }

            if (apiMessage.toLowerCase().includes('json') || apiMessage.toLowerCase().includes('parse')) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Invalid JSON: ${apiMessage}. Use double quotes: {"key": "value"}. Example: {"email": "test@example.com"}`,
                    httpCode: '400',
                });
            }

            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid request: ${apiMessage}. Check: 1) All required fields filled 2) Data format correct 3) IDs exist. Details: ${JSON.stringify(errorBody)}`,
                httpCode: '400',
            });
        }

        // 404 - Not Found
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Resource not found: ${apiMessage}. Verify: 1) ID is correct 2) Resource wasn't deleted 3) You have access`,
                httpCode: '404',
            });
        }

        // 429 - Rate Limit
        if (statusCode === 429) {
            const retryAfter = error.response?.headers?.['retry-after'] || '60';
            throw new NodeApiError(ctx.getNode(), {
                message: `Rate limit exceeded. Wait ${retryAfter} seconds before retrying. To avoid: 1) Add delays 2) Use pagination 3) Upgrade plan`,
                httpCode: '429',
            });
        }

        // 500+ - Server Errors
        if (statusCode >= 500) {
            if (apiMessage.toLowerCase().includes('already exists') || 
                apiMessage.toLowerCase().includes('duplicate') ||
                (apiMessage.toLowerCase().includes('contact') && apiMessage.toLowerCase().includes('exists'))) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact already exists: ${apiMessage}. Options: 1) Use different phone number 2) Delete existing contact first 3) Update existing contact instead`,
                    httpCode: String(statusCode),
                });
            }

            throw new NodeApiError(ctx.getNode(), {
                message: `VocalLabs server error (${statusCode}): ${apiMessage}. This is temporary. Try: 1) Wait a few minutes 2) Check VocalLabs status 3) Contact support if persists. Details: ${JSON.stringify(errorBody)}`,
                httpCode: String(statusCode),
            });
        }

        // Network Errors
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || 
            error.code === 'ENOTFOUND' || error.code === 'ECONNRESET') {
            throw new NodeApiError(ctx.getNode(), {
                message: `Connection failed (${error.code}). Check: 1) Internet connection 2) Firewall allows api.superflow.run 3) VocalLabs API status`,
                httpCode: '0',
            });
        }

        // Unknown Errors
        throw new NodeApiError(ctx.getNode(), {
            message: `Request failed${statusCode ? ` (${statusCode})` : ''}: ${apiMessage}. ${Object.keys(errorBody).length > 0 ? `API response: ${JSON.stringify(errorBody)}` : ''}`,
            httpCode: String(statusCode || 500),
        });
    }
}
