import { INodeProperties } from 'n8n-workflow';

export const sipOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['sip'],
            },
        },
        options: [
            {
                name: 'Create SIP Call',
                value: 'createSIPCall',
                action: 'Create a SIP call',
                description: 'Initiate a new SIP call',
            },
        ],
        default: 'createSIPCall',
    },
];

export const sipFields: INodeProperties[] = [
    {
        displayName: 'Phone Number',
        name: 'phone_number',
        type: 'string',
        required: true,
        default: '',
        placeholder: '+1234567890',
        description: 'Phone number to call in international format (e.g., +1234567890)',
        displayOptions: {
            show: {
                resource: ['sip'],
                operation: ['createSIPCall'],
            },
        },
    },
    {
        displayName: 'DID',
        name: 'did',
        type: 'string',
        required: true,
        default: '',
        description: 'Direct Inward Dialing number',
        displayOptions: {
            show: {
                resource: ['sip'],
                operation: ['createSIPCall'],
            },
        },
    },
    {
        displayName: 'WebSocket URL',
        name: 'websocket_url',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'wss://your-server.com/audio',
        description: 'WebSocket server URL (must start with ws:// or wss://)',
        displayOptions: {
            show: {
                resource: ['sip'],
                operation: ['createSIPCall'],
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'webhook_url',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'https://your-server.com/webhook',
        description: 'Webhook callback URL for call events',
        displayOptions: {
            show: {
                resource: ['sip'],
                operation: ['createSIPCall'],
            },
        },
    },
    {
        displayName: 'Sample Rate',
        name: 'sample_rate',
        type: 'options',
        options: [
            {
                name: '8000 Hz (Telephone Quality)',
                value: '8000',
            },
            {
                name: '16000 Hz (Wideband)',
                value: '16000',
            },
            {
                name: '24000 Hz (Super Wideband)',
                value: '24000',
            },
            {
                name: '48000 Hz (Full Band)',
                value: '48000',
            },
        ],
        default: '16000',
        description: 'Audio sample rate for the call',
        displayOptions: {
            show: {
                resource: ['sip'],
                operation: ['createSIPCall'],
            },
        },
    },
];
