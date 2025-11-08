import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getFlows(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getFlows`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get flows: ${error.message}. Try again later, or check your VocalLabs connection and permissions.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getIdentityUrl(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const flow_id = ctx.getNodeParameter('flow_id', itemIndex) as string;
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
        const verification_type = ctx.getNodeParameter('verification_type', itemIndex) as string;
        const created_at = ctx.getNodeParameter('created_at', itemIndex, '') as string;

        if (!flow_id || flow_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Flow ID missing. Use "Get Flows" to list available flows before requesting an identity URL.',
                httpCode: '400',
            });
        }

        if (!prospect_id || prospect_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Prospect ID missing. Use "Get Contacts" to find valid prospect IDs.',
                httpCode: '400',
            });
        }

        if (created_at && created_at.trim().length > 0) {
            const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
            if (!isoDateRegex.test(created_at)) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Invalid created_at: ${created_at}. Must be ISO8601 UTC, e.g. 2025-10-09T12:05:17.875Z`,
                    httpCode: '400',
                });
            }
        }

        const body: any = {
            flow_id,
            prospect_id,
            verification_type,
        };

        if (created_at) {
            body.created_at = created_at;
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/getIdentityUrl`,
            body,
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `No matching flow or prospect found. Please double-check both: Flow ID (${ctx.getNodeParameter('flow_id', itemIndex)}), Prospect ID (${ctx.getNodeParameter('prospect_id', itemIndex)}). Use "Get Flows" and "Get Contacts" to verify.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get Identity URL: ${error.message}. Retry or check parameters.`,
            httpCode: String(statusCode || 500),
        });
    }
}
