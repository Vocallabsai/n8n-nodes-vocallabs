import { INodeProperties } from 'n8n-workflow';

export const libraryOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['library'],
            },
        },
        options: [
            {
                name: 'Get Actions',
                value: 'getActions',
                action: 'Get actions',
                description: 'Retrieve list of actions',
            },
            {
                name: 'Create Action',
                value: 'createAction',
                action: 'Create action',
                description: 'Create a new action',
            },
            {
                name: 'Update Action',
                value: 'updateAction',
                action: 'Update action',
                description: 'Update an existing action',
            },
            {
                name: 'Delete Action',
                value: 'deleteAction',
                action: 'Delete action',
                description: 'Delete an action',
            },
            {
                name: 'Get Documents',
                value: 'getDocuments',
                action: 'Get documents',
                description: 'Retrieve list of documents',
            },
            {
                name: 'Delete Document',
                value: 'deleteDocument',
                action: 'Delete document',
                description: 'Delete a document',
            },
            {
                name: 'Get Action Templates',
                value: 'getActionTemplates',
                action: 'Get action templates',
                description: 'Retrieve available action templates',
            },
            {
                name: 'Get Action Template Details',
                value: 'getActionTemplateDetails',
                action: 'Get action template details',
                description: 'Retrieve details for an action template',
            },
            {
                name: 'Get Action Parameters',
                value: 'getActionParameters',
                action: 'Get action parameters',
                description: 'Retrieve parameters for an action',
            },
            {
                name: 'Get Action Fields',
                value: 'getActionFields',
                action: 'Get action fields',
                description: 'Retrieve fields for an action',
            },
            {
                name: 'Get Action Configuration',
                value: 'getActionConfiguration',
                action: 'Get action configuration',
                description: 'Retrieve configuration for an action',
            },
        ],
        default: 'getActions',
    },
];

export const libraryFields: INodeProperties[] = [
    {
        displayName: 'Action Name',
        name: 'action_name',
        type: 'string',
        required: true,
        default: '',
        description: 'Name of the action',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the action',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'External CURL',
        name: 'external_curl',
        type: 'string',
        required: true,
        default: '',
        description: 'External API CURL command',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Success Response',
        name: 'success_response',
        type: 'string',
        default: '',
        description: 'Success response message',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Failure Response',
        name: 'failure_response',
        type: 'string',
        default: '',
        description: 'Failure response message',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Interruption Response',
        name: 'interruption_response',
        type: 'string',
        default: '',
        description: 'Interruption response message',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Ref Code',
        name: 'ref_code',
        type: 'string',
        default: '',
        description: 'Reference code',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['createAction', 'updateAction'],
            },
        },
    },
    {
        displayName: 'Action ID',
        name: 'action_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the action',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: [
                    'updateAction',
                    'deleteAction',
                    'getActionParameters',
                    'getActionFields',
                    'getActionConfiguration',
                ],
            },
        },
    },
    {
        displayName: 'Document ID',
        name: 'document_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the document',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['deleteDocument'],
            },
        },
    },
    {
        displayName: 'Template Action ID',
        name: 'template_action_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the action template',
        displayOptions: {
            show: {
                resource: ['library'],
                operation: ['getActionTemplateDetails'],
            },
        },
    },
];
