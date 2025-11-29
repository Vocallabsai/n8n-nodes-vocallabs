import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function fetchAvailableNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const limit = ctx.getNodeParameter('limit', itemIndex) as number;
    const offset = ctx.getNodeParameter('offset', itemIndex) as number;

    if (limit < 1 || limit > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Limit must be between 1 and 100',
            httpCode: '400',
        });
    }
    if (offset < 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Offset cannot be negative',
            httpCode: '400',
        });
    }

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/fetchAvailableNumbers`,
        qs: { limit, offset },
    });
}

export async function getNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const limit = ctx.getNodeParameter('limit', itemIndex) as number;
    const offset = ctx.getNodeParameter('offset', itemIndex) as number;

    if (limit < 1 || limit > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Limit must be between 1 and 100',
            httpCode: '400',
        });
    }
    if (offset < 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Offset cannot be negative',
            httpCode: '400',
        });
    }

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getNumbers`,
        qs: { limit, offset },
    });
}

export async function fetchCountries(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const limit = ctx.getNodeParameter('limit', itemIndex) as number;
    const offset = ctx.getNodeParameter('offset', itemIndex) as number;

    if (limit < 1 || limit > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Limit must be between 1 and 100',
            httpCode: '400',
        });
    }
    if (offset < 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Offset cannot be negative',
            httpCode: '400',
        });
    }

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/fetchCountries`,
        qs: { limit, offset },
    });
}
