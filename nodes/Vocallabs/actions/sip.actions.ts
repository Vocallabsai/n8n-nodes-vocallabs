import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function createSIPCall(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const phone_number = ctx.getNodeParameter('phone_number', itemIndex) as string;
	const did = ctx.getNodeParameter('did', itemIndex) as string;
	const websocket_url = ctx.getNodeParameter('websocket_url', itemIndex) as string;
	const webhook_url = ctx.getNodeParameter('webhook_url', itemIndex) as string;
	const sample_rate = ctx.getNodeParameter('sample_rate', itemIndex) as string;

	return await request(ctx, {
		method: 'POST',
		url: `${baseUrl}/b2b/vocallabs/createSIPCall`,
		body: {
			phone_number,
			did,
			websocket_url,
			webhook_url,
			sample_rate,
		},
	});
}
