# n8n-nodes-vocallabs

This is an n8n community node that lets you use VocalLabs AI Voice API in your n8n workflows.

[VocalLabs](https://vocallabs.ai) is an AI-powered voice automation platform that enables businesses to create intelligent voice agents, automate calls, and analyze conversations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Click **Install** 
3. Enter `n8n-nodes-vocallabs` in the npm package name field
4. Click **Install**

## Operations

This node supports the following resources and operations:

### Auth
- Create Auth Token
- Get Tokens

### Dashboard
- Get Dashboard Stats

### Wallet
- Get Wallet Balance
- Get Transaction History

### SIP
- Create SIP Call

### Call
- Initiate Call
- Get Call Details
- Get Voices
- Get Call API Tokens
- Call API
- Get Call Timeline
- Get Daily Calls
- Get Websocket URL
- Get Audit (One/All)
- Upload Audio URL

### Agent
- Get Agents
- Get Agent By ID
- Create/Update Agent
- Get Agent Templates
- Get Voices By Language
- Toggle Favorite
- Update Visibility
- Agent Prompt History
- Update Success Metrics
- Update Notifications (WhatsApp/Email)
- Manage Documents
- Get AI Models
- Manage Keywords
- Manage FAQs
- And more...

### Analytics
- Get Call Statuses
- Get Call Conversation
- Get Call Data/Status/Summary
- Manage Post Call Data

### Contacts & Groups
- Create/Update/Delete Contact Groups
- Create/Update/Delete Contacts
- Add Multiple Contacts to Group
- Get Contact Data

### Library
- Create/Update/Delete Actions
- Get/Delete Documents
- Get Action Templates & Configuration

### Identity
- Get Flows
- Get Identity Verification URL

### Campaign
- Create/Update/Delete Campaigns
- Get Campaign Status
- Add Contacts to Campaign
- Get Queueing Details

### Marketplace
- Fetch Available Phone Numbers
- Get Your Numbers
- Fetch Countries

## Credentials

This node requires VocalLabs API credentials. You'll need:

- **API Key**: Your VocalLabs authentication token

You can obtain your API key from your [VocalLabs Dashboard](https://vocallabs.ai/dashboard).

## Compatibility

- Minimum n8n version: 1.0.0
- Tested with n8n version: 1.70.0+

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [VocalLabs API Documentation](https://docs.vocallabs.ai)
* [VocalLabs Website](https://vocallabs.ai)

## Development

Want to contribute? Great!

Clone the repository
git clone https://github.com/rohan-phogat/n8n-nodes-vocallabs.git
cd n8n-nodes-vocallabs

Install dependencies
npm install

Build the node
npm run build

Run linting
npm run lint


## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/rohan-phogat/n8n-nodes-vocallabs/issues)
- Contact VocalLabs support at [rohan@vocallabs.ai](mailto:rohan@vocallabs.ai)

## License

[MIT](LICENSE.md)

## Author

**VocalLabs**
- Email: mritunjoy.das@vocallabs.ai
- Website: [vocallabs.ai](https://vocallabs.ai)
- GitHub: [@Vocallabsai](https://github.com/Vocallabsai)