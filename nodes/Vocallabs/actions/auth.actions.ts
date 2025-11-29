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
                message: 'Authentication token not found in response',
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
        // Extract the actual API error from Axios error
        let errorMessage = 'Failed to get authentication info';
        let statusCode = 500;

        // Get status code
        if (error.response?.status) {
            statusCode = error.response.status;
        } else if (error.statusCode) {
            statusCode = error.statusCode;
        }

        // Get the response data (this is where the API error message is)
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
