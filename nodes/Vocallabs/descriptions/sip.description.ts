import { INodeProperties } from 'n8n-workflow';

export const sipOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sip'],
			},
		},
		options: [
			{
				name: 'Create SIP Call',
				value: 'createSIPCall',
				action: 'Create a SIP call',
				description: 'Initiate a new SIP call',
			},
		],
		default: 'createSIPCall',
	},
];

export const sipFields: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number to call',
		displayOptions: {
			show: {
				resource: ['sip'],
				operation: ['createSIPCall'],
			},
		},
	},
	{
		displayName: 'DID',
		name: 'did',
		type: 'string',
		required: true,
		default: '',
		description: 'Direct Inward Dialing number',
		displayOptions: {
			show: {
				resource: ['sip'],
				operation: ['createSIPCall'],
			},
		},
	},
	{
		displayName: 'WebSocket URL',
		name: 'websocket_url',
		type: 'string',
		required: true,
		default: '',
		description: 'WebSocket server URL',
		displayOptions: {
			show: {
				resource: ['sip'],
				operation: ['createSIPCall'],
			},
		},
	},
	{
		displayName: 'Webhook URL',
		name: 'webhook_url',
		type: 'string',
		required: true,
		default: '',
		description: 'Webhook callback URL',
		displayOptions: {
			show: {
				resource: ['sip'],
				operation: ['createSIPCall'],
			},
		},
	},
	{
		displayName: 'Sample Rate',
		name: 'sample_rate',
		type: 'string',
		default: '16000',
		description: 'Audio sample rate',
		displayOptions: {
			show: {
				resource: ['sip'],
				operation: ['createSIPCall'],
			},
		},
	},
];
