import { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
			},
		},
		options: [
			{
				name: 'Get Campaigns',
				value: 'getCampaigns',
				action: 'Get campaigns',
				description: 'Retrieve list of campaigns',
			},
			{
				name: 'Create Campaign',
				value: 'createCampaign',
				action: 'Create campaign',
				description: 'Create a new campaign',
			},
			{
				name: 'Update Campaign',
				value: 'updateCampaign',
				action: 'Update campaign',
				description: 'Update an existing campaign',
			},
			{
				name: 'Delete Campaign',
				value: 'deleteCampaign',
				action: 'Delete campaign',
				description: 'Delete a campaign',
			},
			{
				name: 'Get Queueing Details',
				value: 'getQueueingDetails',
				action: 'Get queueing details',
				description: 'Retrieve queueing details for a campaign',
			},
			{
				name: 'Get Campaign Status',
				value: 'getCampaignStatus',
				action: 'Get campaign status',
				description: 'Retrieve status of a campaign',
			},
			{
				name: 'Update Campaign Status',
				value: 'updateCampaignStatus',
				action: 'Update campaign status',
				description: 'Update campaign status (active/inactive)',
			},
			{
				name: 'Add Contacts to Campaign',
				value: 'addContactsToCampaign',
				action: 'Add contacts to campaign',
				description: 'Add contacts/groups to a campaign',
			},
		],
		default: 'getCampaigns',
	},
];

export const campaignFields: INodeProperties[] = [
	{
		displayName: 'Campaign Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the campaign',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
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
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
	},
	{
		displayName: 'Campaign ID',
		name: 'campaign_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the campaign',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: [
					'updateCampaign',
					'deleteCampaign',
					'getQueueingDetails',
					'getCampaignStatus',
					'updateCampaignStatus',
					'addContactsToCampaign',
				],
			},
		},
	},
	{
		displayName: 'Campaign Name (Update)',
		name: 'campaign_name',
		type: 'string',
		required: true,
		default: '',
		description: 'New name for the campaign',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['updateCampaign'],
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
				resource: ['campaign'],
				operation: ['getQueueingDetails'],
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
				resource: ['campaign'],
				operation: ['getQueueingDetails'],
			},
		},
	},
	{
		displayName: 'Active',
		name: 'active',
		type: 'boolean',
		default: true,
		description: 'Whether campaign is active',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['updateCampaignStatus'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the user/client',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addContactsToCampaign'],
			},
		},
	},
	{
		displayName: 'Prospect Group ID',
		name: 'prospect_group_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the prospect group',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addContactsToCampaign'],
			},
		},
	},
];
