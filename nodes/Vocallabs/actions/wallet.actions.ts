import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getBalance(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/getGreenBalance`,
	});
}

export async function getTransactionHistory(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/whatsubTransactionHistory`,
		qs: { limit, offset },
	});
}
