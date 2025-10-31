import { INodeProperties } from 'n8n-workflow';

export const callOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['call'],
			},
		},
		options: [
			{
				name: 'Initiate Call',
				value: 'initiateCall',
				action: 'Initiate a call',
				description: 'Start a new call',
			},
			{
				name: 'Get Call Details',
				value: 'getCallDetails',
				action: 'Get call details',
				description: 'Retrieve details for a specific call',
			},
			{
				name: 'Get Voices',
				value: 'getVoices',
				action: 'Get available voices',
				description: 'Retrieve list of available voices',
			},
			{
				name: 'Get Call API Tokens',
				value: 'getCallAPITokens',
				action: 'Get call API tokens',
				description: 'Retrieve call API tokens',
			},
			{
				name: 'Call API',
				value: 'callAPI',
				action: 'Call API',
				description: 'Initiate call via webhook',
			},
			{
				name: 'Get Call Timeline',
				value: 'getCallTimeline',
				action: 'Get call timeline',
				description: 'Retrieve call timeline history',
			},
			{
				name: 'Get Daily Calls',
				value: 'getDailyCalls',
				action: 'Get daily calls',
				description: 'Retrieve daily call statistics',
			},
			{
				name: 'Get WebSocket URL',
				value: 'getWebsocketUrl',
				action: 'Get WebSocket URL',
				description: 'Get WebSocket connection URL',
			},
			{
				name: 'Get Audit',
				value: 'getAudit',
				action: 'Get audit details',
				description: 'Retrieve audit details for a call',
			},
			{
				name: 'Get All Audits',
				value: 'getAllAudits',
				action: 'Get all audits',
				description: 'Retrieve all audit records',
			},
			{
				name: 'Upload Audio',
				value: 'uploadAudio',
				action: 'Upload audio',
				description: 'Upload audio files for auditing',
			},
		],
		default: 'initiateCall',
	},
];

export const callFields: INodeProperties[] = [
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the agent',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiateCall', 'getWebsocketUrl', 'uploadAudio'],
			},
		},
	},
	{
		displayName: 'Prospect ID',
		name: 'prospect_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the prospect',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiateCall', 'getWebsocketUrl'],
			},
		},
	},
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the call',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['getCallDetails', 'getAudit'],
			},
		},
	},
	{
		displayName: 'From (DID)',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		description: 'Caller DID number',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['callAPI'],
			},
		},
	},
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number to call',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['callAPI'],
			},
		},
	},
	{
		displayName: 'Phone To',
		name: 'phone_to',
		type: 'string',
		required: true,
		default: '',
		description: 'Destination phone number',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['getCallTimeline'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'Number of records to retrieve',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['getCallTimeline'],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Number of records to skip',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['getCallTimeline'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'string',
		required: true,
		default: '',
		description: 'Start date for filtering calls (YYYY-MM-DD)',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['getDailyCalls'],
			},
		},
	},
	{
		displayName: 'Recording URLs',
		name: 'recording_url',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: [],
		description: 'Array of audio file URLs',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['uploadAudio'],
			},
		},
	},
];
