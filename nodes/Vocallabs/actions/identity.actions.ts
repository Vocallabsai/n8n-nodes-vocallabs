import { IExecuteFunctions } from 'n8n-workflow';
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
