import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
    ICredentialDataDecryptedObject,
    IDataObject,
    IHttpRequestHelper,
} from 'n8n-workflow';

// Mutex: only stores in-flight Promises, not tokens. Cleared after each resolution.
const _refreshMutex = new Map<string, Promise<IDataObject>>();

export class VocallabsApi implements ICredentialType {
    name = 'vocallabsApi';
    displayName = 'VocalLabs API';
    documentationUrl = 'https://docs.vocallabs.ai/vocallabs';
    icon = 'file:../nodes/Vocallabs/vocallabs.png' as const;
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
        {
            displayName: 'Session Token',
            name: 'sessionToken',
            type: 'hidden',
            typeOptions: {
                expirable: true,
            },
            default: '',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'Authorization': '=Bearer {{$credentials.sessionToken}}',
            },
        },
    };

    async preAuthentication(
        this: IHttpRequestHelper,
        credentials: ICredentialDataDecryptedObject,
    ): Promise<IDataObject> {
        const clientId = credentials.clientId as string;

        // Mutex: if a refresh is already in-flight for this credential, wait for it
        const existing = _refreshMutex.get(clientId);
        if (existing) {
            return await existing;
        }

        const promise = (async () => {
            const response = (await this.helpers.httpRequest({
                method: 'POST',
                url: 'https://api.superflow.run/b2b/createAuthToken/',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    clientId: credentials.clientId,
                    clientSecret: credentials.clientSecret,
                },
                json: true,
            })) as { auth_token?: string; token?: string; access_token?: string; authToken?: string };

            const token = response.auth_token || response.token || response.access_token || response.authToken;
            if (!token) {
                throw new Error('Authentication token not found in API response');
            }
            return { sessionToken: token };
        })();

        _refreshMutex.set(clientId, promise);
        try {
            return await promise;
        } finally {
            _refreshMutex.delete(clientId);
        }
    }

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.superflow.run',
            url: '/b2b/getGreenBalance',
            method: 'GET',
        },
    };
}
