# n8n-nodes-vocallabs

[![npm version](https://img.shields.io/npm/v/n8n-nodes-vocallabs.svg)](https://www.npmjs.com/package/n8n-nodes-vocallabs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n compatibility](https://img.shields.io/badge/n8n-%3E%3D1.0.0-blue.svg)](https://n8n.io/)

The official n8n community node for **[VocalLabs](https://vocallabs.ai)** — integrate AI-powered voice calling, agent management, and call analytics directly into your n8n workflows.

[Website](https://vocallabs.ai) | [API Docs](https://docs.vocallabs.ai) | [GitHub](https://github.com/Vocallabsai/n8n-nodes-vocallabs) | [Support](mailto:hello@vocallabs.ai)

---

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-vocallabs`
5. Click **Install**

### Manual Install

```bash
npm install n8n-nodes-vocallabs
```

> **Important:** Whitelist your server's IP before using the node.
> Follow the guide at [docs.vocallabs.ai/ip-whitelist](https://docs.vocallabs.ai/ip-whitelist).

---

## Getting Started

### 1. Get Your API Credentials

1. Log in to your [VocalLabs Dashboard](https://app.vocallabs.ai)
2. Navigate to **Settings** > **API Keys**
3. Copy your **Client ID** and **Client Secret**

### 2. Configure in n8n

1. Add the **VocalLabs** node to your workflow
2. Click **Create New Credential**
3. Enter your Client ID and Client Secret
4. Save — authentication is handled automatically

### 3. Build Your Workflow

Select a resource, pick an operation, fill in the parameters, and execute.

---

## Available Resources & Operations

### Dashboard
| Operation | Description |
|-----------|-------------|
| Get Dashboard Stats | Retrieve usage metrics and overview |
| Get Tokens | List available API tokens |

### Call
| Operation | Description |
|-----------|-------------|
| Initiate Call | Start a new AI voice call |
| Create Direct Call | Call via client token |
| Get Call Details | Retrieve call information |
| Get Voices | List available voice options |
| Get Call API Tokens | Retrieve call tokens |
| Call API (Webhook) | Initiate call via webhook |
| Get Call Timeline | Call history with pagination |
| Get Daily Calls | Daily call statistics |
| Get WebSocket URL | Real-time call connection |
| Get Audit | Retrieve single call audit |
| Get All Audits | List all call audits |
| Upload Audio | Upload audio files to agent |

### Agent
| Operation | Description |
|-----------|-------------|
| Get Agents | List all AI agents |
| Get Agent By ID | Retrieve agent details |
| Create Agent | Create a new AI agent |
| Update Agent | Modify agent configuration |
| Get Agent Templates | Available agent templates |
| Get Voices By Language | Language-specific voices |
| Toggle Favorite | Mark/unmark agent as favorite |
| Update Agent Shared | Set agent visibility |
| Agent Prompt History | View prompt change history |
| Update Success Metric | Configure success metrics |
| Update WhatsApp Notification | Toggle WhatsApp alerts |
| Update Mail Notification | Toggle email alerts |
| Get Agent Documents | List agent documents |
| Insert Agent Document | Upload document to agent |
| Get AI Models | Available AI models |
| Get Agent Actions | List agent actions |
| Update Agent Reschedule | Configure rescheduling |
| Get Keyword Replacements | List keyword rules |
| Get Agent Keywords | List agent keywords |
| Add Keyword | Create keyword replacement |
| Update Keyword | Modify keyword replacement |
| Delete Keyword | Remove keyword replacement |
| Get Template | Get agent template details |
| Get Agent Samples | Template sample data |
| Get Agent FAQs | List agent FAQ entries |
| Manage Agent FAQ | Create, update, or delete FAQ |

### Analytics
| Operation | Description |
|-----------|-------------|
| Get Call Statuses | Available call status types |
| Get Call Conversation | Call transcript |
| Get Call Data | Detailed call analytics |
| Get Call Status | Current call status |
| Get Call Summary | Call summary and notes |
| Get Post-Call Data | Post-call metadata |
| Update Post-Call Data | Modify post-call metadata |
| Delete Post-Call Data | Remove post-call data |
| Get VocalLabs Call | Full call details |

### Contacts
| Operation | Description |
|-----------|-------------|
| Create Contact Group | Create a new group |
| Create Contact In Group | Add contact to group |
| Update Contact Metadata | Modify contact metadata |
| Get Contact Groups | List all groups |
| Update Contact Group | Rename a group |
| Delete Contact Group | Remove a group |
| Delete Contact | Remove a contact |
| Get Contacts | List contacts with pagination |
| Add Multiple Contacts | Bulk import contacts |
| Get Contact Data | Retrieve contact details |
| Update Contact Data | Modify contact data |
| Get Contact | Get single contact |
| Create Contact Group V2 | Create group (v2 API) |
| Add Multiple Contacts V2 | Bulk import (v2 API) |

### Campaign
| Operation | Description |
|-----------|-------------|
| Get Campaigns | List all campaigns |
| Create Campaign | Create a new campaign |
| Update Campaign | Modify campaign details |
| Delete Campaign | Remove a campaign |
| Get Queueing Details | Campaign queue status |
| Get Campaign Status | Current campaign status |
| Update Campaign Status | Activate/deactivate campaign |
| Add Contacts to Campaign | Assign contacts to campaign |

### Library
| Operation | Description |
|-----------|-------------|
| Get Actions | List all actions |
| Create Action | Create a new action |
| Update Action | Modify an action |
| Delete Action | Remove an action |
| Get Documents | List all documents |
| Delete Document | Remove a document |
| Get Action Templates | Available templates |
| Get Action Template Details | Template details |
| Get Action Parameters | Action parameter config |
| Get Action Fields | Action field definitions |
| Get Action Configuration | Full action config |

### Identity
| Operation | Description |
|-----------|-------------|
| Get Flows | List verification flows |
| Get Identity URL | Generate KYC/verification URL |

### SIP
| Operation | Description |
|-----------|-------------|
| Create SIP Call | Initiate a SIP call |

### Wallet
| Operation | Description |
|-----------|-------------|
| Get Balance | Check account balance |
| Get Transaction History | View transaction records |

### Marketplace
| Operation | Description |
|-----------|-------------|
| Fetch Available Numbers | Browse purchasable numbers |
| Get Numbers | List your phone numbers |
| Fetch Countries | Available countries |

---

## Key Features

- **100+ Operations** — Full coverage of the VocalLabs API across 12 resources
- **Smart Token Management** — Tokens are cached and auto-refreshed on expiry. Concurrent requests share a single token via mutex lock, preventing duplicate token creation
- **Multi-Credential Support** — Use different VocalLabs accounts in the same workflow without conflicts
- **Clean Error Handling** — API errors are parsed into readable messages with proper error codes
- **Input Validation** — Phone numbers, dates, JSON fields, and pagination are validated before sending to the API
- **Bulk Operations** — Import contacts and manage campaigns in batch

---

## Workflow Examples

### Initiate an AI Call

```
[Manual Trigger] → [VocalLabs: Initiate Call]
```
- Resource: **Call**
- Operation: **Initiate Call**
- Agent ID: `your-agent-id`
- Prospect ID: `your-prospect-id`

### Bulk Import Contacts and Launch Campaign

```
[Spreadsheet] → [VocalLabs: Create Contact Group] → [VocalLabs: Add Multiple Contacts] → [VocalLabs: Create Campaign] → [VocalLabs: Add Contacts to Campaign]
```

### Monitor Call Analytics

```
[Schedule Trigger] → [VocalLabs: Get Daily Calls] → [VocalLabs: Get Call Summary] → [Slack: Send Message]
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Authentication failed** | Verify your Client ID and Client Secret in the credential settings |
| **Rate limit exceeded** | The API allows 10 requests/minute. Add delays between nodes or use n8n's batch processing |
| **IP not whitelisted** | Whitelist your server's IP at [docs.vocallabs.ai/ip-whitelist](https://docs.vocallabs.ai/ip-whitelist) |
| **Node not appearing** | Restart n8n after installation. Check with `npm list n8n-nodes-vocallabs` |
| **502 Bad Gateway** | Usually indicates an expired token — the node auto-refreshes and retries. If persistent, check API status |

---

## Resources

- [VocalLabs API Documentation](https://docs.vocallabs.ai/vocallabs)
- [VocalLabs Dashboard](https://app.vocallabs.ai)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)

---

## Support

- **Email:** [hello@vocallabs.ai](mailto:hello@vocallabs.ai)
- **GitHub Issues:** [Report a bug or request a feature](https://github.com/Vocallabsai/n8n-nodes-vocallabs/issues)
- **Website:** [vocallabs.ai](https://vocallabs.ai)

---

## Changelog

### v2.3.0
- Overhauled auth token management with Promise mutex — concurrent requests share a single token, preventing "max auth tokens" errors
- Fixed first-run crash where token was undefined
- Fixed retry logic to use fresh token headers after refresh
- Added multi-credential support per workflow
- Improved error handling for Cloudflare 502 responses
- Detects both 401 and 502 as auth errors for automatic token refresh

### v2.2.0
- Enhanced error handling across all operations
- Improved setup documentation

### v2.0.0
- 100+ API operations across 12 resources
- Secure token management and caching

### v1.0.0
- Initial release

---

## License

MIT License - see [LICENSE](LICENSE.md) for details.

**Built by [VocalLabs](https://vocallabs.ai)** | **[GitHub](https://github.com/Vocallabsai)** | **[hello@vocallabs.ai](mailto:hello@vocallabs.ai)**
