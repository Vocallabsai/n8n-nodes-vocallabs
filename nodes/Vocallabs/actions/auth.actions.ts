import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, getAuthToken } from './http';

export async function getAuthInfo(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        // Use the shared getAuthToken (goes through the mutex)
        const token = await getAuthToken(ctx);

        // Make a separate call to get user info from the auth endpoint
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

        const userId = response.user_id || response.userId || response.client_id || response.id;

        return {
            success: true,
            auth_token: token,
            user_id: userId || 'Not provided',
            message: 'Token is cached and reused across operations. Use the user_id in other operations that require User ID.',
            full_response: response,
        };
    } catch (error: any) {
        let errorMessage = 'Failed to get authentication info';
        let statusCode = 500;

        if (error.response?.status) {
            statusCode = error.response.status;
        } else if (error.statusCode) {
            statusCode = error.statusCode;
        }

        if (error.response?.data) {
            const data = error.response.data;
            if (typeof data === 'string') {
                try {
                    const parsed = JSON.parse(data);
                    errorMessage = parsed.message || parsed.error || data;
                } catch (e) {
                    errorMessage = data;
                }
            } else if (typeof data === 'object') {
                errorMessage = data.message || data.error || data.detail || JSON.stringify(data);
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        throw new NodeApiError(ctx.getNode(), {
            message: errorMessage,
            httpCode: String(statusCode),
        });
    }
}
