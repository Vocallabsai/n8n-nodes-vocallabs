import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';
import { baseUrl, request } from './http';

function validatePhoneNumber(ctx: IExecuteFunctions, phone: string, fieldName: string, requirePlus: boolean = true): void {
    if (!phone || phone.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `${fieldName} required. Provide a phone number.`,
            httpCode: '400',
        });
    }
    if (requirePlus && !phone.startsWith('+')) {
        throw new NodeApiError(ctx.getNode(), {
            message: `${fieldName} must start with + and country code (e.g. +919876543210).`,
            httpCode: '400',
        });
    }
}

function validateProspectId(ctx: IExecuteFunctions, prospect_id: string, operation: string): void {
    if (!prospect_id || prospect_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Prospect ID is required for "${operation}". Find it using the "Get Contacts" operation.`,
            httpCode: '400',
        });
    }
}

function validateGroupId(ctx: IExecuteFunctions, group_id: string, operation: string): void {
    if (!group_id || group_id.trim().length === 0) {
        throw new NodeApiError(ctx.getNode(), {
            message: `Group ID is required for "${operation}". Find it using the "Get Contact Groups" operation.`,
            httpCode: '400',
        });
    }
}

export async function createContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const name = ctx.getNodeParameter('name', itemIndex) as string;
        if (!name || name.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'Group name cannot be empty.', httpCode: '400' });
        if (name.length > 100) throw new NodeApiError(ctx.getNode(), { message: 'Group name must be 100 characters or less.', httpCode: '400' });

        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createContactGroup`,
            body: { name },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        if (statusCode === 400 && errorBody.message?.toLowerCase().includes('duplicate')) {
            throw new NodeApiError(ctx.getNode(), { message: `Duplicate group: "${ctx.getNodeParameter('name', itemIndex)}" already exists. Pick a new name.`, httpCode: '400' });
        }
        throw new NodeApiError(ctx.getNode(), { message: `Could not create contact group: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function createContactInGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const name = ctx.getNodeParameter('contact_name', itemIndex) as string;
        const phone = ctx.getNodeParameter('phone', itemIndex) as string;
        const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;
        if (!name || name.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'Contact name required.', httpCode: '400' });
        validatePhoneNumber(ctx, phone, 'Phone Number', true);
        validateGroupId(ctx, prospect_group_id, 'Create Contact In Group');
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createContactInGroup`,
            body: { name, phone, prospect_group_id },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Contact group not found. Group ID: ${ctx.getNodeParameter('prospect_group_id', itemIndex)}`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to create contact: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function updateContactMetadata(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
        const metadata = ctx.getNodeParameter('metadata', itemIndex) as any;
        validateProspectId(ctx, prospect_id, 'Update Contact Metadata');
        const parsed = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateContactMetadata`,
            qs: { prospect_id },
            body: { metadata: parsed },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Prospect ID "${ctx.getNodeParameter('prospect_id', itemIndex)}" not found.`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to update contact metadata: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function getContactGroups(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;
        if (limit < 1 || limit > 100) throw new NodeApiError(ctx.getNode(), { message: 'Limit must be between 1 and 100.', httpCode: '400' });
        if (offset < 0) throw new NodeApiError(ctx.getNode(), { message: 'Offset cannot be negative.', httpCode: '400' });
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getContactGroups`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), { message: `Failed to get contact groups: ${error.message}`, httpCode: String(error.statusCode || 500) });
    }
}

export async function updateContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const client_id = ctx.getNodeParameter('client_id', itemIndex) as string;
        const id = ctx.getNodeParameter('group_id', itemIndex) as string;
        const name = ctx.getNodeParameter('name', itemIndex) as string;
        if (!client_id || client_id.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'User ID required. Get it from Auth → Get Auth Info.', httpCode: '400' });
        validateGroupId(ctx, id, 'Update Contact Group');
        if (!name || name.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'New group name cannot be empty.', httpCode: '400' });
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateContactGroup`,
            body: { client_id, id, name },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Contact group not found. Group ID: ${ctx.getNodeParameter('group_id', itemIndex)}`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to update contact group: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function deleteContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const id = ctx.getNodeParameter('group_id', itemIndex) as string;
        validateGroupId(ctx, id, 'Delete Contact Group');
        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteContactGroup`,
            body: { id },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Contact group not found. Group ID: ${ctx.getNodeParameter('group_id', itemIndex)}`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to delete contact group: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function deleteContact(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const contact_id = ctx.getNodeParameter('contact_id', itemIndex) as string;
        if (!contact_id || contact_id.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'Contact ID required.', httpCode: '400' });
        return await request(ctx, {
            method: 'DELETE',
            url: `${baseUrl}/b2b/vocallabs/deleteContact`,
            body: { contact_id },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Contact ID "${ctx.getNodeParameter('contact_id', itemIndex)}" not found.`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to delete contact: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function getContacts(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;
        if (limit < 1 || limit > 100) throw new NodeApiError(ctx.getNode(), { message: 'Limit must be between 1 and 100.', httpCode: '400' });
        if (offset < 0) throw new NodeApiError(ctx.getNode(), { message: 'Offset cannot be negative.', httpCode: '400' });
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getContacts`,
            qs: { limit, offset },
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), { message: `Failed to get contacts: ${error.message}`, httpCode: String(error.statusCode || 500) });
    }
}

export async function addMultipleContacts(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;
        const client_id = ctx.getNodeParameter('client_id', itemIndex) as string;
        const contactsJson = ctx.getNodeParameter('contacts_json', itemIndex) as string;

        validateGroupId(ctx, prospect_group_id, 'Add Multiple Contacts');

        if (!client_id || client_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'User ID required. Get it from Auth → Get Auth Info',
                httpCode: '400',
            });
        }

        // Parse JSON
        let contactsArray: any[];
        try {
            contactsArray = typeof contactsJson === 'string' ? JSON.parse(contactsJson) : contactsJson;
        } catch (parseError) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid JSON format. Expected array: [{"name": "John", "phone": "919876543210", "data": {}}]',
                httpCode: '400',
            });
        }

        if (!Array.isArray(contactsArray) || contactsArray.length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Contacts must be a non-empty array. Example: [{"name": "John Doe", "phone": "911234567890"}]',
                httpCode: '400',
            });
        }

        // Validate and build prospects
        const prospects = contactsArray.map((contact: any, index: number) => {
            if (!contact.name || contact.name.trim().length === 0) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1}: name field is required`,
                    httpCode: '400',
                });
            }

            if (!contact.phone || contact.phone.trim().length === 0) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1} ("${contact.name}"): phone field is required`,
                    httpCode: '400',
                });
            }

            // V1 API: Phone WITHOUT + prefix (numeric only)
            const cleanPhone = contact.phone.replace(/[\s\-\(\)]/g, '');
            if (!/^\d+$/.test(cleanPhone)) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1} ("${contact.name}"): phone must be numeric. V1 API does NOT use + prefix. Valid: 919876543210`,
                    httpCode: '400',
                });
            }

            return {
                name: contact.name,
                phone: contact.phone,
                data: contact.data || {},
                prospect_group_id,
                client_id,
            };
        });

        const response = await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/addMultipleContactsToGroup`,
            body: { prospects },
        });

        return {
            success: true,
            contacts_added: prospects.length,
            contacts: prospects.map(p => ({
                name: p.name,
                phone: p.phone,
                group_id: prospect_group_id,
            })),
            api_response: response,
        };
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || errorBody.error || error.message || 'Unknown error';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Contact Group not found. Prospect Group ID "${ctx.getNodeParameter('prospect_group_id', itemIndex)}" does not exist`,
                httpCode: '404',
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to add contacts: ${apiMessage}. Status: ${statusCode}`,
            httpCode: String(statusCode || 500),
        });
    }
}

export async function getContactData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const limit = ctx.getNodeParameter('limit', itemIndex) as number;
        const offset = ctx.getNodeParameter('offset', itemIndex) as number;
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
        validateProspectId(ctx, prospect_id, 'Get Contact Data');
        if (limit < 1 || limit > 100) throw new NodeApiError(ctx.getNode(), { message: 'Limit must be between 1 and 100.', httpCode: '400' });
        if (offset < 0) throw new NodeApiError(ctx.getNode(), { message: 'Offset cannot be negative.', httpCode: '400' });
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getContactData`,
            qs: { limit, offset, prospect_id },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Prospect ID "${ctx.getNodeParameter('prospect_id', itemIndex)}" not found.`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to get contact data: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function updateContactData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
        const data = ctx.getNodeParameter('data', itemIndex) as any;
        validateProspectId(ctx, prospect_id, 'Update Contact Data');
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/updateContactData`,
            body: { prospect_id, data: parsedData },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Prospect ID "${ctx.getNodeParameter('prospect_id', itemIndex)}" not found.`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to update contact data: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function getContact(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
        validateProspectId(ctx, prospect_id, 'Get Contact');
        return await request(ctx, {
            method: 'GET',
            url: `${baseUrl}/b2b/vocallabs/getContact`,
            qs: { prospect_id },
        });
    } catch (error: any) {
        const statusCode = error.statusCode || error.response?.statusCode || 0;
        if (statusCode === 404)
            throw new NodeApiError(ctx.getNode(), { message: `Prospect ID "${ctx.getNodeParameter('prospect_id', itemIndex)}" not found.`, httpCode: '404' });
        throw new NodeApiError(ctx.getNode(), { message: `Failed to get contact: ${error.message}`, httpCode: String(statusCode || 500) });
    }
}

export async function createContactGroupV2(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const name = ctx.getNodeParameter('name', itemIndex) as string;
        if (!name || name.trim().length === 0) throw new NodeApiError(ctx.getNode(), { message: 'Group name cannot be empty.', httpCode: '400' });
        return await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/createContactGroupV2`,
            body: { name },
        });
    } catch (error: any) {
        throw new NodeApiError(ctx.getNode(), { message: `Failed to create contact group (V2): ${error.message}`, httpCode: String(error.statusCode || 500) });
    }
}

export async function addMultipleContactsV2(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    try {
        const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;
        const client_id = ctx.getNodeParameter('client_id', itemIndex) as string;
        const contactsJson = ctx.getNodeParameter('contacts_json', itemIndex) as string;

        validateGroupId(ctx, prospect_group_id, 'Add Multiple Contacts V2');

        if (!client_id || client_id.trim().length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'User ID required. Get it from Auth → Get Auth Info',
                httpCode: '400',
            });
        }

        // Parse JSON
        let contactsArray: any[];
        try {
            contactsArray = typeof contactsJson === 'string' ? JSON.parse(contactsJson) : contactsJson;
        } catch (parseError) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Invalid JSON format. Expected array: [{"name": "John", "phone": "+919876543210", "data": {}}]',
                httpCode: '400',
            });
        }

        if (!Array.isArray(contactsArray) || contactsArray.length === 0) {
            throw new NodeApiError(ctx.getNode(), {
                message: 'Contacts must be a non-empty array. Example: [{"name": "John Doe", "phone": "+911234567890"}]',
                httpCode: '400',
            });
        }

        // Validate and build prospects
        const prospects = contactsArray.map((contact: any, index: number) => {
            if (!contact.name || contact.name.trim().length === 0) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1}: name field is required`,
                    httpCode: '400',
                });
            }

            if (!contact.phone || contact.phone.trim().length === 0) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1} ("${contact.name}"): phone field is required`,
                    httpCode: '400',
                });
            }

            // V2 API: Phone MUST have + prefix
            if (!contact.phone.startsWith('+')) {
                throw new NodeApiError(ctx.getNode(), {
                    message: `Contact ${index + 1} ("${contact.name}"): phone "${contact.phone}" must start with + and country code (V2 requirement). Valid: +919876543210`,
                    httpCode: '400',
                });
            }

            return {
                name: contact.name,
                phone: contact.phone,
                data: contact.data || {},
                prospect_group_id,
                client_id,
            };
        });

        const response = await request(ctx, {
            method: 'POST',
            url: `${baseUrl}/b2b/vocallabs/addMultipleContactsToGroupV2`,
            body: { prospects },
        });

        return {
            success: true,
            contacts_added: prospects.length,
            contacts: prospects.map(p => ({
                name: p.name,
                phone: p.phone,
                group_id: prospect_group_id,
            })),
            api_response: response,
        };
    } catch (error: any) {
        if (error.constructor.name === 'NodeApiError') throw error;

        const statusCode = error.statusCode || error.response?.statusCode || 0;
        const errorBody = error.response?.body || error.body || {};
        const apiMessage = errorBody.message || errorBody.error || error.message || 'Unknown error';

        if (statusCode === 404) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Contact Group not found. Prospect Group ID "${ctx.getNodeParameter('prospect_group_id', itemIndex)}" does not exist`,
                httpCode: '404',
            });
        }

        if (statusCode === 400) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Invalid request: ${apiMessage}. Common issues: phone must start with + (V2 requirement), invalid JSON, or IDs don't exist`,
                httpCode: '400',
            });
        }

        if (statusCode >= 500 && (apiMessage.toLowerCase().includes('exists') || apiMessage.toLowerCase().includes('duplicate'))) {
            throw new NodeApiError(ctx.getNode(), {
                message: `Contact already exists: ${apiMessage}. Use different phone number or remove existing contact first`,
                httpCode: String(statusCode),
            });
        }

        throw new NodeApiError(ctx.getNode(), {
            message: `Failed to add contacts (V2): ${apiMessage}. Status: ${statusCode}`,
            httpCode: String(statusCode || 500),
        });
    }
}