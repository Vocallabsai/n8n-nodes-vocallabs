import { INodeProperties } from 'n8n-workflow';

export const resourceSelector: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Dashboard',
			value: 'dashboard',
		},
		{
			name: 'Wallet',
			value: 'wallet',
		},
		{
			name: 'SIP',
			value: 'sip',
		},
		{
			name: 'Call',
			value: 'call',
		},
		{
			name: 'Agent',
			value: 'agent',
		},
		{
			name: 'Analytics',
			value: 'analytics',
		},
		{
			name: 'Contacts',
			value: 'contacts',
		},
		{
			name: 'Library',
			value: 'library',
		},
		{
			name: 'Identity',
			value: 'identity',
		},
		{
			name: 'Campaign',
			value: 'campaign',
		},
		{
			name: 'Marketplace',
			value: 'marketplace',
		},
	],
	default: 'agent',
	description: 'The resource to operate on',
};
