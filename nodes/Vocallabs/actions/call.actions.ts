import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function initiateCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agentId = ctx.getNodeParameter('agentId', itemIndex) as string;
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/initiateVocallabsCall`,
		body: { agentId, prospect_id },
	});
}

export async function createDirectCall(ctx: IExecuteFunctions, index: number): Promise<any> {
    const clientTokenId = ctx.getNodeParameter('client_token_id', index) as string;
    const number = ctx.getNodeParameter('number', index) as string;

    const options = {
        method: 'POST' as const,
        url: '/b2b/vocallabs/createDirectCall/',
        body: {
            client_token_id: clientTokenId,
            number: number,
        },
    };

    return await request(ctx, options);
}

export async function getCallDetails(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const callId = ctx.getNodeParameter('callId', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getVocallabsCall`,
		qs: { callId },
	});
}

export async function getVoices(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getVoices`,
	});
}

export async function getCallAPITokens(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getCallAPITokens`,
	});
}

export async function callAPI(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const from = ctx.getNodeParameter('from', itemIndex) as string;
	const number = ctx.getNodeParameter('number', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/initiateCallWebhook`,
		body: { from, number },
	});
}

export async function getCallTimeline(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const phone_to = ctx.getNodeParameter('phone_to', itemIndex) as string;
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getCallTimeline`,
		qs: { phone_to, limit, offset },
	});
}

export async function getDailyCalls(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const start_date = ctx.getNodeParameter('start_date', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getDailyCalls`,
		qs: { start_date },
	});
}

export async function getWebsocketUrl(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agentId', itemIndex) as string;
	const prospect_id = ctx.getNodeParameter('prospect_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getWebsocketUrl`,
		qs: { agent_id, prospect_id },
	});
}

export async function getAudit(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const call_id = ctx.getNodeParameter('callId', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getOneAudit`,
		qs: { call_id },
	});
}

export async function getAllAudits(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAllAudits`,
	});
}

export async function uploadAudio(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agentId', itemIndex) as string;
	const recording_url = ctx.getNodeParameter('recording_url', itemIndex) as string[];

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/uploadAudits`,
		body: { agent_id, recording_url },
	});
}
