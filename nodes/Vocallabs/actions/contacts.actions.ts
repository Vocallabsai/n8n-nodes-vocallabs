import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function createContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createContactGroup`,
		body: { name },
	});
}

export async function createContactInGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('contact_name', itemIndex) as string;
	const phone = ctx.getNodeParameter('phone', itemIndex) as string;
	const prospect_group_id = ctx.getNodeParameter('prospect_group_id', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createContactInGroup`,
		body: { name, phone, prospect_group_id },
	});
}

export async function updateContactMetadata(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
	const metadata = ctx.getNodeParameter('metadata', itemIndex) as object;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateContactMetadata`,
		qs: { prospect_id },
		body: { metadata },
	});
}

export async function getContactGroups(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getContactGroups`,
		qs: { limit, offset },
	});
}

export async function updateContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const client_id = ctx.getNodeParameter('client_id', itemIndex) as string;
	const id = ctx.getNodeParameter('group_id', itemIndex) as string;
	const name = ctx.getNodeParameter('name', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateContactGroup`,
		body: { client_id, id, name },
	});
}

export async function deleteContactGroup(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const id = ctx.getNodeParameter('group_id', itemIndex) as string;

	return await request(ctx, {
		method: 'DELETE',
		url: `${baseUrl}/b2b/vocallabs/deleteContactGroup`,
		body: { id },
	});
}

export async function deleteContact(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contact_id = ctx.getNodeParameter('contact_id', itemIndex) as string;

	return await request(ctx, {
		method: 'DELETE',
		url: `${baseUrl}/b2b/vocallabs/deleteContact`,
		body: { contact_id },
	});
}

export async function getContacts(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getContacts`,
		qs: { limit, offset },
	});
}

export async function addMultipleContacts(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const prospects = ctx.getNodeParameter('prospects', itemIndex) as object[];

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/addMultipleContactsToGroup`,
		body: { prospects },
	});
}

export async function getContactData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getContactData`,
		qs: { limit, offset, prospect_id },
	});
}

export async function updateContactData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;
	const data = ctx.getNodeParameter('data', itemIndex) as object;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateContactData`,
		body: { prospect_id, data },
	});
}

export async function getContact(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getContact`,
		qs: { prospect_id },
	});
}

export async function createContactGroupV2(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createContactGroupV2`,
		body: { name },
	});
}

export async function addMultipleContactsV2(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const prospects = ctx.getNodeParameter('prospects', itemIndex) as object[];

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/addMultipleContactsToGroupV2`,
		body: { prospects },
	});
}
