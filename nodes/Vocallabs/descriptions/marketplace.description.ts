import { INodeProperties } from 'n8n-workflow';

export const marketplaceOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['marketplace'],
            },
        },
        options: [
            {
                name: 'Fetch Available Numbers',
                value: 'fetchAvailableNumbers',
                action: 'Fetch available numbers',
                description: 'Retrieve list of available phone numbers',
            },
            {
                name: 'Get Your Numbers',
                value: 'getNumbers',
                action: 'Get your numbers',
                description: 'Retrieve your purchased phone numbers',
            },
            {
                name: 'Fetch Countries',
                value: 'fetchCountries',
                action: 'Fetch countries',
                description: 'Retrieve list of available countries',
            },
        ],
        default: 'fetchAvailableNumbers',
    },
];

export const marketplaceFields: INodeProperties[] = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 10,
        description: 'Number of records to retrieve (1-100)',
        displayOptions: {
            show: {
                resource: ['marketplace'],
                operation: [
                    'fetchAvailableNumbers',
                    'getNumbers',
                    'fetchCountries',
                ],
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
                resource: ['marketplace'],
                operation: [
                    'fetchAvailableNumbers',
                    'getNumbers',
                    'fetchCountries',
                ],
            },
        },
    },
];
