# n8n-nodes-vocallabs

[![npm version](https://img.shields.io/npm/v/@vocallabs/n8n-nodes-vocallabs.svg)](https://www.npmjs.com/package/@vocallabs/n8n-nodes-vocallabs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n compatibility](https://img.shields.io/badge/n8n-%3E%3D1.0.0-blue.svg)](https://n8n.io/)

A comprehensive n8n community node for integrating **VocalLabs AI Voice API** into your n8n workflows.

[VocalLabs](https://vocallabs.ai) is an enterprise-grade AI-powered voice automation platform that enables businesses to create intelligent voice agents, automate outbound/inbound calls, and gain actionable insights from conversation analytics.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform with an extensive marketplace of integrations.

---

## 📋 Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Credentials](#credentials)
- [Operations](#operations)
- [Development](#development)
- [Support](#support)
- [License](#license)

---

## 🚀 Installation

### Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Search for `@vocallabs/n8n-nodes-vocallabs`
5. Click **Install**

### Via NPM

npm install @vocallabs/n8n-nodes-vocallabs

text

### Manual Installation

git clone https://github.com/Vocallabsai/n8n-nodes-vocallabs.git
cd n8n-nodes-vocallabs
npm install
npm run build

text

---

## ✨ Features

✅ **100+ API Operations** across 11 resources  
✅ **Automatic Token Management** with secure 23-hour refresh cycle  
✅ **Production-Ready** - Used by enterprise clients  
✅ **Comprehensive API Coverage** - Dashboard, Calls, Agents, Analytics, Contacts, and more  
✅ **Real-time Voice Agent Control** - Create, update, and manage AI agents  
✅ **Call Management** - Initiate calls, retrieve details, manage audio recordings  
✅ **Advanced Analytics** - Access call data, conversations, and summaries  
✅ **Contact Management** - Bulk contact operations and group management  
✅ **Campaign Automation** - Create and manage outbound call campaigns  
✅ **Marketplace Integration** - Access phone numbers and regions  

---

## 🔐 Credentials

This node requires VocalLabs authentication credentials:

| Field | Description | Required |
|-------|-------------|----------|
| **Client ID** | Your VocalLabs Client ID | ✅ Yes |
| **Client Secret** | Your VocalLabs Client Secret | ✅ Yes |

**How to obtain credentials:**

1. Log in to [VocalLabs Dashboard](https://vocallabs.ai/dashboard)
2. Navigate to **Settings** > **API Keys**
3. Create or copy your **Client ID** and **Client Secret**
4. Store them securely in n8n credentials

> **Note:** The node handles token refresh automatically. Tokens are cached for 23 hours and automatically renewed when expired.

---

## 📚 Operations

### Dashboard (2 operations)
- Get Dashboard Stats
- Get Tokens

### Wallet (2 operations)
- Get Balance
- Get Transaction History

### SIP (1 operation)
- Create SIP Call

### Call (11 operations)
- Initiate Call
- Get Call Details
- Get Voices
- Get Call API Tokens
- Call API
- Get Call Timeline
- Get Daily Calls
- Get WebSocket URL
- Get Audit (Single/All)
- Upload Audio

### Agent (26 operations)
- Get Agents / Get Agent By ID
- Create / Update Agent
- Get Agent Templates
- Get Voices By Language
- Toggle Favorite
- Update Visibility
- Get Agent Prompt History
- Update Success Metrics
- Update Notifications (WhatsApp/Email)
- Manage Documents
- Get AI Models
- Get Agent Actions
- Update Reschedule Settings
- Manage Keywords (Add/Update/Delete)
- Manage FAQs (Insert/Update/Delete)
- Get Agent Samples

### Analytics (9 operations)
- Get Call Statuses
- Get Call Conversation
- Get Call Data
- Get Call Status
- Get Call Summary
- Get Post Call Data
- Update Post Call Data
- Delete Post Call Data
- Get VocalLabs Call Data

### Contacts (14 operations)
- Create Contact Group (v1/v2)
- Create Contact In Group
- Update Contact Metadata
- Get Contact Groups
- Update Contact Group
- Delete Contact Group
- Delete Contact
- Get Contacts
- Add Multiple Contacts (v1/v2)
- Get Contact Data
- Update Contact Data
- Get Contact

### Library (11 operations)
- Get Actions
- Create / Update / Delete Action
- Get Documents
- Delete Document
- Get Action Templates
- Get Action Template Details
- Get Action Parameters
- Get Action Fields
- Get Action Configuration

### Identity (2 operations)
- Get Flows
- Get Identity Verification URL

### Campaign (8 operations)
- Get Campaigns
- Create / Update / Delete Campaign
- Get Queueing Details
- Get Campaign Status
- Update Campaign Status
- Add Contacts to Campaign

### Marketplace (3 operations)
- Fetch Available Numbers
- Get Your Numbers
- Fetch Countries

---

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

Clone the repository
git clone https://github.com/Vocallabsai/n8n-nodes-vocallabs.git
cd n8n-nodes-vocallabs

Install dependencies
npm install

Build the node
npm run build

Format code
npm run format

Run linter
npm run lint

Fix linting issues
npm run lintfix

text

### Project Structure

src/
├── credentials/
│ ├── index.ts
│ └── VocallabsApi.credentials.ts
├── nodes/
│ └── Vocallabs/
│ ├── Vocallabs.node.ts
│ ├── index.ts
│ ├── vocallabs.svg
│ ├── actions/
│ │ ├── http.ts
│ │ ├── dashboard.actions.ts
│ │ ├── wallet.actions.ts
│ │ └── ... (11 resource action files)
│ └── descriptions/
│ ├── common.resource.ts
│ ├── dashboard.description.ts
│ └── ... (11 resource description files)
└── index.ts

text

---

## 🐛 Troubleshooting

### Authentication Errors

**Issue:** "Authentication token not found in API response"

**Solution:**
- Verify Client ID and Client Secret are correct
- Check credentials have API access enabled
- Contact VocalLabs support if issue persists

### API Rate Limiting

**Issue:** "Rate limit exceeded"

**Solution:**
- Implement workflow delays between requests
- Use n8n batching features for bulk operations
- Contact VocalLabs for higher rate limits

### Node Not Appearing in n8n

**Issue:** VocalLabs node doesn't appear in node picker

**Solution:**
- Restart n8n service
- Verify node is properly installed: `npm list @vocallabs/n8n-nodes-vocallabs`
- Check n8n logs for errors

---

## 📖 Documentation

- [VocalLabs API Documentation](https://docs.vocallabs.ai)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Workflow Documentation](https://docs.n8n.io/workflows/)

---

## 🤝 Support

### For Issues & Questions

- **GitHub Issues:** [Report bugs](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues)
- **Email Support:** support@vocallabs.ai
- **Discord:** [VocalLabs Community](https://discord.gg/vocallabs)

### For Feature Requests

Please open an issue with the `feature-request` label on [GitHub](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **VocalLabs Team** - [vocallabs.ai](https://vocallabs.ai)
- Maintainer: [GitHub](https://github.com/Vocallabsai)

---

## 🙏 Acknowledgments

- Built for [n8n](https://n8n.io/)
- Powered by [VocalLabs AI](https://vocallabs.ai)
- Community contributions welcome

---

## 📈 Changelog

### v1.0.0 (2025-10-31)
- ✨ Initial release
- 🎯 100+ API operations
- 🔐 Automatic token management
- ✅ Full VocalLabs API coverage

---

**Happy automating! 🚀**