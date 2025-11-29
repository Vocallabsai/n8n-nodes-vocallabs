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

    // Return cached token if still valid
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
                message: 'Authentication token not found in API response',
            });
        }

        // Cache token for 23 hours
        staticData.authToken = token;
        staticData.tokenExpiry = Date.now() + (23 * 60 * 60 * 1000);

        return token;
    } catch (error: any) {
        const { message, statusCode } = extractApiError(error);
        
        throw new NodeApiError(ctx.getNode(), {
            message: message,
            httpCode: String(statusCode),
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
        const { message, statusCode } = extractApiError(error);

        // Clear token cache on 401 (authentication expired)
        if (statusCode === 401) {
            const staticData = ctx.getWorkflowStaticData('node');
            delete staticData.authToken;
            delete staticData.tokenExpiry;
        }

        throw new NodeApiError(ctx.getNode(), {
            message: message,
            httpCode: String(statusCode),
        });
    }
}

// Helper function to extract clean error message from Axios error
function extractApiError(error: any): { message: string; statusCode: number } {
    let errorMessage = 'Request failed';
    let statusCode = 500;

    // Extract status code from various possible locations
    if (error.response?.status) {
        statusCode = error.response.status;
    } else if (error.statusCode) {
        statusCode = error.statusCode;
    }

    // Extract error message from Axios response data (where API errors are)
    if (error.response?.data) {
        const data = error.response.data;
        
        // If data is a string, try to parse it as JSON
        if (typeof data === 'string') {
            try {
                const parsed = JSON.parse(data);
                errorMessage = parsed.message || parsed.error || parsed.detail || data;
            } catch (e) {
                // If not JSON, use the string directly
                errorMessage = data;
            }
        } 
        // If data is an object, extract the message
        else if (typeof data === 'object') {
            errorMessage = data.message || data.error || data.detail || JSON.stringify(data);
        }
    } 
    // Fallback to error.message if no response data
    else if (error.message) {
        errorMessage = error.message;
    }

    return { message: errorMessage, statusCode };
}
