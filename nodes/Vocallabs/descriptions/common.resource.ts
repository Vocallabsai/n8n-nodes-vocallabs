import { INodeProperties } from 'n8n-workflow';

export const resourceSelector: INodeProperties = {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
        {
            name: 'Agent',
            value: 'agent',
        },
        {
            name: 'Analytics',
            value: 'analytics',
        },
        {
            name: 'Auth',  // NEW!
            value: 'auth',
        },
        {
            name: 'Call',
            value: 'call',
        },
        {
            name: 'Campaign',
            value: 'campaign',
        },
        {
            name: 'Contacts',
            value: 'contacts',
        },
        {
            name: 'Dashboard',
            value: 'dashboard',
        },
        {
            name: 'Identity',
            value: 'identity',
        },
        {
            name: 'Library',
            value: 'library',
        },
        {
            name: 'Marketplace',
            value: 'marketplace',
        },
        {
            name: 'SIP',
            value: 'sip',
        },
        {
            name: 'Wallet',
            value: 'wallet',
        },
    ],
    default: 'agent',
};
