import { INodeProperties } from 'n8n-workflow';

export const contactsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contacts'],
			},
		},
		options: [
			{
				name: 'Create Contact Group',
				value: 'createContactGroup',
				action: 'Create contact group',
				description: 'Create a new contact group',
			},
			{
				name: 'Create Contact In Group',
				value: 'createContactInGroup',
				action: 'Create contact in group',
				description: 'Add a contact to a group',
			},
			{
				name: 'Update Contact Metadata',
				value: 'updateContactMetadata',
				action: 'Update contact metadata',
				description: 'Update metadata for a contact',
			},
			{
				name: 'Get Contact Groups',
				value: 'getContactGroups',
				action: 'Get contact groups',
				description: 'Retrieve list of contact groups',
			},
			{
				name: 'Update Contact Group',
				value: 'updateContactGroup',
				action: 'Update contact group',
				description: 'Update an existing contact group',
			},
			{
				name: 'Delete Contact Group',
				value: 'deleteContactGroup',
				action: 'Delete contact group',
				description: 'Delete a contact group',
			},
			{
				name: 'Delete Contact',
				value: 'deleteContact',
				action: 'Delete contact',
				description: 'Delete a contact',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				action: 'Get contacts',
				description: 'Retrieve list of contacts',
			},
			{
				name: 'Add Multiple Contacts',
				value: 'addMultipleContacts',
				action: 'Add multiple contacts',
				description: 'Add multiple contacts to a group',
			},
			{
				name: 'Get Contact Data',
				value: 'getContactData',
				action: 'Get contact data',
				description: 'Retrieve data for a contact',
			},
			{
				name: 'Update Contact Data',
				value: 'updateContactData',
				action: 'Update contact data',
				description: 'Update contact data',
			},
			{
				name: 'Get Contact',
				value: 'getContact',
				action: 'Get contact',
				description: 'Retrieve a specific contact',
			},
			{
				name: 'Create Contact Group V2',
				value: 'createContactGroupV2',
				action: 'Create contact group V2',
				description: 'Create a new contact group (V2)',
			},
			{
				name: 'Add Multiple Contacts V2',
				value: 'addMultipleContactsV2',
				action: 'Add multiple contacts V2',
				description: 'Add multiple contacts to a group (V2)',
			},
		],
		default: 'getContacts',
	},
];

export const contactsFields: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the contact group',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createContactGroup', 'updateContactGroup', 'createContactGroupV2'],
			},
		},
	},
	{
		displayName: 'Contact Name',
		name: 'contact_name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the contact',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createContactInGroup'],
			},
		},
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number of the contact',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['createContactInGroup'],
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
				resource: ['contacts'],
				operation: [
					'createContactInGroup',
					'updateContactGroup',
					'addMultipleContacts',
					'addMultipleContactsV2',
				],
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
				resource: ['contacts'],
				operation: [
					'updateContactMetadata',
					'getContactData',
					'updateContactData',
					'getContact',
				],
			},
		},
	},
	{
		displayName: 'Metadata (JSON)',
		name: 'metadata',
		type: 'json',
		default: '{}',
		description: 'JSON object with key-value pairs',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['updateContactMetadata'],
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
				resource: ['contacts'],
				operation: ['getContactGroups', 'getContacts', 'getContactData'],
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
				resource: ['contacts'],
				operation: ['getContactGroups', 'getContacts', 'getContactData'],
			},
		},
	},
	{
		displayName: 'Group ID',
		name: 'group_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact group',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['deleteContactGroup'],
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['deleteContact'],
			},
		},
	},
	{
		displayName: 'Client ID',
		name: 'client_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the client/user',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['updateContactGroup', 'addMultipleContacts', 'addMultipleContactsV2'],
			},
		},
	},
	{
		displayName: 'Update Data (JSON)',
		name: 'data',
		type: 'json',
		default: '{}',
		description: 'JSON object with contact data',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['updateContactData'],
			},
		},
	},
	{
		displayName: 'Contacts (JSON Array)',
		name: 'prospects',
		type: 'json',
		default: '[]',
		description: 'Array of contact objects with name, phone, data, prospect_group_id, client_id fields',
		displayOptions: {
			show: {
				resource: ['contacts'],
				operation: ['addMultipleContacts', 'addMultipleContactsV2'],
			},
		},
	},
];
