import {
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class VocallabsApi implements ICredentialType {
    name = 'vocallabsApi';
    displayName = 'VocalLabs API';
    documentationUrl = 'https://docs.vocallabs.ai/vocallabs';
    properties: INodeProperties[] = [
        {
            displayName: 'Client ID',
            name: 'clientId',
            type: 'string',
            default: '',
            required: true,
            placeholder: 'your-client-id-here',
            description: 'Your VocalLabs Client ID. Get it from VocalLabs Dashboard > Settings > API Credentials',
        },
        {
            displayName: 'Client Secret',
            name: 'clientSecret',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            placeholder: 'your-client-secret-here',
            description: 'Your VocalLabs Client Secret. Keep this secure and never share it publicly',
        },
    ];

    test: ICredentialTestRequest = {
        request: {
            method: 'POST',
            baseURL: 'https://api.superflow.run',
            url: '/b2b/createAuthToken/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                clientId: '={{ $credentials.clientId }}',
                clientSecret: '={{ $credentials.clientSecret }}',
            },
        },
    };
}
