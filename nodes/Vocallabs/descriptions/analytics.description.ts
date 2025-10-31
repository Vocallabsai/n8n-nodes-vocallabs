import { INodeProperties } from 'n8n-workflow';

export const analyticsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
			},
		},
		options: [
			{
				name: 'Get Call Statuses',
				value: 'getCallStatuses',
				action: 'Get call statuses',
				description: 'Retrieve all call statuses',
			},
			{
				name: 'Get Call Conversation',
				value: 'getCallConversation',
				action: 'Get call conversation',
				description: 'Retrieve conversation for a specific call',
			},
			{
				name: 'Get Call Data',
				value: 'getCallData',
				action: 'Get call data',
				description: 'Retrieve data for a specific call',
			},
			{
				name: 'Get Call Status',
				value: 'getCallStatus',
				action: 'Get call status',
				description: 'Retrieve status for a specific call',
			},
			{
				name: 'Get Call Summary',
				value: 'getCallSummary',
				action: 'Get call summary',
				description: 'Retrieve summary for a specific call',
			},
			{
				name: 'Get Post Call Data',
				value: 'getPostCallData',
				action: 'Get post call data',
				description: 'Retrieve post-call data for an agent',
			},
			{
				name: 'Update Post Call Data',
				value: 'updatePostCallData',
				action: 'Update post call data',
				description: 'Update post-call data',
			},
			{
				name: 'Delete Post Call Data',
				value: 'deletePostCallData',
				action: 'Delete post call data',
				description: 'Delete post-call data',
			},
			{
				name: 'Get VocalLabs Call Data',
				value: 'getVocallabsCall',
				action: 'Get VocalLabs call data',
				description: 'Retrieve VocalLabs call data',
			},
		],
		default: 'getCallStatuses',
	},
];

export const analyticsFields: INodeProperties[] = [
	{
		displayName: 'Call ID',
		name: 'call_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the call',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: [
					'getCallConversation',
					'getCallData',
					'getCallStatus',
					'getCallSummary',
					'updatePostCallData',
					'deletePostCallData',
					'getVocallabsCall',
				],
			},
		},
	},
	{
		displayName: 'Agent ID',
		name: 'agent_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the agent',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getPostCallData'],
			},
		},
	},
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		description: 'Data key',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['updatePostCallData'],
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		default: '',
		description: 'Prompt for getting the key',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['updatePostCallData'],
			},
		},
	},
];
