import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function fetchAvailableNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/fetchAvailableNumbers`,
		qs: { limit, offset },
	});
}

export async function getNumbers(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getNumbers`,
		qs: { limit, offset },
	});
}

export async function fetchCountries(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	const limit = ctx.getNodeParameter('limit', itemIndex) as number;
	const offset = ctx.getNodeParameter('offset', itemIndex) as number;

	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/fetchCountries`,
		qs: { limit, offset },
	});
}
