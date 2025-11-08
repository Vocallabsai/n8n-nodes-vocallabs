import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl } from './http';

export async function getAuthInfo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const credentials = await ctx.getCredentials('vocallabsApi') as {
            clientId: string;
            clientSecret: string;
        };

        const response = await ctx.helpers.httpRequest({
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
        }) as any;

        const token = response.auth_token || response.token || response.access_token || response.authToken;
        const userId = response.user_id || response.userId || response.client_id || response.id;

        if (!token) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Authentication failed: Could not retrieve authentication token. Check your VocalLabs credentials (Client ID & Secret), or refresh them in Dashboard, then try again.',
                httpCode: '401',
            });
        }

        return {
            success: true,
            auth_token: token,
            user_id: userId || 'Not provided',
            token_expires_in: '24 hours',
            message: 'Use the user_id in other operations that require User ID',
            full_response: response,
        };
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || errorBody.error || error.message || 'Unknown error';

        // IP Whitelisting
        if (apiMessage.toLowerCase().includes('ip') && apiMessage.toLowerCase().includes('whitelisted')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `IP Not Whitelisted: ${apiMessage}. 
To fix:
1. Find your server's IP: curl ifconfig.me
2. VocalLabs Dashboard → Security
3. Add your IP to whitelist`,
                httpCode: String(statusCode),
            });
        }

        // Invalid credentials
        if (statusCode === 401 || statusCode === 403) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid credentials: ${apiMessage}. 
Fix:
1. Edit your VocalLabs credentials in n8n
2. Get new Client ID and Secret from VocalLabs Dashboard → API
3. Update credentials and try again`,
                httpCode: String(statusCode),
            });
        }

        // Generic/fallback
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get Auth Info: ${apiMessage}. See https://docs.vocallabs.ai/vocallabs for help.`,
            httpCode: String(statusCode || 500),
        });
    }
}
