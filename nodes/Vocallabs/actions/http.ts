import { IExecuteFunctions, IHttpRequestOptions, NodeApiError } from 'n8n-workflow';

export const baseUrl = 'https://api.superflow.run';

/**
 * Retrieves a cached auth token or generates a new one automatically
 * Token is cached for 23 hours in workflow static data
 */
export async function getAuthToken(ctx: IExecuteFunctions): Promise<string> {
	const credentials = await ctx.getCredentials('vocallabsApi') as {
		clientId: string;
		clientSecret: string;
	};

	// Check for cached token in workflow static data
	const staticData = ctx.getWorkflowStaticData('node');
	const cachedToken = staticData.authToken as string | undefined;
	const tokenExpiry = staticData.tokenExpiry as number | undefined;

	// Return cached token if still valid
	if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
		return cachedToken;
	}

	// Generate new token via createAuthToken API
	try {
		const options: IHttpRequestOptions = {
			method: 'POST',
			url: `${baseUrl}/b2b/createAuthToken/`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				clientId: credentials.clientId,
				clientSecret: credentials.clientSecret,
			},
			json: true,
		};

		const response = await ctx.helpers.httpRequest(options) as any;

		// Handle multiple possible token field names
		const token = response.auth_token || response.token || response.access_token || response.authToken;

		if (!token) {
			throw new NodeApiError(ctx.getNode(), {
				message: 'Authentication token not found in API response',
				description: 'Please check your Client ID and Client Secret',
			});
		}

		// Cache token for 23 hours (1 hour buffer before 24h expiry)
		staticData.authToken = token;
		staticData.tokenExpiry = Date.now() + (23 * 60 * 60 * 1000);

		return token;
	} catch (error) {
		throw new NodeApiError(ctx.getNode(), {
			message: 'Failed to generate authentication token',
			description: error.message || 'Please verify your credentials',
		});
	}
}

/**
 * Makes an HTTP request with automatic Bearer token injection
 */
export async function request(
	ctx: IExecuteFunctions,
	options: IHttpRequestOptions,
): Promise<any> {
	const token = await getAuthToken(ctx);

	const requestOptions: IHttpRequestOptions = {
		...options,
		headers: {
			'Authorization': `Bearer ${token}`,
			...(options.headers || {}),
		},
		json: options.json !== undefined ? options.json : true,
	};

	try {
		return await ctx.helpers.httpRequest(requestOptions);
	} catch (error) {
		throw new NodeApiError(ctx.getNode(), {
			message: error.message || 'API request failed',
			description: error.description || '',
		});
	}
}
