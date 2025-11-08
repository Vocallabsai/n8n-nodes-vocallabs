import { INodeProperties } from 'n8n-workflow';

export const authOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['auth'],
            },
        },
        options: [
            {
                name: 'Get Auth Info',
                value: 'getAuthInfo',
                action: 'Get authentication info',
                description: 'Get your User ID and auth token for use in other operations',
            },
        ],
        default: 'getAuthInfo',
    },
];

export const authFields: INodeProperties[] = [];
