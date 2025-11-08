import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

// Helpers - always put error detail in "message" for n8n UI
function validatePhoneNumber(ctx: IExecuteFunctions, phone: string, fieldName: string): void {
    if (!phone || phone.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `${fieldName} required. Phone cannot be empty.`,
            httpCode: '400',
        });
    }
    if (!phone.startsWith('+')) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Invalid phone format: ${phone}. Phone must start with + and country code. Example: +919876543210 (India), +1234567890 (US)`,
            httpCode: '400',
        });
    }
}

function validateAgentId(ctx: IExecuteFunctions, agent_id: string, operation: string): void {
    if (!agent_id || agent_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Agent ID required for ${operation}. Use "Get Agents" to locate valid agent IDs.`,
            httpCode: '400',
        });
    }
}

function validateProspectId(ctx: IExecuteFunctions, prospect_id: string, operation: string): void {
    if (!prospect_id || prospect_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Prospect ID required for ${operation}. Use "Get Contacts" to locate valid prospect IDs.`,
            httpCode: '400',
        });
    }
}

function validateCallId(ctx: IExecuteFunctions, call_id: string, operation: string): void {
    if (!call_id || call_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Call ID required for ${operation}. Use "Initiate Call" or "Get Daily Calls" to get valid Call IDs.`,
            httpCode: '400',
        });
    }
}

// Actions

export async function initiateCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agentId = ctx.getNodeParameter('agentId', itemIndex) as string;
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

        validateAgentId(ctx, agentId, 'Initiate Call');
        validateProspectId(ctx, prospect_id, 'Initiate Call');

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/initiateVocallabsCall`,
            body: { agentId, prospect_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent or Prospect not found. Verify Agent ID and Prospect ID exist ("Get Agents", "Get Contacts").`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to initiate call: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function createDirectCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const client_token_id = ctx.getNodeParameter('client_token_id', itemIndex) as string;
        const number = ctx.getNodeParameter('number', itemIndex) as string;

        if (!client_token_id || client_token_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Client Token ID required. Use Dashboard > Get Tokens operation to retrieve one.`,
                httpCode: '400',
            });
        }
        validatePhoneNumber(ctx, number, 'Phone Number');

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createDirectCall`,
            body: { client_token_id, number },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Client Token "${ctx.getNodeParameter('client_token_id', itemIndex)}" not found. Use Dashboard > Get Tokens.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to create direct call: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getCallDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const callId = ctx.getNodeParameter('callId', itemIndex) as string;
        validateCallId(ctx, callId, 'Get Call Details');

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
                message: `Call ID "${ctx.getNodeParameter('callId', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call details: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getVoices(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getVoices`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get voices: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getCallAPITokens(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallAPITokens`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call API tokens: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function callAPI(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const from = ctx.getNodeParameter('from', itemIndex) as string;
        const number = ctx.getNodeParameter('number', itemIndex) as string;

        validatePhoneNumber(ctx, from, 'From (DID)');
        validatePhoneNumber(ctx, number, 'Phone Number');

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/initiateCallWebhook`,
            body: { from, number },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to initiate call via webhook: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getCallTimeline(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const phone_to = ctx.getNodeParameter('phone_to', itemIndex) as string;
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        validatePhoneNumber(ctx, phone_to, 'Phone To');

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid limit value: ${limit}. Limit must be 1-100.`,
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid offset value: ${offset}. Offset cannot be negative.`,
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getCallTimeline`,
            qs: { phone_to, limit, offset },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call timeline: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getDailyCalls(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const start_date = ctx.getNodeParameter('start_date', itemIndex) as string;

        if (!start_date || start_date.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Start date required (format: YYYY-MM-DD).`,
                httpCode: '400',
            });
        }
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(start_date)) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid date "${start_date}". Format must be YYYY-MM-DD. Example: 2025-11-08`,
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getDailyCalls`,
            qs: { start_date },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get daily calls: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getWebsocketUrl(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agentId', itemIndex) as string;
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

        validateAgentId(ctx, agent_id, 'Get WebSocket URL');
        validateProspectId(ctx, prospect_id, 'Get WebSocket URL');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getWebsocketUrl`,
            qs: { agent_id, prospect_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Either agent or prospect does not exist. Double-check Agent ID/Prospect ID.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get WebSocket URL: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getAudit(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const call_id = ctx.getNodeParameter('callId', itemIndex) as string;
        validateCallId(ctx, call_id, 'Get Audit');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getOneAudit`,
            qs: { call_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `No audit data found for Call ID "${ctx.getNodeParameter('callId', itemIndex)}".`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get call audit: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getAllAudits(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAllAudits`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get all audits: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function uploadAudio(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agentId', itemIndex) as string;
        const recording_url = ctx.getNodeParameter('recording_url', itemIndex) as string[];

        validateAgentId(ctx, agent_id, 'Upload Audio');

        if (!recording_url || recording_url.length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Provide at least one audio file URL to upload.`,
                httpCode: '400',
            });
        }

        recording_url.forEach((url, index) => {
            try {
                new URL(url);
            } catch {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Invalid URL at index ${index}: ${url} (must be valid HTTP/HTTPS)`,
                    httpCode: '400',
                });
            }
        });

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/uploadAudits`,
            body: { agent_id, recording_url },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent ID "${ctx.getNodeParameter('agentId', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to upload audio: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}
