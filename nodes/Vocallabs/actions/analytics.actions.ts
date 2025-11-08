import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validateCallId(ctx: IExecuteFunctions, call_id: string, operation: string): void {
    if (!call_id || call_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Call ID Required. 
Missing for operation '${operation}'. 
How to get: Use "Initiate Call" or "Get Daily Calls". 
Format: call_abc123xyz. See docs: https://docs.vocallabs.ai/vocallabs`,
            httpCode: '400',
        });
    }
}

function validateAgentId(ctx: IExecuteFunctions, agent_id: string, operation: string): void {
    if (!agent_id || agent_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Agent ID Required. 
Missing for operation '${operation}'. 
How to get: Use "Get Agents" operation. 
Format: agent_abc123xyz. See docs: https://docs.vocallabs.ai/vocallabs`,
            httpCode: '400',
        });
    }
}

export async function getCallStatuses(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallStatuses`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call statuses: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getCallConversation(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, call_id, 'Get Call Conversation');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallConversation`,
            qs: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call not found. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist or has no conversation data.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call conversation: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, call_id, 'Get Call Data');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallData`,
            qs: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call not found. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call data: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getCallStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, call_id, 'Get Call Status');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallStatus`,
            qs: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call not found. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call status: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getCallSummary(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, call_id, 'Get Call Summary');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallSummary`,
            qs: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call summary not available. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist or summary not generated.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call summary: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getPostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Post Call Data');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getPostCallData`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent not found. Agent ID "${ctx.getNodeParameter('agent_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get post call data: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function updatePostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        const key = ctx.getNodeParameter('key', itemIndex) as string;
        const prompt = ctx.getNodeParameter('prompt', itemIndex) as string;

        validateCallId(ctx, call_id, 'Update Post Call Data');

        if (!key || key.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Key required for post-call data. Cannot be empty.`,
                httpCode: '400',
            });
        }

        if (!prompt || prompt.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Prompt required for post-call extraction. Cannot be empty.`,
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updatePostCallData`,
            body: { call_id, key, prompt },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call not found for post-call data. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update post call data: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function deletePostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, call_id, 'Delete Post Call Data');

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/deletePostCallData`,
            body: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `No post call data found to delete for "${ctx.getNodeParameter('call_id', itemIndex)}".`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to delete post call data: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getVocallabsCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const callId = ctx.getNodeParameter('call_id', itemIndex) as string;
        validateCallId(ctx, callId, 'Get VocalLabs Call Data');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getVocallabsCall`,
            qs: { callId },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Call not found. Call ID "${ctx.getNodeParameter('call_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get VocalLabs call data: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}
