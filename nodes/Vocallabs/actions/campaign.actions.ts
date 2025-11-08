import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validateCampaignId(ctx: IExecuteFunctions, campaign_id: string, operation: string): void {
    if (!campaign_id || campaign_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Campaign ID required for ${operation}. Use "Get Campaigns" to list all campaigns and copy a valid ID.`,
            httpCode: '400',
        });
    }
}

function validateAgentId(ctx: IExecuteFunctions, agent_id: string, operation: string): void {
    if (!agent_id || agent_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Agent ID required for ${operation}. Use "Get Agents" to list all agents and copy a valid ID.`,
            httpCode: '400',
        });
    }
}

export async function getCampaigns(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCampaigns`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get campaigns: ${error.message || ''}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function createCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const name = ctx.getNodeParameter('name', itemIndex) as string;
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

        if (!name || name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Campaign name is required.',
                httpCode: '400',
            });
        }
        if (name.length > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Campaign name too long (max 100 chars).',
                httpCode: '400',
            });
        }
        validateAgentId(ctx, agent_id, 'Create Campaign');

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createCampaign`,
            body: { name, agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent ID "${ctx.getNodeParameter('agent_id', itemIndex)}" does not exist. Use "Get Agents" to check.`,
                httpCode: '404',
            });
        }
        if (statusCode === 400 && apiMessage.toLowerCase().includes('duplicate')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign "${ctx.getNodeParameter('name', itemIndex)}" already exists. Choose a different name.`,
                httpCode: '400',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to create campaign: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function updateCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        const campaign_name = ctx.getNodeParameter('campaign_name', itemIndex) as string;

        validateCampaignId(ctx, campaign_id, 'Update Campaign');

        if (!campaign_name || campaign_name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'New campaign name is required.',
                httpCode: '400',
            });
        }
        if (campaign_name.length > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Campaign name too long (max 100 chars).',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateCampaign`,
            body: { campaign_id, campaign_name },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" does not exist. Use "Get Campaigns" to check.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update campaign: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function deleteCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        validateCampaignId(ctx, id, 'Delete Campaign');

        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteCampaign`,
            body: { id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" does not exist. Use "Get Campaigns" to verify.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to delete campaign: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getQueueingDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        validateCampaignId(ctx, campaign_id, 'Get Queueing Details');
        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Limit must be between 1 and 100.',
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Offset cannot be negative.',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getQueueingDetails`,
            qs: { limit, offset, campaign_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" not found. Use "Get Campaigns" to check.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get queueing details: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        validateCampaignId(ctx, campaign_id, 'Get Campaign Status');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCampaignStatus`,
            qs: { campaign_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" not found. Use "Get Campaigns" to check.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get campaign status: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function updateCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        const active = ctx.getNodeParameter('active', itemIndex) as boolean;

        validateCampaignId(ctx, campaign_id, 'Update Campaign Status');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateCampaignStatus`,
            body: { campaign_id, active },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" not found. Use "Get Campaigns" to check.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update campaign status: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function addContactsToCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const user_id = ctx.getNodeParameter('user_id', itemIndex) as string;
        const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
        const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;

        if (!user_id || user_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'User ID is required. Get it from Auth → Get Auth Info.',
                httpCode: '400',
            });
        }
        validateCampaignId(ctx, campaign_id, 'Add Contacts to Campaign');
        if (!prospect_group_id || prospect_group_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Prospect group ID is required. Use "Get Contact Groups" or create a new one.',
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/addContactsToCampaign`,
            body: { user_id, campaign_id, prospect_group_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || error.message || '';

        if (statusCode === 404) {
            if (apiMessage.toLowerCase().includes('campaign')) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Campaign ID "${ctx.getNodeParameter('campaign_id', itemIndex)}" not found. Use "Get Campaigns" to check.`,
                    httpCode: '404',
                });
            } else if (apiMessage.toLowerCase().includes('group')) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Prospect group ID "${ctx.getNodeParameter('prospect_group_id', itemIndex)}" not found. Use "Get Contact Groups" to check.`,
                    httpCode: '404',
                });
            } else {
                throw new NodeApiError(ctx.getNode(), {
                    message: 'Campaign or prospect group not found. Check your IDs.',
                    httpCode: '404',
                });
            }
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to add contacts to campaign: ${apiMessage}`,
            httpCode: String(statusCode || 500),
        });
    }
}
