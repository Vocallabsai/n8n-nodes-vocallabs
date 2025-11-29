import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getCallStatuses(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCallStatuses`,
    });
}

export async function getCallConversation(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCallConversation`,
        qs: { call_id },
    });
}

export async function getCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCallData`,
        qs: { call_id },
    });
}

export async function getCallStatus(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCallStatus`,
        qs: { call_id },
    });
}

export async function getCallSummary(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getCallSummary`,
        qs: { call_id },
    });
}

export async function getPostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const agent_id = ctx.getNodeParameter('agent_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getPostCallData`,
        qs: { agent_id },
    });
}

export async function updatePostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;
    const key = ctx.getNodeParameter('key', itemIndex) as string;
    const prompt = ctx.getNodeParameter('prompt', itemIndex) as string;

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/updatePostCallData`,
        body: { call_id, key, prompt },
    });
}

export async function deletePostCallData(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const call_id = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'POST',
        url: `${baseUrl}/b2b/vocallabs/deletePostCallData`,
        body: { call_id },
    });
}

export async function getVocallabsCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
    const callId = ctx.getNodeParameter('call_id', itemIndex) as string;

    return await request(ctx, {
        method: 'GET',
        url: `${baseUrl}/b2b/vocallabs/getVocallabsCall`,
        qs: { callId },
    });
}
