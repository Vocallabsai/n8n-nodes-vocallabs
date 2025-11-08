import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function fetchAvailableNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid limit: Must be between 1 and 100.',
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid offset: Value cannot be negative.',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/fetchAvailableNumbers`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to fetch available numbers: ${error.message || 'Unknown error.'} ${error.statusCode ? `Status: ${error.statusCode}` : ''}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid limit: Must be between 1 and 100.',
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid offset: Value cannot be negative.',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getNumbers`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get your numbers: ${error.message || 'Unknown error.'} ${error.statusCode ? `Status: ${error.statusCode}` : ''}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function fetchCountries(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid limit: Must be between 1 and 100.',
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid offset: Value cannot be negative.',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/fetchCountries`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to fetch countries: ${error.message || 'Unknown error.'} ${error.statusCode ? `Status: ${error.statusCode}` : ''}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}
