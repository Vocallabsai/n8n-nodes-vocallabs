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
        placeholder: '+1234567890',
        description: 'Phone number in international format (e.g., +1234567890, +919876543210)',
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
        description: 'ID of the prospect group. Get this from "Get Contact Groups" operation.',
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
        description: 'ID of the prospect. Get this from "Get Contacts" operation.',
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
        placeholder: '{"key": "value", "another_key": "another_value"}',
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
        description: 'Number of records to retrieve (max 100)',
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
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
        typeOptions: {
            minValue: 0,
        },
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
        description: 'ID of the contact group to delete or update',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['deleteContactGroup', 'updateContactGroup'],
            },
        },
    },
    {
        displayName: 'Contact ID',
        name: 'contact_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the contact to delete',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['deleteContact'],
            },
        },
    },
    {
        displayName: 'User ID',
        name: 'client_id',
        type: 'string',
        required: true,
        default: '',
        description: 'Your VocalLabs User ID',
        hint: 'Get this from Auth → Get Auth Info operation',
        placeholder: 'your-user-id-here',
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
        description: 'JSON object with contact data to update',
        placeholder: '{"email": "newemail@example.com", "company": "New Company"}',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['updateContactData'],
            },
        },
    },
    {
        displayName: 'Contacts',
        name: 'prospects',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        placeholder: 'Add Contact',
        description: 'Add contacts to the group',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['addMultipleContacts', 'addMultipleContactsV2'],
            },
        },
        options: [
            {
                name: 'contactValues',
                displayName: 'Contact',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        required: true,
                        placeholder: 'Joey Dash',
                        description: 'Full name of the contact',
                    },
                    {
                        displayName: 'Phone Number',
                        name: 'phone',
                        type: 'string',
                        default: '',
                        required: true,
                        placeholder: '+1234567890',
                        description: 'Phone number with country code ',
                        hint: 'e.g., +1234567890',
                    },
                    {
                        displayName: 'Additional Data (JSON)',
                        name: 'additionalData',
                        type: 'json',
                        default: '{}',
                        description: 'Additional custom fields as JSON object',
                        hint: 'Optional. Add custom data like email, company, etc.',
                        placeholder: '{"email": "joey@example.com", "company": "Vocallabs"}',
                    },
                ],
            },
        ],
    },
];
