import { INodeProperties } from 'n8n-workflow';

export const identityOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['identity'],
            },
        },
        options: [
            {
                name: 'Get Flows',
                value: 'getFlows',
                action: 'Get flows',
                description: 'Retrieve list of identity verification flows',
            },
            {
                name: 'Get Identity URL',
                value: 'getIdentityUrl',
                action: 'Get identity URL',
                description: 'Generate identity verification URL',
            },
        ],
        default: 'getFlows',
    },
];

export const identityFields: INodeProperties[] = [
    {
        displayName: 'Flow ID',
        name: 'flow_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the identity flow',
        displayOptions: {
            show: {
                resource: ['identity'],
                operation: ['getIdentityUrl'],
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
                resource: ['identity'],
                operation: ['getIdentityUrl'],
            },
        },
    },
    {
        displayName: 'Verification Type',
        name: 'verification_type',
        type: 'options',
        options: [
            {
                name: 'Aadhaar',
                value: 'aadhaar',
            },
            {
                name: 'PAN',
                value: 'pan',
            },
        ],
        required: true,
        default: 'aadhaar',
        description: 'Type of identity verification',
        displayOptions: {
            show: {
                resource: ['identity'],
                operation: ['getIdentityUrl'],
            },
        },
    },
    {
        displayName: 'Created At',
        name: 'created_at',
        type: 'string',
        default: '',
        placeholder: '2025-10-09T12:05:17.875Z',
        description: 'Timestamp in ISO8601 format (optional)',
        displayOptions: {
            show: {
                resource: ['identity'],
                operation: ['getIdentityUrl'],
            },
        },
    },
];
