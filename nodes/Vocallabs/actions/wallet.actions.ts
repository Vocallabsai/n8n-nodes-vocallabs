import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getBalance(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/getGreenBalance`,
    });
}

export async function getTransactionHistory(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const limit = ctx.getNodeParameter('limit', itemIndex) as number;
    const offset = ctx.getNodeParameter('offset', itemIndex) as number;

    // Client-side validation for limit
    if (limit < 1 || limit > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Limit must be between 1 and 100',
            httpCode: '400',
        });
    }

    // Client-side validation for offset
    if (offset < 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Offset cannot be negative',
            httpCode: '400',
        });
    }

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/whatsubTransactionHistory`,
        qs: { limit, offset },
    });
}
