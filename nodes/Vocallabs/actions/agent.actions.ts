import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validateAgentId(ctx: IExecuteFunctions, agent_id: string, operation: string): void {
    if (!agent_id || agent_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Agent ID required for "${operation}". 
How to fix: 1) Provide a valid Agent ID 2) Use 'Get Agents' to list all agents 3) Agent IDs look like: agent_abc123xyz`,
            httpCode: '400',
        });
    }
}

function validateJSON(ctx: IExecuteFunctions, jsonField: any, fieldName: string, operation: string): void {
    if (typeof jsonField === 'string') {
        try {
            JSON.parse(jsonField);
        } catch (error) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid JSON in ${fieldName} for "${operation}". 
Fix: Paste JSON into https://jsonlint.com. Example: {"name": "My Agent","welcome_message": "Hello!","language":"ENGLISH"}`,
                httpCode: '400',
            });
        }
    }
}

export async function getAgents(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;

        if (limit < 1 || limit > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Limit must be between 1 and 100',
                httpCode: '400',
            });
        }
        if (offset < 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Offset cannot be negative',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAIAgents`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to retrieve agents: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAgentById(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent By ID');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAIAgentByID`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent ID "${ctx.getNodeParameter('agent_id', itemIndex)}" not found. Use 'Get Agents' to see valid agent IDs.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function createAgent(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const name = ctx.getNodeParameter('name', itemIndex) as string;
        if (!name || name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Agent name cannot be empty',
                httpCode: '400',
            });
        }
        if (name.length > 100) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Agent name must be 100 characters or less',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createAIAgent`,
            body: { name },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        if (statusCode === 400 && errorBody.message?.toLowerCase().includes('duplicate')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `An agent named "${ctx.getNodeParameter('name', itemIndex)}" already exists. Use a different name or update the existing agent.`,
                httpCode: '400',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to create agent: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function updateAgent(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const updateData = ctx.getNodeParameter('updateData', itemIndex) as any;
        validateAgentId(ctx, agent_id, 'Update Agent');
        validateJSON(ctx, updateData, 'Update Data', 'Update Agent');
        const parsedData = typeof updateData === 'string' ? JSON.parse(updateData) : updateData;
        if (Object.keys(parsedData).length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Provide at least one field to update (name, inputs_needed, etc.)',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateAIAgent`,
            qs: { agent_id },
            body: { agent_id, ...parsedData },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Agent ID "${ctx.getNodeParameter('agent_id', itemIndex)}" does not exist.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update agent: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getAgentTemplates(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentTemplates`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent templates: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getVoicesByLanguage(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const language = ctx.getNodeParameter('language', itemIndex) as string;
        if (!language || language.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Language is required. Supported: ENGLISH, HINDI, SPANISH, FRENCH, GERMAN. See docs for the full list.',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getVoicesByLanguageComment`,
            qs: { language },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 400) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Language "${ctx.getNodeParameter('language', itemIndex)}" is not supported. Use UPPERCASE, e.g. ENGLISH. See docs for more.`,
                httpCode: '400',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get voices: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function toggleFavorite(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const favorite = ctx.getNodeParameter('favorite', itemIndex) as boolean;
        validateAgentId(ctx, agent_id, 'Toggle Favorite');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/toggleFavorite`,
            body: { agent_id, favorite },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to toggle favorite: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateAgentShared(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const isShared = ctx.getNodeParameter('isShared', itemIndex) as boolean;
        validateAgentId(ctx, agent_id, 'Update Agent Visibility');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateAgentShared`,
            body: { agent_id, isShared },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update agent visibility: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function agentPromptHistory(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent Prompt History');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/agentPromptHistory`,
            body: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent prompt history: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateSuccessMetric(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const success_metric = ctx.getNodeParameter('success_metric', itemIndex) as any;
        validateAgentId(ctx, agent_id, 'Update Success Metric');
        validateJSON(ctx, success_metric, 'Success Metric', 'Update Success Metric');
        const parsedMetric = typeof success_metric === 'string' ? JSON.parse(success_metric) : success_metric;
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateSuccessMetric`,
            body: { agent_id, success_metric: parsedMetric },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update success metric: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateWhatsappNotification(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const value = ctx.getNodeParameter('value', itemIndex) as boolean;
        validateAgentId(ctx, agent_id, 'Update WhatsApp Notification');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateWhatsappNotification`,
            body: { agent_id, value },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update WhatsApp notification: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateMailNotification(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const value = ctx.getNodeParameter('value', itemIndex) as boolean;
        validateAgentId(ctx, agent_id, 'Update Mail Notification');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateMailNotification`,
            body: { agent_id, value },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update mail notification: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAgentDocuments(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent Documents');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentDocuments`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent documents: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function insertAgentDocument(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const file_name = ctx.getNodeParameter('file_name', itemIndex) as string;
        const file_url = ctx.getNodeParameter('file_url', itemIndex) as string;
        const file_type = ctx.getNodeParameter('file_type', itemIndex) as string;
        const site_url = ctx.getNodeParameter('site_url', itemIndex) as string;
        const webcrawler_depth = ctx.getNodeParameter('webcrawler_depth', itemIndex) as number;
        const crawl_status = ctx.getNodeParameter('crawl_status', itemIndex) as string;

        if (!file_name || file_name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'File name cannot be empty',
                httpCode: '400',
            });
        }
        if (!file_url || file_url.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'File URL is required (must be http/https)',
                httpCode: '400',
            });
        }
        try {
            new URL(file_url);
        } catch {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid File URL: ${file_url}. Must start with http:// or https://`,
                httpCode: '400',
            });
        }
        if (!file_type || file_type.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Specify file type (PDF, DOCX, TXT, etc.)',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/insertAgentDocx`,
            body: { file_name, file_url, file_type, site_url, webcrawler_depth, crawl_status },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to insert agent document: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAIModels(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAIModels`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get AI models: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAgentActions(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent Actions');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentActions`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent actions: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateAgentReschedule(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const reschedule = ctx.getNodeParameter('reschedule', itemIndex) as boolean;
        validateAgentId(ctx, agent_id, 'Update Agent Reschedule');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateAgentReschedule`,
            body: { agent_id, reschedule },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update agent reschedule: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getKeywordReplacements(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Keyword Replacements');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getKeywordReplacements`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get keyword replacements: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAgentKeywords(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent Keywords');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentKeywords`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent keywords: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function addKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const objects = ctx.getNodeParameter('objects', itemIndex) as any;
        validateJSON(ctx, objects, 'Keywords', 'Add Keyword');
        const parsedObjects = typeof objects === 'string' ? JSON.parse(objects) : objects;
        if (!Array.isArray(parsedObjects)) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Keywords must be an array of objects: { agent_id, keyword, replacement }',
                httpCode: '400',
            });
        }
        if (parsedObjects.length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Provide at least one keyword object',
                httpCode: '400',
            });
        }
        parsedObjects.forEach((obj: any, index: number) => {
            if (!obj.agent_id || !obj.keyword || !obj.replacement) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Keyword object at index ${index} missing agent_id, keyword, or replacement`,
                    httpCode: '400',
                });
            }
        });
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/addKeyword`,
            body: { objects: parsedObjects },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to add keywords: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function updateKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const keyword_id = ctx.getNodeParameter('keyword_id', itemIndex) as string;
        const keyword = ctx.getNodeParameter('keyword', itemIndex) as string;
        const replacement = ctx.getNodeParameter('replacement', itemIndex) as string;
        if (!keyword_id || keyword_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Keyword ID is required for update',
                httpCode: '400',
            });
        }
        if (!keyword || keyword.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Keyword text is required for update',
                httpCode: '400',
            });
        }
        if (!replacement || replacement.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Replacement text is required for update',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateKeyword`,
            body: { keyword_id, keyword, replacement },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Keyword ID "${ctx.getNodeParameter('keyword_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update keyword: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function deleteKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const keyword_id = ctx.getNodeParameter('keyword_id', itemIndex) as string;
        if (!keyword_id || keyword_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Keyword ID required to delete keyword',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteKeyword`,
            qs: { keyword_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Keyword ID "${ctx.getNodeParameter('keyword_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to delete keyword: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getTemplate(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const template_agent_id = ctx.getNodeParameter('template_agent_id', itemIndex) as string;
        if (!template_agent_id || template_agent_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Template Agent ID is required',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getTemplate`,
            qs: { template_agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Template Agent ID "${ctx.getNodeParameter('template_agent_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get template: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getAgentSamples(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const template_agent_id = ctx.getNodeParameter('template_agent_id', itemIndex) as string;
        if (!template_agent_id || template_agent_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Template Agent ID is required',
                httpCode: '400',
            });
        }
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentSamples`,
            qs: { template_agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent samples: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getAgentFaq(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        validateAgentId(ctx, agent_id, 'Get Agent FAQs');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getAgentFaq`,
            qs: { agent_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get agent FAQs: ${error.message}`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function manageAgentFaq(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
        const ques_data = ctx.getNodeParameter('ques_data', itemIndex) as string;
        const ans_data = ctx.getNodeParameter('ans_data', itemIndex) as string;
        const operation = ctx.getNodeParameter('faq_operation', itemIndex) as string;
        const faq_id = ctx.getNodeParameter('faq_id', itemIndex, '') as string;
        validateAgentId(ctx, agent_id, 'Manage Agent FAQ');
        if (!ques_data || ques_data.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'FAQ question cannot be empty',
                httpCode: '400',
            });
        }
        if (!ans_data || ans_data.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'FAQ answer cannot be empty',
                httpCode: '400',
            });
        }
        if ((operation === 'update' || operation === 'delete') && (!faq_id || faq_id.trim().length === 0)) {
            throw new NodeApiError(ctx.getNode(), {
                message: `FAQ ID required for ${operation} operation`,
                httpCode: '400',
            });
        }
        const body: any = { agent_id, ques_data, ans_data, operation };
        if (faq_id) body.faq_id = faq_id;
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/agentFaq`,
            body,
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `FAQ ID "${ctx.getNodeParameter('faq_id', itemIndex, '')}" not found.`,
                httpCode: '404',
            });
        }
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to manage agent FAQ: ${error.message}`,
            httpCode: String(statusCode || 500),
        });
    }
}
