import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function createSIPCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const phone_number = ctx.getNodeParameter('phone_number', itemIndex) as string;
    const did = ctx.getNodeParameter('did', itemIndex) as string;
    const websocket_url = ctx.getNodeParameter('websocket_url', itemIndex) as string;
    const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex) as string;
    const sample_rate = ctx.getNodeParameter('sample_rate', itemIndex) as string;

    if (!phone_number || phone_number.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Phone number is required',
            httpCode: '400',
        });
    }

    if (!did || did.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'DID is required',
            httpCode: '400',
        });
    }

    if (!websocket_url || websocket_url.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'WebSocket URL is required',
            httpCode: '400',
        });
    }

    if (!webhook_url || webhook_url.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Webhook URL is required',
            httpCode: '400',
        });
    }

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/createSIPCall`,
        body: {
            phone_number,
            did,
            websocket_url,
            webhook_url,
            sample_rate,
        },
    });
}
