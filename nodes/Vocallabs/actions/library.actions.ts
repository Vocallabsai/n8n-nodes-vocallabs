import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validateActionId(ctx: IExecuteFunctions, action_id: string, operation: string): void {
    if (!action_id || action_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Action ID required for "${operation}". Get one using "Get Actions".`,
            httpCode: '400',
        });
    }
}

export async function getActions(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActions`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get actions: ${error.message}.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function createAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const action_name = ctx.getNodeParameter('action_name', itemIndex) as string;
        const description = ctx.getNodeParameter('description', itemIndex) as string;
        const external_curl = ctx.getNodeParameter('external_curl', itemIndex) as string;
        const success_response = ctx.getNodeParameter('success_response', itemIndex) as string;
        const failure_response = ctx.getNodeParameter('failure_response', itemIndex) as string;
        const interruption_response = ctx.getNodeParameter('interruption_response', itemIndex) as string;
        const ref_code = ctx.getNodeParameter('ref_code', itemIndex) as string;

        if (!action_name || action_name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "Action name required.",
                httpCode: '400',
            });
        }

        if (!external_curl || external_curl.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "External CURL command required.",
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createAction`,
            body: {
                action_name,
                description,
                external_curl,
                success_response,
                failure_response,
                interruption_response,
                ref_code,
            },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};

        if (statusCode === 400 && errorBody.message?.toLowerCase().includes('duplicate')) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action name "${ctx.getNodeParameter('action_name', itemIndex)}" already exists. Use a unique name.`,
                httpCode: '400',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to create action: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function updateAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const id = ctx.getNodeParameter('action_id', itemIndex) as string;
        const action_name = ctx.getNodeParameter('action_name', itemIndex) as string;
        const description = ctx.getNodeParameter('description', itemIndex) as string;
        const external_curl = ctx.getNodeParameter('external_curl', itemIndex) as string;
        const success_response = ctx.getNodeParameter('success_response', itemIndex) as string;
        const failure_response = ctx.getNodeParameter('failure_response', itemIndex) as string;
        const interruption_response = ctx.getNodeParameter('interruption_response', itemIndex) as string;
        const ref_code = ctx.getNodeParameter('ref_code', itemIndex) as string;

        validateActionId(ctx, id, 'Update Action');

        if (!action_name || action_name.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "Action name required.",
                httpCode: '400',
            });
        }

        if (!external_curl || external_curl.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "External CURL command required.",
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateAction`,
            body: {
                id,
                action_name,
                description,
                external_curl,
                success_response,
                failure_response,
                interruption_response,
                ref_code,
            },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action ID "${ctx.getNodeParameter('action_id', itemIndex)}" not found. Check ID or get a list using "Get Actions."`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to update action: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function deleteAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const id = ctx.getNodeParameter('action_id', itemIndex) as string;
        validateActionId(ctx, id, 'Delete Action');

        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteAction`,
            body: { id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action ID "${ctx.getNodeParameter('action_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to delete action: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getDocuments(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getDocuments`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get documents: ${error.message}.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function deleteDocument(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const id = ctx.getNodeParameter('document_id', itemIndex) as string;

        if (!id || id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "Document ID required.",
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteDocument`,
            body: { id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Document ID "${ctx.getNodeParameter('document_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to delete document: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getActionTemplates(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActionTemplates`,
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get action templates: ${error.message}.`,
            httpCode: String(error.statusCode || 500),
        });
    }
}

export async function getActionTemplateDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const template_action_id = ctx.getNodeParameter('template_action_id', itemIndex) as string;

        if (!template_action_id || template_action_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: "Template Action ID required.",
                httpCode: '400',
            });
        }

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActionTemplateDetails`,
            qs: { template_action_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Template Action ID "${ctx.getNodeParameter('template_action_id', itemIndex)}" not found.`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get action template details: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getActionParameters(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;
        validateActionId(ctx, action_id, 'Get Action Parameters');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActionParameters`,
            qs: { action_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action ID "${ctx.getNodeParameter('action_id', itemIndex)}" not found. See "Get Actions."`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get action parameters: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getActionFields(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;
        validateActionId(ctx, action_id, 'Get Action Fields');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActionFields`,
            qs: { action_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action ID "${ctx.getNodeParameter('action_id', itemIndex)}" not found. See "Get Actions."`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get action fields: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getActionConfiguration(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;
        validateActionId(ctx, action_id, 'Get Action Configuration');

        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getActionConfiguration`,
            qs: { action_id },
        });
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Action ID "${ctx.getNodeParameter('action_id', itemIndex)}" not found. See "Get Actions."`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to get action configuration: ${error.message}.`,
            httpCode: String(statusCode || 500),
        });
    }
}
