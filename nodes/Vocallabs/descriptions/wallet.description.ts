import { INodeProperties } from 'n8n-workflow';

export const walletOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['wallet'],
            },
        },
        options: [
            {
                name: 'Get Balance',
                value: 'getBalance',
                action: 'Get wallet balance',
                description: 'Retrieve current wallet balance',
            },
            {
                name: 'Get Transaction History',
                value: 'getTransactionHistory',
                action: 'Get transaction history',
                description: 'Retrieve wallet transaction history',
            },
        ],
        default: 'getBalance',
    },
];

export const walletFields: INodeProperties[] = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 10,
        description: 'Number of transactions to retrieve (1-100)',
        displayOptions: {
            show: {
                resource: ['wallet'],
                operation: ['getTransactionHistory'],
            },
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: 0,
        description: 'Number of transactions to skip',
        displayOptions: {
            show: {
                resource: ['wallet'],
                operation: ['getTransactionHistory'],
            },
        },
    },
];
