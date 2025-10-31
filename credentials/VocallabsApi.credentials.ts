import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VocallabsApi implements ICredentialType {
	name = 'vocallabsApi';
	displayName = 'VocalLabs API';
	documentationUrl = 'vocallabs';
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your VocalLabs Client ID',
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
			description: 'Your VocalLabs Client Secret',
		},
	];
}
