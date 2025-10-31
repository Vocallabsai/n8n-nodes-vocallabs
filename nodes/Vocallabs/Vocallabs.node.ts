import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

// Import resource descriptions
import { resourceSelector } from './descriptions/common.resource';
import { dashboardOperations, dashboardFields } from './descriptions/dashboard.description';
import { walletOperations, walletFields } from './descriptions/wallet.description';
import { sipOperations, sipFields } from './descriptions/sip.description';
import { callOperations, callFields } from './descriptions/call.description';
import { agentOperations, agentFields } from './descriptions/agent.description';
import { analyticsOperations, analyticsFields } from './descriptions/analytics.description';
import { contactsOperations, contactsFields } from './descriptions/contacts.description';
import { libraryOperations, libraryFields } from './descriptions/library.description';
import { identityOperations, identityFields } from './descriptions/identity.description';
import { campaignOperations, campaignFields } from './descriptions/campaign.description';
import { marketplaceOperations, marketplaceFields } from './descriptions/marketplace.description';

// Import action handlers
import * as dashboardActions from './actions/dashboard.actions';
import * as walletActions from './actions/wallet.actions';
import * as sipActions from './actions/sip.actions';
import * as callActions from './actions/call.actions';
import * as agentActions from './actions/agent.actions';
import * as analyticsActions from './actions/analytics.actions';
import * as contactsActions from './actions/contacts.actions';
import * as libraryActions from './actions/library.actions';
import * as identityActions from './actions/identity.actions';
import * as campaignActions from './actions/campaign.actions';
import * as marketplaceActions from './actions/marketplace.actions';

export class Vocallabs implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VocalLabs',
		name: 'vocallabs',
		icon: 'file:vocallabs.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with VocalLabs API',
		defaults: {
			name: 'VocalLabs',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'vocallabsApi',
				required: true,
			},
		],
		properties: [
			resourceSelector,
			...dashboardOperations,
			...walletOperations,
			...sipOperations,
			...callOperations,
			...agentOperations,
			...analyticsOperations,
			...contactsOperations,
			...libraryOperations,
			...identityOperations,
			...campaignOperations,
			...marketplaceOperations,
			...dashboardFields,
			...walletFields,
			...sipFields,
			...callFields,
			...agentFields,
			...analyticsFields,
			...contactsFields,
			...libraryFields,
			...identityFields,
			...campaignFields,
			...marketplaceFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Operation map with all handlers directly referenced
		const operationHandlers: {
			[key: string]: {
				[key: string]: (ctx: IExecuteFunctions, itemIndex: number) => Promise<any>;
			};
		} = {
			dashboard: {
				getDashboardStats: dashboardActions.getDashboardStats,
				getTokens: dashboardActions.getTokens,
			},
			wallet: {
				getBalance: walletActions.getBalance,
				getTransactionHistory: walletActions.getTransactionHistory,
			},
			sip: {
				createSIPCall: sipActions.createSIPCall,
			},
			call: {
				initiateCall: callActions.initiateCall,
				getCallDetails: callActions.getCallDetails,
				getVoices: callActions.getVoices,
				getCallAPITokens: callActions.getCallAPITokens,
				callAPI: callActions.callAPI,
				getCallTimeline: callActions.getCallTimeline,
				getDailyCalls: callActions.getDailyCalls,
				getWebsocketUrl: callActions.getWebsocketUrl,
				getAudit: callActions.getAudit,
				getAllAudits: callActions.getAllAudits,
				uploadAudio: callActions.uploadAudio,
			},
			agent: {
				getAgents: agentActions.getAgents,
				getAgentById: agentActions.getAgentById,
				createAgent: agentActions.createAgent,
				updateAgent: agentActions.updateAgent,
				getAgentTemplates: agentActions.getAgentTemplates,
				getVoicesByLanguage: agentActions.getVoicesByLanguage,
				toggleFavorite: agentActions.toggleFavorite,
				updateAgentShared: agentActions.updateAgentShared,
				agentPromptHistory: agentActions.agentPromptHistory,
				updateSuccessMetric: agentActions.updateSuccessMetric,
				updateWhatsappNotification: agentActions.updateWhatsappNotification,
				updateMailNotification: agentActions.updateMailNotification,
				getAgentDocuments: agentActions.getAgentDocuments,
				insertAgentDocument: agentActions.insertAgentDocument,
				getAIModels: agentActions.getAIModels,
				getAgentActions: agentActions.getAgentActions,
				updateAgentReschedule: agentActions.updateAgentReschedule,
				getKeywordReplacements: agentActions.getKeywordReplacements,
				getAgentKeywords: agentActions.getAgentKeywords,
				addKeyword: agentActions.addKeyword,
				updateKeyword: agentActions.updateKeyword,
				deleteKeyword: agentActions.deleteKeyword,
				getTemplate: agentActions.getTemplate,
				getAgentSamples: agentActions.getAgentSamples,
				getAgentFaq: agentActions.getAgentFaq,
				manageAgentFaq: agentActions.manageAgentFaq,
			},
			analytics: {
				getCallStatuses: analyticsActions.getCallStatuses,
				getCallConversation: analyticsActions.getCallConversation,
				getCallData: analyticsActions.getCallData,
				getCallStatus: analyticsActions.getCallStatus,
				getCallSummary: analyticsActions.getCallSummary,
				getPostCallData: analyticsActions.getPostCallData,
				updatePostCallData: analyticsActions.updatePostCallData,
				deletePostCallData: analyticsActions.deletePostCallData,
				getVocallabsCall: analyticsActions.getVocallabsCall,
			},
			contacts: {
				createContactGroup: contactsActions.createContactGroup,
				createContactInGroup: contactsActions.createContactInGroup,
				updateContactMetadata: contactsActions.updateContactMetadata,
				getContactGroups: contactsActions.getContactGroups,
				updateContactGroup: contactsActions.updateContactGroup,
				deleteContactGroup: contactsActions.deleteContactGroup,
				deleteContact: contactsActions.deleteContact,
				getContacts: contactsActions.getContacts,
				addMultipleContacts: contactsActions.addMultipleContacts,
				getContactData: contactsActions.getContactData,
				updateContactData: contactsActions.updateContactData,
				getContact: contactsActions.getContact,
				createContactGroupV2: contactsActions.createContactGroupV2,
				addMultipleContactsV2: contactsActions.addMultipleContactsV2,
			},
			library: {
				getActions: libraryActions.getActions,
				createAction: libraryActions.createAction,
				updateAction: libraryActions.updateAction,
				deleteAction: libraryActions.deleteAction,
				getDocuments: libraryActions.getDocuments,
				deleteDocument: libraryActions.deleteDocument,
				getActionTemplates: libraryActions.getActionTemplates,
				getActionTemplateDetails: libraryActions.getActionTemplateDetails,
				getActionParameters: libraryActions.getActionParameters,
				getActionFields: libraryActions.getActionFields,
				getActionConfiguration: libraryActions.getActionConfiguration,
			},
			identity: {
				getFlows: identityActions.getFlows,
				getIdentityUrl: identityActions.getIdentityUrl,
			},
			campaign: {
				getCampaigns: campaignActions.getCampaigns,
				createCampaign: campaignActions.createCampaign,
				updateCampaign: campaignActions.updateCampaign,
				deleteCampaign: campaignActions.deleteCampaign,
				getQueueingDetails: campaignActions.getQueueingDetails,
				getCampaignStatus: campaignActions.getCampaignStatus,
				updateCampaignStatus: campaignActions.updateCampaignStatus,
				addContactsToCampaign: campaignActions.addContactsToCampaign,
			},
			marketplace: {
				fetchAvailableNumbers: marketplaceActions.fetchAvailableNumbers,
				getNumbers: marketplaceActions.getNumbers,
				fetchCountries: marketplaceActions.fetchCountries,
			},
		};

		// Validate resource and operation exist
		if (!operationHandlers[resource]) {
			throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
		}

		if (!operationHandlers[resource][operation]) {
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation "${operation}" for resource "${resource}"`
			);
		}

		const handler = operationHandlers[resource][operation];

		// Execute for each item
		for (let i = 0; i < items.length; i++) {
			try {
				const responseData = await handler(this, i);
				returnData.push({
					json: responseData,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
