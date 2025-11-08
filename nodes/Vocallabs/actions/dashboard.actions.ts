import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getDashboardStats(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getDashboardStats`,
        });
    } catch (error: any) {
        const status = error.statusCode || error.response?.statusCode || error.httpCode || 500;
        const apiMsg = error.message || error.error || "Unknown error";
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get dashboard stats: ${apiMsg}. 
Suggestions: 1) Check VocalLabs API status 2) Confirm your credentials are valid 3) If IP-restricted, whitelist your server IP 4) If permissons error, ask your admin for access. Status: ${status}`,
            httpCode: String(status)
        });
    }
}

export async function getTokens(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getTokens`,
        });
    } catch (error: any) {
        const status = error.statusCode || error.response?.statusCode || error.httpCode || 500;
        const apiMsg = error.message || error.error || "Unknown error";
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get tokens: ${apiMsg}. 
Check: 1) Are you using the right user/credentials? 2) Is your IP whitelisted for the API? 3) Is your account/API token still active/enabled? Status: ${status}`,
            httpCode: String(status)
        });
    }
}
