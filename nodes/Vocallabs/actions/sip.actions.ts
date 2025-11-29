import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function createSIPCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const phone_number = ctx.getNodeParameter('phone_number', itemIndex) as string;
        const did = ctx.getNodeParameter('did', itemIndex) as string;
        const websocket_url = ctx.getNodeParameter('websocket_url', itemIndex) as string;
        const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex) as string;
        const sample_rate = ctx.getNodeParameter('sample_rate', itemIndex) as string;

        // Basic client-side validation only
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

        // Let the API handle the actual call
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
    } catch (error: any) {
        // If it's already a NodeApiError from our validation, re-throw it
        if (error.constructor.name === 'NodeApiError') {
            throw error;
        }

        // Extract actual API error
        let errorMessage = 'Failed to create SIP call';
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
