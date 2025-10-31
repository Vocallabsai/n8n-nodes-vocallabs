import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getCampaigns(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getCampaigns`,
	});
}

export async function createCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createCampaign`,
		body: { name, agent_id },
	});
}

export async function updateCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
	const campaign_name = ctx.getNodeParameter('campaign_name', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateCampaign`,
		body: { campaign_id, campaign_name },
	});
}

export async function deleteCampaign(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const id = ctx.getNodeParameter('campaign_id', itemIndex) as string;

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

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getQueueingDetails`,
		qs: { limit, offset, campaign_id },
	});
}

export async function getCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getCampaignStatus`,
		qs: { campaign_id },
	});
}

export async function updateCampaignStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const campaign_id = ctx.getNodeParameter('campaign_id', itemIndex) as string;
	const active = ctx.getNodeParameter('active', itemIndex) as boolean;

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

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/addContactsToCampaign`,
		body: { user_id, campaign_id, prospect_group_id },
	});
}
