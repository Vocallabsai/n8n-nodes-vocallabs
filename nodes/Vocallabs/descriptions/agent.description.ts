import { INodeProperties } from 'n8n-workflow';

export const agentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['agent'],
			},
		},
		options: [
			{
				name: 'Get Agents',
				value: 'getAgents',
				action: 'Get all agents',
				description: 'Retrieve list of AI agents',
			},
			{
				name: 'Get Agent By ID',
				value: 'getAgentById',
				action: 'Get agent by ID',
				description: 'Retrieve a specific agent by ID',
			},
			{
				name: 'Create Agent',
				value: 'createAgent',
				action: 'Create a new agent',
				description: 'Create a new AI agent',
			},
			{
				name: 'Update Agent',
				value: 'updateAgent',
				action: 'Update agent',
				description: 'Update an existing agent',
			},
			{
				name: 'Get Agent Templates',
				value: 'getAgentTemplates',
				action: 'Get agent templates',
				description: 'Retrieve available agent templates',
			},
			{
				name: 'Get Voices By Language',
				value: 'getVoicesByLanguage',
				action: 'Get voices by language',
				description: 'Retrieve available voices for a language',
			},
			{
				name: 'Toggle Favorite',
				value: 'toggleFavorite',
				action: 'Toggle favorite status',
				description: 'Toggle agent favorite status',
			},
			{
				name: 'Update Agent Visibility',
				value: 'updateAgentShared',
				action: 'Update agent visibility',
				description: 'Update agent shared/visibility status',
			},
			{
				name: 'Get Agent Prompt History',
				value: 'agentPromptHistory',
				action: 'Get agent prompt history',
				description: 'Retrieve agent prompt history',
			},
			{
				name: 'Update Success Metric',
				value: 'updateSuccessMetric',
				action: 'Update success metric',
				description: 'Update agent success metrics',
			},
			{
				name: 'Update WhatsApp Notification',
				value: 'updateWhatsappNotification',
				action: 'Update WhatsApp notification',
				description: 'Enable/disable WhatsApp notifications',
			},
			{
				name: 'Update Mail Notification',
				value: 'updateMailNotification',
				action: 'Update mail notification',
				description: 'Enable/disable email notifications',
			},
			{
				name: 'Get Agent Documents',
				value: 'getAgentDocuments',
				action: 'Get agent documents',
				description: 'Retrieve documents for an agent',
			},
			{
				name: 'Insert Agent Document',
				value: 'insertAgentDocument',
				action: 'Insert agent document',
				description: 'Add a document to an agent',
			},
			{
				name: 'Get AI Models',
				value: 'getAIModels',
				action: 'Get AI models',
				description: 'Retrieve available AI models',
			},
			{
				name: 'Get Agent Actions',
				value: 'getAgentActions',
				action: 'Get agent actions',
				description: 'Retrieve agent action configurations',
			},
			{
				name: 'Update Agent Reschedule',
				value: 'updateAgentReschedule',
				action: 'Update agent reschedule',
				description: 'Enable/disable agent rescheduling',
			},
			{
				name: 'Get Keyword Replacements',
				value: 'getKeywordReplacements',
				action: 'Get keyword replacements',
				description: 'Retrieve keyword replacements for an agent',
			},
			{
				name: 'Get Agent Keywords',
				value: 'getAgentKeywords',
				action: 'Get agent keywords',
				description: 'Retrieve keywords for an agent',
			},
			{
				name: 'Add Keyword',
				value: 'addKeyword',
				action: 'Add keyword',
				description: 'Add a new keyword replacement',
			},
			{
				name: 'Update Keyword',
				value: 'updateKeyword',
				action: 'Update keyword',
				description: 'Update an existing keyword replacement',
			},
			{
				name: 'Delete Keyword',
				value: 'deleteKeyword',
				action: 'Delete keyword',
				description: 'Delete a keyword replacement',
			},
			{
				name: 'Get Template',
				value: 'getTemplate',
				action: 'Get template',
				description: 'Retrieve a specific agent template',
			},
			{
				name: 'Get Agent Samples',
				value: 'getAgentSamples',
				action: 'Get agent samples',
				description: 'Retrieve sample data for an agent',
			},
			{
				name: 'Get Agent FAQs',
				value: 'getAgentFaq',
				action: 'Get agent FAQs',
				description: 'Retrieve FAQs for an agent',
			},
			{
				name: 'Manage Agent FAQ',
				value: 'manageAgentFaq',
				action: 'Manage agent FAQ',
				description: 'Insert, update, or delete agent FAQ',
			},
		],
		default: 'getAgents',
	},
];

export const agentFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'Number of agents to retrieve',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['getAgents'],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Number of agents to skip',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['getAgents'],
			},
		},
	},
	{
		displayName: 'Agent ID',
		name: 'agent_id',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the agent',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: [
					'getAgentById',
					'updateAgent',
					'toggleFavorite',
					'updateAgentShared',
					'agentPromptHistory',
					'updateSuccessMetric',
					'updateWhatsappNotification',
					'updateMailNotification',
					'getAgentDocuments',
					'getAgentActions',
					'updateAgentReschedule',
					'getKeywordReplacements',
					'getAgentKeywords',
					'addKeyword',
					'getAgentFaq',
					'manageAgentFaq',
				],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the agent',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['createAgent'],
			},
		},
	},
	{
		displayName: 'Update Data (JSON)',
		name: 'updateData',
		type: 'json',
		default: '{}',
		description: 'JSON object with agent fields (name, inputs_needed, welcome_message, agent_prompt, analytics_prompt, language, call_token_id, voice_id)',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateAgent'],
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		required: true,
		default: 'ENGLISH',
		description: 'Language code (e.g., ENGLISH, HINDI)',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['getVoicesByLanguage'],
			},
		},
	},
	{
		displayName: 'Favorite',
		name: 'favorite',
		type: 'boolean',
		default: true,
		description: 'Whether to mark as favorite',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['toggleFavorite'],
			},
		},
	},
	{
		displayName: 'Is Shared',
		name: 'isShared',
		type: 'boolean',
		default: true,
		description: 'Whether agent is shared',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateAgentShared'],
			},
		},
	},
	{
		displayName: 'Success Metric (JSON)',
		name: 'success_metric',
		type: 'json',
		default: '{}',
		description: 'JSON object defining success metrics',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateSuccessMetric'],
			},
		},
	},
	{
		displayName: 'Enabled',
		name: 'value',
		type: 'boolean',
		default: true,
		description: 'Enable or disable notification',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateWhatsappNotification', 'updateMailNotification'],
			},
		},
	},
	{
		displayName: 'File Name',
		name: 'file_name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the document file',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'File URL',
		name: 'file_url',
		type: 'string',
		required: true,
		default: '',
		description: 'URL of the document file',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'File Type',
		name: 'file_type',
		type: 'string',
		required: true,
		default: '',
		description: 'Type of the document file',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'Site URL',
		name: 'site_url',
		type: 'string',
		default: '',
		description: 'Website URL for web crawling',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'Web Crawler Depth',
		name: 'webcrawler_depth',
		type: 'number',
		default: 2,
		description: 'Depth for web crawling',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'Crawl Status',
		name: 'crawl_status',
		type: 'string',
		default: '',
		description: 'Status of web crawling',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['insertAgentDocument'],
			},
		},
	},
	{
		displayName: 'Reschedule Enabled',
		name: 'reschedule',
		type: 'boolean',
		default: true,
		description: 'Enable or disable rescheduling',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateAgentReschedule'],
			},
		},
	},
	{
		displayName: 'Keywords (JSON Array)',
		name: 'objects',
		type: 'json',
		default: '[]',
		description: 'Array of keyword objects with agent_id, keyword, replacement fields',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['addKeyword'],
			},
		},
	},
	{
		displayName: 'Keyword ID',
		name: 'keyword_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the keyword',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateKeyword', 'deleteKeyword'],
			},
		},
	},
	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		required: true,
		default: '',
		description: 'The keyword text',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateKeyword'],
			},
		},
	},
	{
		displayName: 'Replacement',
		name: 'replacement',
		type: 'string',
		required: true,
		default: '',
		description: 'The replacement text',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['updateKeyword'],
			},
		},
	},
	{
		displayName: 'Template Agent ID',
		name: 'template_agent_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the template agent',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['getTemplate', 'getAgentSamples'],
			},
		},
	},
	{
		displayName: 'Question',
		name: 'ques_data',
		type: 'string',
		required: true,
		default: '',
		description: 'FAQ question text',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['manageAgentFaq'],
			},
		},
	},
	{
		displayName: 'Answer',
		name: 'ans_data',
		type: 'string',
		required: true,
		default: '',
		description: 'FAQ answer text',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['manageAgentFaq'],
			},
		},
	},
	{
		displayName: 'Operation Type',
		name: 'faq_operation',
		type: 'options',
		options: [
			{
				name: 'Insert',
				value: 'insert',
			},
			{
				name: 'Update',
				value: 'update',
			},
			{
				name: 'Delete',
				value: 'delete',
			},
		],
		default: 'insert',
		description: 'Type of FAQ operation',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['manageAgentFaq'],
			},
		},
	},
	{
		displayName: 'FAQ ID',
		name: 'faq_id',
		type: 'string',
		default: '',
		description: 'ID of FAQ (required for update/delete)',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['manageAgentFaq'],
				faq_operation: ['update', 'delete'],
			},
		},
	},
];
