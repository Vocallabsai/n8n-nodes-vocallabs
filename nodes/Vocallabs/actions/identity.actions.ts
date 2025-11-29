import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getFlows(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getFlows`,
    });
}

export async function getIdentityUrl(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const flow_id = ctx.getNodeParameter('flow_id', itemIndex) as string;
    const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
    const verification_type = ctx.getNodeParameter('verification_type', itemIndex) as string;
    const created_at = ctx.getNodeParameter('created_at', itemIndex, '') as string;

    // Validate created_at if provided
    if (created_at && created_at.trim().length > 0) {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
        if (!isoDateRegex.test(created_at)) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid created_at format: ${created_at}. Must be ISO8601 UTC (e.g., 2025-10-09T12:05:17.875Z)`,
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
}
