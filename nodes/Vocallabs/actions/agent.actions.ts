import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getAgents(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAIAgents`,
		qs: { limit, offset },
	});
}

export async function getAgentById(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAIAgentByID`,
		qs: { agent_id },
	});
}

export async function createAgent(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const name = ctx.getNodeParameter('name', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createAIAgent`,
		body: { name },
	});
}

export async function updateAgent(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const updateData = ctx.getNodeParameter('updateData', itemIndex) as object;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateAIAgent`,
		qs: { agent_id },
		body: { agent_id, ...updateData },
	});
}

export async function getAgentTemplates(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentTemplates`,
	});
}

export async function getVoicesByLanguage(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const language = ctx.getNodeParameter('language', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getVoicesByLanguageComment`,
		qs: { language },
	});
}

export async function toggleFavorite(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const favorite = ctx.getNodeParameter('favorite', itemIndex) as boolean;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/toggleFavorite`,
		body: { agent_id, favorite },
	});
}

export async function updateAgentShared(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const isShared = ctx.getNodeParameter('isShared', itemIndex) as boolean;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateAgentShared`,
		body: { agent_id, isShared },
	});
}

export async function agentPromptHistory(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/agentPromptHistory`,
		body: { agent_id },
	});
}

export async function updateSuccessMetric(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const success_metric = ctx.getNodeParameter('success_metric', itemIndex) as object;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateSuccessMetric`,
		body: { agent_id, success_metric },
	});
}

export async function updateWhatsappNotification(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const value = ctx.getNodeParameter('value', itemIndex) as boolean;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateWhatsappNotification`,
		body: { agent_id, value },
	});
}

export async function updateMailNotification(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const value = ctx.getNodeParameter('value', itemIndex) as boolean;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateMailNotification`,
		body: { agent_id, value },
	});
}

export async function getAgentDocuments(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentDocuments`,
		qs: { agent_id },
	});
}

export async function insertAgentDocument(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const file_name = ctx.getNodeParameter('file_name', itemIndex) as string;
	const file_url = ctx.getNodeParameter('file_url', itemIndex) as string;
	const file_type = ctx.getNodeParameter('file_type', itemIndex) as string;
	const site_url = ctx.getNodeParameter('site_url', itemIndex) as string;
	const webcrawler_depth = ctx.getNodeParameter('webcrawler_depth', itemIndex) as number;
	const crawl_status = ctx.getNodeParameter('crawl_status', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/insertAgentDocx`,
		body: { file_name, file_url, file_type, site_url, webcrawler_depth, crawl_status },
	});
}

export async function getAIModels(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAIModels`,
	});
}

export async function getAgentActions(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentActions`,
		qs: { agent_id },
	});
}

export async function updateAgentReschedule(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const reschedule = ctx.getNodeParameter('reschedule', itemIndex) as boolean;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateAgentReschedule`,
		body: { agent_id, reschedule },
	});
}

export async function getKeywordReplacements(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getKeywordReplacements`,
		qs: { agent_id },
	});
}

export async function getAgentKeywords(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentKeywords`,
		qs: { agent_id },
	});
}

export async function addKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const objects = ctx.getNodeParameter('objects', itemIndex) as object[];

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/addKeyword`,
		body: { objects },
	});
}

export async function updateKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const keyword_id = ctx.getNodeParameter('keyword_id', itemIndex) as string;
	const keyword = ctx.getNodeParameter('keyword', itemIndex) as string;
	const replacement = ctx.getNodeParameter('replacement', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/updateKeyword`,
		body: { keyword_id, keyword, replacement },
	});
}

export async function deleteKeyword(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const keyword_id = ctx.getNodeParameter('keyword_id', itemIndex) as string;

	return await request(ctx, {
		method: 'DELETE',
		url: `${baseUrl}/b2b/vocallabs/deleteKeyword`,
		qs: { keyword_id },
	});
}

export async function getTemplate(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const template_agent_id = ctx.getNodeParameter('template_agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getTemplate`,
		qs: { template_agent_id },
	});
}

export async function getAgentSamples(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const template_agent_id = ctx.getNodeParameter('template_agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentSamples`,
		qs: { template_agent_id },
	});
}

export async function getAgentFaq(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getAgentFaq`,
		qs: { agent_id },
	});
}

export async function manageAgentFaq(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;
	const ques_data = ctx.getNodeParameter('ques_data', itemIndex) as string;
	const ans_data = ctx.getNodeParameter('ans_data', itemIndex) as string;
	const operation = ctx.getNodeParameter('faq_operation', itemIndex) as string;
	const faq_id = ctx.getNodeParameter('faq_id', itemIndex, '') as string;

	const body: any = {
		agent_id,
		ques_data,
		ans_data,
		operation,
	};

	if (faq_id) {
		body.faq_id = faq_id;
	}

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/agentFaq`,
		body,
	});
}
