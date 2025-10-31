import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getActions(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActions`,
	});
}

export async function createAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const action_name = ctx.getNodeParameter('action_name', itemIndex) as string;
	const description = ctx.getNodeParameter('description', itemIndex) as string;
	const external_curl = ctx.getNodeParameter('external_curl', itemIndex) as string;
	const success_response = ctx.getNodeParameter('success_response', itemIndex) as string;
	const failure_response = ctx.getNodeParameter('failure_response', itemIndex) as string;
	const interruption_response = ctx.getNodeParameter('interruption_response', itemIndex) as string;
	const ref_code = ctx.getNodeParameter('ref_code', itemIndex) as string;

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
}

export async function updateAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const id = ctx.getNodeParameter('action_id', itemIndex) as string;
	const action_name = ctx.getNodeParameter('action_name', itemIndex) as string;
	const description = ctx.getNodeParameter('description', itemIndex) as string;
	const external_curl = ctx.getNodeParameter('external_curl', itemIndex) as string;
	const success_response = ctx.getNodeParameter('success_response', itemIndex) as string;
	const failure_response = ctx.getNodeParameter('failure_response', itemIndex) as string;
	const interruption_response = ctx.getNodeParameter('interruption_response', itemIndex) as string;
	const ref_code = ctx.getNodeParameter('ref_code', itemIndex) as string;

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
}

export async function deleteAction(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const id = ctx.getNodeParameter('action_id', itemIndex) as string;

	return await request(ctx, {
		method: 'DELETE',
		url: `${baseUrl}/b2b/vocallabs/deleteAction`,
		body: { id },
	});
}

export async function getDocuments(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getDocuments`,
	});
}

export async function deleteDocument(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const id = ctx.getNodeParameter('document_id', itemIndex) as string;

	return await request(ctx, {
		method: 'DELETE',
		url: `${baseUrl}/b2b/vocallabs/deleteDocument`,
		body: { id },
	});
}

export async function getActionTemplates(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActionTemplates`,
	});
}

export async function getActionTemplateDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const template_action_id = ctx.getNodeParameter('template_action_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActionTemplateDetails`,
		qs: { template_action_id },
	});
}

export async function getActionParameters(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActionParameters`,
		qs: { action_id },
	});
}

export async function getActionFields(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActionFields`,
		qs: { action_id },
	});
}

export async function getActionConfiguration(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const action_id = ctx.getNodeParameter('action_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getActionConfiguration`,
		qs: { action_id },
	});
}
