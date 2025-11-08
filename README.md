# n8n-nodes-vocallabs

[![npm version](https://img.shields.io/npm/v/n8n-nodes-vocallabs.svg)](https://www.npmjs.com/package/n8n-nodes-vocallabs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n compatibility](https://img.shields.io/badge/n8n-%3E%3D1.0.0-blue.svg)](https://n8n.io/)

Official n8n community node for **VocalLabs AI Voice API**. Seamlessly integrate voice automation, AI agents, and call management into your n8n workflows.

**[VocalLabs](https://vocallabs.ai)** • **[n8n](https://n8n.io/)** • **[Documentation](https://docs.vocallabs.ai)**

---

## Table of Contents

- [Installation](#installation)
- [IP Whitelisting](#ip-whitelisting-required)
- [Quick Start](#quick-start)
- [Features](#features)
- [Operations](#operations)
- [Credentials](#credentials)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [API Documentation](#api-documentation)
- [Support](#support)
- [License](#license)
- [Authors](#authors)
- [Changelog](#changelog)

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


---

## IP Whitelisting Required

> **VocalLabs API access requires your n8n server's IP to be whitelisted before using this node.**

- **If using n8n.com (cloud) or running n8n on localhost:**  
  - Whitelist your current public IP.
  - Get it with: `curl ifconfig.me`
  - Add it at [VocalLabs Developer Dashboard](https://app.vocallabs.ai/developer) under **Security / IP Whitelist**.
- **If using self-hosted/global n8n:**  
  - Whitelist the public IP of your VM/server (found by `curl ifconfig.me` over SSH).
  - Enter it in the same Developer Dashboard.

> **Note**: If your IP changes (dynamic/home networks, cloud redeploys), update your whitelist. If using n8n.com cloud, check their [IP documentation](https://docs.n8n.io/cloud/cloud-ip-addresses/) for IP info.

---

## Quick Start

1. **Add the VocalLabs node** to your workflow  
2. **Create credentials** with your Client ID and Secret  
3. **Select a resource** (Dashboard, Contacts, Calls, etc.)  
4. **Choose an operation** and configure parameters  
5. **Execute** and use the response data  

---

## Features

✅ **100+ API Operations** – Full VocalLabs API  
✅ **11 Resources** – Calls, Agents, Analytics, Contacts, Campaigns, etc.  
✅ **Automatic Token Management** – Secure, auto-refresh authentication  
✅ **Production-Ready** – Full actionable UI error handling  
✅ **Real-time Voice Control** – Launch/manage AI agents and calls  
✅ **Bulk Operations** – Fast contact & campaign uploads  
✅ **Call Analytics** – Access detailed call data and transcripts  

---

## Operations

| Resource      | Operations            | Features                      |
|---------------|----------------------|-------------------------------|
| **Dashboard** | Get Stats, Get Tokens| Workflow overview, API tokens |
| **Wallet**    | Get Balance, History | Account management            |
| **Call**      | 11 operations        | Initiate, retrieve, manage    |
| **Agent**     | 26 operations        | Create, update, manage agents |
| **Analytics** | 9 operations         | Call data, summaries          |
| **Contacts**  | 14 operations        | CRUD, bulk group import       |
| **Campaign**  | 8 operations         | Campaign creation/management  |
| **SIP**       | Create SIP Call      | Direct SIP integration        |
| **Library**   | 11 operations        | Actions, documents, templates |
| **Identity**  | Verification URLs    | KYC/identity verification     |
| **Marketplace**| Numbers, Countries  | Phone number marketplace      |

**[Full operations reference →](https://github.com/Vocallabsai/n8n-nodes-vocallabs/wiki/Operations)**

---

## Credentials

### Required Fields

| Field         | Type   | Description                       |
|---------------|--------|-----------------------------------|
| Client ID     | String | Your VocalLabs API Client ID      |
| Client Secret | String | Your VocalLabs API Client Secret  |

How to obtain:  
1. Log in to [VocalLabs Dashboard](https://vocallabs.ai/dashboard)  
2. **Settings** > **API Keys**  
3. Copy **Client ID** and **Client Secret**  
4. Paste into n8n credentials

*Token refresh is automatic every 23 hours.*

---

## Usage Examples

**Example 1: Get Dashboard Stats**  
- Resource: Dashboard  
- Operation: Get Dashboard Stats  
- Output: Usage metrics, API tokens, call stats

**Example 2: Create Campaign**  
- Resource: Campaign  
- Operation: Create Campaign  
- Campaign Name: "Q4 Outreach"  
- Agent ID: [your-agent-id]  
- Output: Campaign ID, status

**Example 3: Bulk Import Contacts**  
- Resource: Contacts  
- Operation: Add Multiple Contacts  
- Contact Group ID: [your-group-id]  
- Contacts: Array of contacts  
- Output: Import status, contact IDs

---

## Troubleshooting

**Authentication failed**  
- Double-check Client ID/Secret  
- API keys enabled in Dashboard  
- IP properly whitelisted

**"IP Not Whitelisted"**  
- Whitelist your IP (see [IP Whitelisting](#ip-whitelisting-required))

**Rate limit exceeded**  
- Add workflow delays  
- Use n8n batching  
- Contact support for higher limits

**Node not appearing**  
- Restart n8n  
- Clear cache: `rm -rf ~/.n8n`  
- Verify install: `npm list n8n-nodes-vocallabs`

---

## API Documentation

- [VocalLabs API Docs](https://docs.vocallabs.ai)
- [n8n Community Node Guide](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Workflow Docs](https://docs.n8n.io/workflows/)

---

## Support

Need Help?
- **GitHub Issues:** [Report bugs](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues)
- **Email:** [support@vocallabs.ai](mailto:support@vocallabs.ai)
- **Community Discord:** [Join](https://discord.gg/vocallabs)

**Feature Requests:**  
Open a [GitHub issue](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues) with the `feature-request` label.

---

## License

MIT License © 2025 VocalLabs  
See [LICENSE](LICENSE) for full legal details.

---

## Authors

**VocalLabs Team**  
- Website: [vocallabs.ai](https://vocallabs.ai)  
- GitHub: [@Vocallabsai](https://github.com/Vocallabsai)  
- Email: [support@vocallabs.ai](mailto:support@vocallabs.ai)

---

## Changelog

### v2.2.0 (2025-11-09)
- Enhanced actionable error handling across all actions
- Improved onboarding and setup documentation
- Ready for production, full API coverage

### v2.0.0 (2025-10-31)
- 100+ API operations
- Secure token management & caching

### v1.0.0 (2025-10-30)
- Initial release

---

**[Get started now →](https://n8n.io/)**
