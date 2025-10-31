# n8n-nodes-vocallabs

[![npm version](https://img.shields.io/npm/v/n8n-nodes-vocallabs.svg)](https://www.npmjs.com/package/n8n-nodes-vocallabs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n compatibility](https://img.shields.io/badge/n8n-%3E%3D1.0.0-blue.svg)](https://n8n.io/)

Official n8n community node for **VocalLabs AI Voice API**. Seamlessly integrate voice automation, AI agents, and call management into your n8n workflows.

**[VocalLabs](https://vocallabs.ai)** • **[n8n](https://n8n.io/)** • **[Documentation](https://docs.vocallabs.ai)**

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Operations](#operations)
- [Credentials](#credentials)
- [Support](#support)
- [License](#license)

---

## Installation

### Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Search for `n8n-nodes-vocallabs`
5. Click **Install**

### Via NPM

npm install n8n-nodes-vocallabs

text

---

## Quick Start

1. **Add the VocalLabs node** to your workflow
2. **Create credentials** with your Client ID and Client Secret
3. **Select a resource** (Dashboard, Contacts, Calls, etc.)
4. **Choose an operation** and configure parameters
5. **Execute** and use the response data

---

## Features

✅ **100+ API Operations** - Complete VocalLabs API coverage  
✅ **11 Resources** - Dashboard, Calls, Agents, Analytics, Contacts, and more  
✅ **Automatic Token Management** - Secure, auto-refreshing authentication  
✅ **Production-Ready** - Enterprise-grade stability  
✅ **Real-time Voice Control** - Create and manage AI agents on-the-fly  
✅ **Call Analytics** - Access detailed call data and conversations  
✅ **Bulk Operations** - Manage contacts and campaigns at scale  

---

## Operations

The node supports operations across 11 core resources:

| Resource | Operations | Features |
|----------|-----------|----------|
| **Dashboard** | Get Stats, Get Tokens | Workflow overview & API tokens |
| **Wallet** | Get Balance, Transaction History | Account management |
| **Call** | 11 operations | Initiate, retrieve, manage calls |
| **Agent** | 26 operations | Create, update, manage voice agents |
| **Analytics** | 9 operations | Call data, summaries, analytics |
| **Contacts** | 14 operations | CRUD operations, bulk imports |
| **Campaign** | 8 operations | Campaign creation & management |
| **SIP** | Create SIP Call | Direct SIP integration |
| **Library** | 11 operations | Actions, documents, templates |
| **Identity** | Verification URLs | KYC/identity verification |
| **Marketplace** | Numbers, Countries | Phone number marketplace |

**[View complete operations list →](https://github.com/Vocallabsai/n8n-nodes-vocallabs/wiki/Operations)**

---

## Credentials

### Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Client ID | String | ✅ | Your VocalLabs API Client ID |
| Client Secret | String | ✅ | Your VocalLabs API Client Secret |

### How to Obtain Credentials

1. Log in to [VocalLabs Dashboard](https://vocallabs.ai/dashboard)
2. Navigate to **Settings** > **API Keys**
3. Copy your **Client ID** and **Client Secret**
4. Add to n8n credentials

**Note:** Token refresh is automatic and happens every 23 hours. No manual intervention needed.

---

## Usage Examples

### Example 1: Get Dashboard Statistics

Resource: Dashboard
Operation: Get Dashboard Stats
Output: Dashboard metrics, tokens, usage stats

text

### Example 2: Create Outbound Call Campaign

Resource: Campaign
Operation: Create Campaign
Parameters:

Campaign Name: "Q4 Outreach"

Agent ID: [Your Agent ID]
Output: Campaign ID, status

text

### Example 3: Bulk Import Contacts

Resource: Contacts
Operation: Add Multiple Contacts
Parameters:

Contact Group ID: [Group ID]

Contacts: [Array of contact objects]
Output: Import status, contact IDs

text

---

## Troubleshooting

### "Authentication failed"
- Verify Client ID and Client Secret are correct
- Ensure API access is enabled in VocalLabs Dashboard
- Check network connectivity to VocalLabs API

### "Rate limit exceeded"
- Implement delays between requests in your workflow
- Use n8n batching for bulk operations
- Contact VocalLabs support for higher limits

### Node not appearing in n8n
- Restart n8n service
- Clear n8n cache: `rm -rf ~/.n8n`
- Verify installation: `npm list n8n-nodes-vocallabs`

---

## API Documentation

- **VocalLabs API Docs:** https://docs.vocallabs.ai
- **n8n Integration Guide:** https://docs.n8n.io/integrations/community-nodes/
- **n8n Workflow Docs:** https://docs.n8n.io/workflows/

---

## Support

### Need Help?

- **GitHub Issues:** [Report bugs](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues)
- **Email:** support@vocallabs.ai
- **Community Discord:** [Join us](https://discord.gg/vocallabs)

### Feature Requests

Open a [GitHub issue](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues) with the `feature-request` label.

---

## License

MIT License © 2025 VocalLabs

See [LICENSE](LICENSE) file for details.

---

## Authors

**VocalLabs Team**
- Website: [vocallabs.ai](https://vocallabs.ai)
- GitHub: [@Vocallabsai](https://github.com/Vocallabsai)
- Email: support@vocallabs.ai

---

## Changelog

### v2.0.0 (2025-10-31)
- ✨ Complete rewrite with 100+ operations
- 🔐 Automatic token refresh (23-hour cache)
- ✅ Full VocalLabs API coverage
- 🚀 Production-ready release

### v1.0.0 (2025-10-30)
- Initial release

---

**Ready to automate your voice workflows? [Get started now →](https://n8n.io/)**