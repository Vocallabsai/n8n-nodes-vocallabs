1. Auth
# Create Authentication Token
curl -X POST 'https://api.superflow.run/b2b/createAuthToken/' \
  -H 'Content-Type: application/json' \
  -d '{
	"clientId": "CLIENT_ID",
	"clientSecret": "CLIENT_SECRET"
}'

2. Wallet 
# Get Wallet Balance
curl -X GET 'https://api.superflow.run/b2b/getGreenBalance' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Transaction History
curl -X GET 'https://api.superflow.run/b2b/whatsubTransactionHistory?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'

3. sip
# SIP call APi
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createSIPCall' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/11.0.2' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
  "phone_number": "NUMBER",
  "did": "DID",
  "websocket_url": "WEBSOCKET_URL",
  "webhook_url": "WEBHOOK_URL",
  "sample_rate": "SAMPLE_RATE"
}
'

4. Call
# Initiate Call
curl -X POST 'https://api.superflow.run/b2b/vocallabs/initiateVocallabsCall?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"agentId": "AGENT_ID",
	"prospect_id": "PROSPECT_ID"
}'

# Get Call Details
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getVocallabsCall?callId=CALL_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Call API Tokens
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallAPITokens?0=' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Call API
curl -X POST 'https://api.superflow.run/b2b/vocallabs/initiateCallWebhook' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.0' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
  "from": "DID",
  "number": "NUMBER"
}
'

# Get Call Timeline
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallTimeline?phone_to=PHONE_TO&limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Daily Calls
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getDailyCalls?start_date=START_DATE' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Websocket url
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getWebsocketUrl?agent_id=AGENT_ID&prospect_id=PROSPECT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Audit one
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getOneAudit?call_id=CALL_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Audits
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAllAudits' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# upload audio Url
curl -X POST 'https://api.superflow.run/b2b/vocallabs/uploadAudits' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.0' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"agent_id": "AGENT_ID",
	"recording_url": [
		"example1.wav",
		"example2.wav"
	]
}

'


# Create Direct Call
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createDirectCall?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"client_token_id": "CLIENT_TOKEN_ID",
	"number": "NUMBER"
}'

# Hangup Call
curl -X POST 'https://api.superflow.run/b2b/vocallabs/hangupCall?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"call_id": "3aa6340b-8b4b-4bc7-923f-614e1ee28318"
}'

5. Agents
# Get Agents
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAIAgents?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Agent By ID
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAIAgentByID?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Create New Agent
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createAIAgent?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"name" : "AGENT_NAME"
}'

# Update Agent by ID
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateAIAgent?agent_id=AGENT_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"agent_id": 
"AGENT_ID",
"name": 
"AGENT_NAME",
"inputs_needed": 
{
"contact_id": 
"CONTACT_ID"
},
"welcome_message": 
"AGENT_WELCOME_MESSAGE",
"agent_prompt": 
"Hello , your ID is .",
"analytics_prompt": 
"AGENT_ANALYTICS_PROMPT",
"language": 
"AGENT_LANGUAGE",
"call_token_id": 
"CALL_TOKEN_ID",
"voice_id": 
"VOICE_ID"
}'

# Get Agent Templates
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentTemplates' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get voices by language
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getVoicesByLanguageComment?1=&language=ENGLISH' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Toggle favorite
curl -X POST 'https://api.superflow.run/b2b/vocallabs/toggleFavorite' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"agent_id": 
"AGENT_ID",
"favorite": 
true
}'

# update visibility of agent
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateAgentShared' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"agent_id": 
"AGENT_ID",
"isShared": 
true
}'

# Agent prompt History
curl -X POST 'https://api.superflow.run/b2b/vocallabs/agentPromptHistory' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"agent_id": "AGENT_ID"

}'

# Update success metric
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateSuccessMetric' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	

"agent_id": 
"AGENT_ID",
"success_metric": 
{
"description": 
"<e.g. user is satisfied>",
	"another thing": "<desciption of another thing>"
}
}'

# Update whatsapp notification
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateWhatsappNotification' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	

"agent_id": 
"AGENT_ID",
"value": 
true
}'

# Update mail notification
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateMailNotification' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	

"agent_id": 
"AGENT_ID",
"value": 
true
}'

# Get Agent Document
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentDocuments?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Insert Agent documents
curl -X POST 'https://api.superflow.run/b2b/vocallabs/insertAgentDocx' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	

"file_name": 
"<your file name>",
"file_url": 
"https://chatgpt.com/c/683fe20c-a1c8-800b-bb69-238ced72f858",
"file_type": 
"<file type>",
"site_url": 
"https://chatgpt.com/c/683fe20c-a1c8-800b-bb69-238ced72f858",
"webcrawler_depth": 2,
"crawl_status": 
"<crawl status>"
}'

# Get AI models
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAIModels' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Agent reschedule
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentActions?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Update Agent reschedule
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateAgentReschedule?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"agent_id": "AGENT_ID",
	"reschedule": true
}'

# Get agent keyword replacements
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getKeywordReplacements?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get agent keywords
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentKeywords?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Add keywords replacements
curl -X POST 'https://api.superflow.run/b2b/vocallabs/addKeyword' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
"objects": 
[
{
"agent_id": 
"AGENT_ID",
"keyword": 
"<keywords>",
"replacement": 
"<its replacement>"
}
]

}'

# update keyword replacement
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateKeyword' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
"keyword_id": 
"KEYWORD_ID",
"keyword": 
"<keyword>",
"replacement": 
"<its replacement>"

}'

# delete keyword replacement
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteKeyword?keyword_id=KEYWORD_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Agent template
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getTemplate?template_agent_id=TEMPLATE_AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Agent samples
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentSamples?template_agent_id=TEMPLATE_AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Agent FAQs
 curl -X GET 'https://api.superflow.run/b2b/vocallabs/getAgentFaq?agent_id=AGENT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Insert Agent FAQs
curl -X POST 'https://api.superflow.run/b2b/vocallabs/agentFaq?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"agent_id": "AGENT_ID",
"ques_data": "<ques>",
"ans_data": "<ans>",
	"operation": "<delete|insert|update>",
"faq_id": "<faq-id> (not required in insert)"


}'


6. Analytics
# Get Call statuses
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallStatuses' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Call Conversation
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallConversation?call_id=CALL_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Call Data
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallData?call_id=CALL_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Call Status
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallStatus?call_id=CALL_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Call Summary
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCallSummary?call_id=CALL_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# get post call data
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getPostCallData?1=&agent_id=AGENT_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Update Post Call Data
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updatePostCallData?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"call_id": "CALL_ID",
"key": "<key>",
"prompt": "<prompt for getting the key>"
}'

# Delete Post Call Data
curl -X POST 'https://api.superflow.run/b2b/vocallabs/deletePostCallData?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"call_id": 
"CALL_ID"

}'

# Get vocallabs Call Data
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getVocallabsCall?callId=CALL_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN'


7. Contacts and groups
# Create Contact Group
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createContactGroup?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"name": "CONTACT_GROUP_NAME"
}'


# Create Contact in Group
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createContactInGroup?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"name": "CONTACT_NAME",
	"phone":"NUMBER",
	"prospect_group_id":"PROSPECT_GROUP_ID"
}'


# Update Contact Metadata in Group
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateContactMetadata?prospect_id=PROSPECT_ID' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"metadata": {
		"key": "value"
	}
}'

# Get Contact Group
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getContactGroups?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Update Contact Group
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateContactGroup?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"client_id": 
"USERID",
"id": 
"PROSPECT_GROUP_ID",
"name": 
"CONTACT_GROUP_NAME"
}'

# Delete Contact Group
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteContactGroup?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
"id": 
"{{ _.prospect_groups_id }}"
}'


# Delete Contact
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteContact?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
"contact_id": 
"CONTACT_ID"
}'


# Get Contacts
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getContacts?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Add multiple contacts to group
curl -X POST 'https://api.superflow.run/b2b/vocallabs/addMultipleContactsToGroup' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
  "prospects": [
    {
      "name": "John Doe",
      "phone": "+911204567690",
      "data": {
        "test": "test"
      },
      "prospect_group_id": "PROSPECT_GROUP_ID",
      "client_id": "USERID"
    },
    {
      "name": "Jane Smith",
      "phone": "+914877543610",
      "data": {
        "key": "test"
      },
      "prospect_group_id": "PROSPECT_GROUP_ID",
      "client_id": "USERID"
    }
  ]
}
'


# Get Contact Data
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getContactData?limit=LIMIT&offset=OFFSET&prospect_id=PROSPECT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'


#  Update Contact Data
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateContactData?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"prospect_id": 
"PROSPECT_ID",
"data": 
{
"<key>": 
"<value>",
"<key2>": 
"<value2>"
}
}'

# Get Contact
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getContact?prospect_id=PROSPECT_ID' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Create Contact Group V2
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createContactGroupV2?0=' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"name": "CONTACT_GROUP_NAME"
}'

# Add multiple contacts to group V2
curl -X POST 'https://api.superflow.run/b2b/vocallabs/addMultipleContactsToGroupV2' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
  "prospects": [
    {
      "name": "John Doe",
      "phone": "+911204567690",
      "data": {
        "test": "test"
      },
      "prospect_group_id": "PROSPECT_GROUP_ID",
      "client_id": "USERID"
    },
    {
      "name": "Jane Smith",
      "phone": "+914877543610",
      "data": {
        "key": "test"
      },
      "prospect_group_id": "PROSPECT_GROUP_ID",
      "client_id": "USERID"
    }
  ]
}
'

8. Library
# Get Actions
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActions' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Create Action
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createAction?0=' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{	
	"action_name": 
"ACTION_NAME",
"description": 
"DESCRIPTION",
"external_curl": 
"EXTERNAL_CURL",
"success_response": 
"SUCCESS_RESPONSE",
"failure_response": 
"FAILURE_RESPONSE",
"interruption_response": 
"INTERRUPTION_RESPONSE",
"ref_code": 
"REF_CODE"
}'


# Update Action
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateAction' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"id" : "ACTION_ID",
	"action_name": 
"ACTION_NAME",
"description": 
"DESCRIPTION",
"external_curl": 
"EXTERNAL_CURL",
"success_response": 
"SUCCESS_RESPONSE",
"failure_response": 
"FAILURE_RESPONSE",
"interruption_response": 
"INTERRUPTION_RESPONSE",
"ref_code": 
"REF_CODE"
}'


# Delete Action
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteAction' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"id" : "ACTION_ID"
}'

# Get Documents
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getDocuments' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Delete Document
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteDocument' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"id" : "DOCUMENT_ID"
}'

# Get Action templates
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActionTemplates' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Action template details
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActionTemplateDetails?template_action_id=TEMPLATE_ACTION_ID' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Action Parameter
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActionParameters?action_id=ACTION_ID' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Action fields
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActionFields?action_id=ACTION_ID' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Action Configuration
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getActionConfiguration?action_id=ACTION_ID' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'


9. Identity
# Get Flows
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getFlows' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Identity Url
curl -X POST 'https://api.superflow.run/b2b/vocallabs/getIdentityUrl' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"flow_id": "FLOW_ID",
"prospect_id": "PROSPECT_ID",

"verification_type": "aadhaar or pan",
"created_at": "2025-10-09T12:05:17.875Z" 

}'

10. Dashboard
# Get Dashboard stats
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getDashboardStats' \
  -H 'User-Agent: insomnia/11.1.0' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Get Tokens
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getTokens' \
  -H 'User-Agent: insomnia/11.1.0' \
  -H 'Authorization: Bearer AUTH_TOKEN'


11. Campaigns
# Get Campaigns
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCampaigns' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Create Campaign
curl -X POST 'https://api.superflow.run/b2b/vocallabs/createCampaign' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"name": "CAMPAIGN_NAME",
	"agent_id": "AGENT_ID"
}'


# Update Campaign
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateCampaign' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"campaign_id": "CAMPAIGN_ID",
	"campaign_name": "CAMPAIGN_NAME"
}'

# Delete Campaign
curl -X DELETE 'https://api.superflow.run/b2b/vocallabs/deleteCampaign' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"id" : "CAMPAIGN_ID"
}'


# Get Queueing Details
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getQueueingDetails?limit=LIMIT&offset=OFFSET&campaign_id=CAMPAIGN_ID' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Campaign Status
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getCampaignStatus?campaign_id=CAMPAIGN_ID' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN'

# Update Campaign Status
curl -X POST 'https://api.superflow.run/b2b/vocallabs/updateCampaignStatus' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/10.3.1' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	
"campaign_id": 
"CAMPAIGN_ID",
	"active": false

}'


# Add Contacts to Campaign
 curl -X POST 'https://api.superflow.run/b2b/vocallabs/addContactsToCampaign' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/11.1.0' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -d '{
	"user_id": "CLIENT_ID",
	"campaign_id": "CAMPAIGN_ID",
	"prospect_group_id":"PROSPECT_GROUP_ID"
}'


12. Marketplace
# Fetch Available Numbers
curl -X GET 'https://api.superflow.run/b2b/vocallabs/fetchAvailableNumbers?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Get Your Numbers
curl -X GET 'https://api.superflow.run/b2b/vocallabs/getNumbers?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'


# Fetch Countries
curl -X GET 'https://api.superflow.run/b2b/vocallabs/fetchCountries?limit=LIMIT&offset=OFFSET' \
  -H 'Authorization: Bearer AUTH_TOKEN'

