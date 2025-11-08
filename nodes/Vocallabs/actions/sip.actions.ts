import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function createSIPCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const phone_number = ctx.getNodeParameter('phone_number', itemIndex) as string;
        const did = ctx.getNodeParameter('did', itemIndex) as string;
        const websocket_url = ctx.getNodeParameter('websocket_url', itemIndex) as string;
        const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex) as string;
        const sample_rate = ctx.getNodeParameter('sample_rate', itemIndex) as string;

        if (!phone_number || phone_number.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Phone number required. The phone number field cannot be empty.',
                httpCode: '400',
            });
        }

        if (!phone_number.startsWith('+')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid phone format: Phone must start with + and country code. Example: +1234567890 (US), +447700900000 (UK), +919876543210 (India). Got: ${phone_number}`,
                httpCode: '400',
            });
        }

        if (!did || did.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'DID required. Direct Inward Dialing number cannot be empty.',
                httpCode: '400',
            });
        }

        if (!websocket_url || websocket_url.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'WebSocket URL required. You must provide a URL to a websocket server endpoint.',
                httpCode: '400',
            });
        }

        try {
            const wsUrl = new URL(websocket_url);
            if (!wsUrl.protocol.startsWith('ws')) {
                throw new Error('Invalid WebSocket protocol');
            }
        } catch {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid WebSocket URL: Must start with ws:// or wss://. Example: wss://your-websocket-server.com/audio. Got: ${websocket_url}`,
                httpCode: '400',
            });
        }

        if (!webhook_url || webhook_url.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Webhook URL required. You must provide a valid HTTP(S) webhook callback URL.',
                httpCode: '400',
            });
        }

        try {
            const hookUrl = new URL(webhook_url);
            if (!['http:', 'https:'].includes(hookUrl.protocol)) {
                throw new Error('Invalid webhook protocol');
            }
        } catch {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid Webhook URL: Webhook URL must start with http:// or https://. Example: https://your-server.com/webhook. Got: ${webhook_url}`,
                httpCode: '400',
            });
        }

        const sampleRateNum = parseInt(sample_rate, 10);
        if (isNaN(sampleRateNum) || sampleRateNum < 8000 || sampleRateNum > 48000) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid sample rate: Must be between 8000 and 48000. Common values: 8000 (telephone), 16000 (wideband), 24000 (super wideband), 48000 (full band). Got: ${sample_rate}`,
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
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || 'Unknown error';

        if (statusCode === 400) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid SIP Call: ${apiMessage}. Common mistakes: missing/invalid phone (+ required), wrong websocket URL, wrong webhook URL, bad sample rate. Details: ${JSON.stringify(errorBody)}`,
                httpCode: '400',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to Create SIP Call: ${apiMessage}. Status: ${statusCode}`,
            httpCode: String(statusCode || 500),
        });
    }
}
