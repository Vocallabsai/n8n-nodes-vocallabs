import { IExecuteFunctions } from 'n8n-workflow';
import { baseUrl, request } from './http';

export async function getDashboardStats(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getDashboardStats`,
	});
}

export async function getTokens(ctx: IExecuteFunctions, itemIndex: number): Promise<any> {
	return await request(ctx, {
		method: 'GET',
		url: `${baseUrl}/b2b/vocallabs/getTokens`,
	});
}
