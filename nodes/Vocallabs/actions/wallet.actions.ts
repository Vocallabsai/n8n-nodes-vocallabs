import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getBalance(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/getGreenBalance`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Wallet balance fetch failed: ${error.message || 'Unknown error'}. 
            Check: 1) Your internet/API connection 2) Credentials/IP whitelist 3) Contact support if needed.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getTransactionHistory(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid value for Limit. Limit must be between 1 and 100. Example: 10',
                httpCode: '400',
            });
        }

        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid value for Offset. Offset cannot be negative. Example: 0',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/whatsubTransactionHistory`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Transaction history fetch failed: ${error.message || 'Unknown error'}. 
            Check: 1) Inputs/parameters 2) Connection/credentials 3) Contact support if repeated.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}
