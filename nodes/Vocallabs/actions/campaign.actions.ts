import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validateCampaignId(ctx: IExecuteFunctions, campaign_id: string, operation: string): void {
    if (!campaign_id || campaign_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Campaign ID required for ${operation}`,
        });
    }
}

function validateAgentId(ctx: IExecuteFunctions, agent_id: string, operation: string): void {
    if (!agent_id || agent_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Agent ID required for ${operation}`,
        });
    }
}

export async function getCampaigns(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCampaigns`,
    });
}

export async function createCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = ctx.getNodeParameter('name', itemIndex) as string;
    const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

    if (!name || name.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Campaign name is required',
        });
    }
    if (name.length > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Campaign name too long (max 100 characters)',
        });
    }
    validateAgentId(ctx, agent_id, 'Create Campaign');

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/createCampaign`,
        body: { name, agent_id },
    });
}

export async function updateCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    const campaign_name = ctx.getNodeParameter('campaign_name', itemIndex) as string;

    validateCampaignId(ctx, campaign_id, 'Update Campaign');

    if (!campaign_name || campaign_name.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'New campaign name is required',
        });
    }
    if (campaign_name.length > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Campaign name too long (max 100 characters)',
        });
    }

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/updateCampaign`,
        body: { campaign_id, campaign_name },
    });
}

export async function deleteCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    validateCampaignId(ctx, id, 'Delete Campaign');

    return await request(ctx, {
        method: 'DELETE',
        url: `${baseUrl}/b2b/vocallabs/deleteCampaign`,
        body: { id },
    });
}

export async function getQueueingDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    const limit = ctx.getNodeParameter('limit', itemIndex) as number;
    const offset = ctx.getNodeParameter('offset', itemIndex) as number;

    validateCampaignId(ctx, campaign_id, 'Get Queueing Details');
    
    if (limit < 1 || limit > 100) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Limit must be between 1 and 100',
        });
    }
    if (offset < 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Offset cannot be negative',
        });
    }

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getQueueingDetails`,
        qs: { limit, offset, campaign_id },
    });
}

export async function getCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    validateCampaignId(ctx, campaign_id, 'Get Campaign Status');
    
    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCampaignStatus`,
        qs: { campaign_id },
    });
}

export async function updateCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    const active = ctx.getNodeParameter('active', itemIndex) as boolean;

    validateCampaignId(ctx, campaign_id, 'Update Campaign Status');
    
    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/updateCampaignStatus`,
        body: { campaign_id, active },
    });
}

export async function addContactsToCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const user_id = ctx.getNodeParameter('user_id', itemIndex) as string;
    const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
    const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;

    if (!user_id || user_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'User ID is required',
        });
    }
    validateCampaignId(ctx, campaign_id, 'Add Contacts to Campaign');
    if (!prospect_group_id || prospect_group_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: 'Prospect group ID is required',
        });
    }

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/addContactsToCampaign`,
        body: { user_id, campaign_id, prospect_group_id },
    });
}
