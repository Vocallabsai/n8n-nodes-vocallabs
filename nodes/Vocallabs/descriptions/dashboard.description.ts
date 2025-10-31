import { INodeProperties } from 'n8n-workflow';

export const dashboardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dashboard'],
			},
		},
		options: [
			{
				name: 'Get Dashboard Stats',
				value: 'getDashboardStats',
				action: 'Get dashboard statistics',
				description: 'Retrieve dashboard statistics',
			},
			{
				name: 'Get Tokens',
				value: 'getTokens',
				action: 'Get tokens',
				description: 'Retrieve available tokens',
			},
		],
		default: 'getDashboardStats',
	},
];

export const dashboardFields: INodeProperties[] = [];
