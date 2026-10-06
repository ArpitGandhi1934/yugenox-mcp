# Instagram + YouTube data for AI agents (MCP)

Connect two public-data scrapers to ChatGPT, Claude, Claude Code, Cursor, VS Code, Windsurf,
n8n or your own agent in about a minute. No YouTube API key, no Instagram account, no shared
keys: you sign in to your own [Apify](https://apify.com) account with OAuth and pay per result.

| Actor | What it is good at | Price (2026-09-26) |
|---|---|---|
| [YouTube Scraper](https://apify.com/yugenox/youtube-scraper) | Video stats, top comments and a dislike estimate in one row, from search terms, channels, playlists or video URLs. No API quota. | $2.00 per 1,000 videos, comments included |
| [Instagram Scraper](https://apify.com/yugenox/instagram-scraper) | Reels to text, plus public creator signals: engagement, paid-partnership flags, related accounts, business contacts in the bio. No login. | $1.90 per 1,000 results, transcripts $0.004 per minute |

Both are published by Yugenox Corporation on the Apify Store. This repo holds no server code:
Apify hosts the MCP server at `mcp.apify.com`, and the URLs below pin it to these two Actors.

## Pick a server

| Name | Tools | URL |
|---|---|---|
| `yugenox-social` | both Actors | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper` |
| `yugenox-youtube` | YouTube only | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/youtube-scraper` |
| `yugenox-instagram` | Instagram only | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper` |

Each server exposes `yugenox--youtube-scraper` and/or `yugenox--instagram-scraper`, plus
`fetch-actor-details` (lets the agent read the README and current price before a paid run)
and Apify's run helpers `get-actor-run`, `get-dataset-items`, `get-key-value-store-record`
and `abort-actor-run`.

Also in this repo: four more pinned servers for **Canadian grocery prices, Canadian retail
store stock, Realtor.ca + Kijiji, and company career-site jobs**. See
[More pinned servers](#more-pinned-servers-canada-retail-real-estate-and-jobs). They connect
the same way: swap in their name and URL in any of the steps below.

**Sign-in:** the first tool call opens an Apify sign-in page (OAuth). Runs bill to the account
you sign in with. Never paste a token into one of these URLs.

## Connect in 60 seconds

### Claude Code

```bash
claude mcp add --transport http yugenox-social "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper"
```

Then run `/mcp`, pick `yugenox-social` and authenticate in the browser.

Or install the plugin, which adds the same server plus two skills that state the cost before
each run:

```
/plugin marketplace add ArpitGandhi1934/yugenox-mcp
/plugin install yugenox-social-data@yugenox-mcp
```

The plugin folder, [`plugins/yugenox-social-data`](plugins/yugenox-social-data), also follows the
[Agent Plugins 1.0](https://agent-plugins.org) format (`plugin.json`, `mcp.json`, `skills/`), so
other clients that load Agent Plugins can install the same server and skills from it.

### Claude.ai and Claude Desktop

Settings → Connectors → **Add custom connector**. Name it `yugenox-social`, paste the server
URL, click **Add**, then **Connect** and sign in to Apify. Leave the OAuth client fields empty;
Apify registers the client automatically.

### ChatGPT

ChatGPT on the web → Settings → Apps & Connectors → Advanced settings → turn on **Developer
mode**. Back in Apps & Connectors, click **Create**, paste the server URL, set Authentication
to **OAuth**, confirm, and sign in to Apify. In a chat, enable the connector from the **+**
menu under Developer mode. (Menu labels move between ChatGPT releases; the flow stays the same.)

### Cursor

[![Add YouTube + Instagram to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=yugenox-social&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC9pbnN0YWdyYW0tc2NyYXBlcix5dWdlbm94L3lvdXR1YmUtc2NyYXBlciJ9)

YouTube only: [install](https://cursor.com/en/install-mcp?name=yugenox-youtube&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC95b3V0dWJlLXNjcmFwZXIifQ%3D%3D) ·
Instagram only: [install](https://cursor.com/en/install-mcp?name=yugenox-instagram&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC9pbnN0YWdyYW0tc2NyYXBlciJ9)

Or add it to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "yugenox-social": {
      "url": "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper"
    }
  }
}
```

Cursor then asks you to sign in: open Settings → MCP and click the login button next to
the server to finish the Apify sign-in.

### VS Code (GitHub Copilot agent mode)

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_yugenox--social-0098FF?logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-social&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Finstagram-scraper%2Cyugenox%2Fyoutube-scraper%22%7D)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_yugenox--social-24bfa5?logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-social&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Finstagram-scraper%2Cyugenox%2Fyoutube-scraper%22%7D&quality=insiders)

YouTube only: [install](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-youtube&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Fyoutube-scraper%22%7D) ·
Instagram only: [install](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-instagram&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Finstagram-scraper%22%7D)

Or add it to `.vscode/mcp.json` (note the `servers` key):

```json
{
  "servers": {
    "yugenox-social": {
      "type": "http",
      "url": "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper"
    }
  }
}
```

VS Code asks you to sign in to Apify when the server starts.

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`, then refresh the MCP panel and sign in:

```json
{
  "mcpServers": {
    "yugenox-social": {
      "serverUrl": "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper"
    }
  }
}
```

### n8n

Add an **AI Agent** node, then attach an **MCP Client Tool**:

- Endpoint: the server URL
- Server Transport: **HTTP Streamable**
- Authentication: **MCP OAuth2** where your n8n version offers it; otherwise **Bearer Auth**
  with a credential that holds your own Apify token (kept in n8n's credential store, never in
  the URL)
- Tools to include: `yugenox--youtube-scraper`, `yugenox--instagram-scraper`, `fetch-actor-details`

### Clients without remote OAuth

Any MCP client that only runs local (stdio) servers can use the `mcp-remote` bridge, which
opens the Apify sign-in in your browser:

```json
{
  "mcpServers": {
    "yugenox-social": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper"]
    }
  }
}
```

Every link and config above is generated from one file: [`install-links.json`](install-links.json).

## Use it from code

Minimal, runnable examples in [`examples/`](examples/). Each reads your own `APIFY_TOKEN`
from the environment and sends it as an `Authorization` header.

| Framework | Example | How it connects |
|---|---|---|
| LangChain / LangGraph | [`langgraph/youtube_langgraph.py`](examples/langgraph/youtube_langgraph.py) | `ApifyActorsTool("yugenox/youtube-scraper")` |
| CrewAI | [`crewai/instagram_crew.py`](examples/crewai/instagram_crew.py) | `ApifyActorsTool(actor_name="yugenox/instagram-scraper")` |
| LlamaIndex | [`llamaindex/youtube_comments_mcp.py`](examples/llamaindex/youtube_comments_mcp.py) | `BasicMCPClient` + `McpToolSpec` on the pinned URL |
| OpenAI Agents SDK | [`openai-agents/social_agent.py`](examples/openai-agents/social_agent.py) | `MCPServerStreamableHttp` on the pinned URL |
| Vercel AI SDK | [`vercel-ai-sdk/youtube-agent.ts`](examples/vercel-ai-sdk/youtube-agent.ts) | `createMCPClient` from `@ai-sdk/mcp` |
| Claude Agent SDK | [`claude-agent-sdk/instagram-agent.ts`](examples/claude-agent-sdk/instagram-agent.ts) | `mcpServers` with `type: "http"` |

## What it costs

You pay Apify per result, from your own account. Prices below are the Store list prices on
2026-09-26; the Actor pages are the source of truth.

- **YouTube:** $0.002 per video row. Top comments and the dislike estimate ride inside the
  row, so 100 videos with 20 comments each is **$0.20**. The same job with
  `streamers/youtube-scraper` plus its separate `streamers/youtube-comments-scraper` is $4.40
  at their Free-tier prices ($0.40 for videos + $4.00 for 2,000 comments).
- **Instagram:** $0.0019 per row (post, comment, profile, place or keyword). Latest comments,
  Instagram's AI summary and view counts are included. Transcripts add $0.004 per started
  minute of audio, so a 30-second reel with its transcript is about **$0.0059**. Reels with
  no detectable speech are usually skipped for transcription.
- On Instagram, rows removed by your filters, sources that return nothing and private
  accounts cost nothing.
- On YouTube, every saved row is billed at $0.002, including error rows: an empty or
  over-filtered search, an unknown channel or playlist, and an unavailable, private or
  age-restricted video each save one row with an `error` field explaining why.

Good habit for agents: set `maxItems` on every call and say the estimate before running.
The plugin skills and example prompts do this.

## Example prompts

YouTube:

- "Pull the last 50 videos from @NASA and flag the ones above 2x the channel's median views."
- "Top 30 videos about 'home espresso' uploaded this month, sorted by views, with 10 top comments each. What do viewers complain about?"
- "Like-to-dislike ratio for these 40 video URLs." (Dislikes are estimates, see below.)
- "Audit @somecreator before we sponsor them: average views over the last 30 uploads and the sponsor and social links in their descriptions."

Instagram:

- "Transcribe the last 20 reels from @nasa and group the opening lines into hook types."
- "Every post [a brand handle] published in the last 30 days with likes, comments and plays."
- "Vet @somecreator: engagement rate over the last 30 posts, paid-partnership posts, and 20 similar accounts with a contact in their bio."
- "Reels using this sound: https://www.instagram.com/reels/audio/271328201351336/"

## Honest limits

- **Public data only.** Nothing behind a sign-in: no stories, follower lists, tagged posts,
  private accounts, members-only videos or YouTube Studio analytics.
- **YouTube dislikes are estimates** from the community
  [Return YouTube Dislike](https://returnyoutubedislike.com) database, most accurate on older
  videos. YouTube removed public dislike counts in 2021.
- **YouTube transcripts** are not a feature here. With `includeSubtitles` on, the available
  subtitle languages are listed (best-effort); subtitle text is not reliable.
- **YouTube `duration`** is filled on search rows only for now; channel, playlist and
  video-URL rows leave it empty.
- **Instagram hashtags and keywords** return the curated top posts Instagram shows publicly,
  typically about 60 per term.
- **Instagram creator signals** are public engagement numbers. There are no audience
  demographics or fake-follower scores, and public reel play counts can undercount, so they
  are not a basis for creator payouts.
- Results can include public usernames and comment authors. Handle them under GDPR, PIPEDA
  or CCPA.

## More pinned servers: Canada retail, real estate and jobs

Same model as above: Apify hosts the MCP server, the URL pins it to our Actors, you sign in to
your own Apify account (OAuth) and runs bill per result to that account. Public pages only.

| Server | Actors | Price per result (2026-10-06) |
|---|---|---|
| `yugenox-canada-grocery` | [Loblaws Grocery](https://apify.com/yugenox/loblaws-grocery-scraper) (12 Loblaw banners, priced per store by postal code), [Instacart](https://apify.com/yugenox/instacart-grocery-scraper) (any store on Instacart at a Canadian postal code or US ZIP), [Costco](https://apify.com/yugenox/costco-scraper) (Costco.ca and Costco.com, deals and warehouse stock), [Flipp](https://apify.com/yugenox/flipp-flyer-deals-scraper) (weekly flyer deals by postal code) | $0.00069 to $0.002 |
| `yugenox-canada-store-stock` | [Canadian Tire](https://apify.com/yugenox/canadian-tire-scraper), [Home Depot Canada](https://apify.com/yugenox/home-depot-canada-scraper), [Home Hardware](https://apify.com/yugenox/home-hardware-canada-scraper), [Princess Auto](https://apify.com/yugenox/princess-auto-scraper), [Best Buy Canada](https://apify.com/yugenox/bestbuy-canada-scraper), [LCBO](https://apify.com/yugenox/lcbo-products-scraper) and [SAQ](https://apify.com/yugenox/saq-scraper) with stock at each store; [Shoppers Drug Mart](https://apify.com/yugenox/shoppers-drug-mart-scraper) with online stock and PC Optimum offers | $0.001 to $0.002 |
| `yugenox-realtor-ca` | [Realtor.ca Property](https://apify.com/yugenox/realtor-ca-property-scraper) (active listings for sale or rent, with the listing agent), [Realtor.ca Agent](https://apify.com/yugenox/realtor-ca-agent-scraper) (the agent directory by city or neighbourhood), [Kijiji](https://apify.com/yugenox/kijiji-scraper) (classifieds, cars and rentals, new-listing alerts) | $0.0008 to $0.001 |
| `yugenox-ats-jobs` | [Workday Jobs](https://apify.com/yugenox/workday-jobs-scraper) (any company on Workday, by name), [ATS Jobs Search](https://apify.com/yugenox/ats-jobs-search) (search 12,000+ Greenhouse, Lever and Ashby boards at once), [ATS Jobs Scraper](https://apify.com/yugenox/ats-jobs-scraper) (12 ATSs including Lever, Greenhouse, Ashby, Workday, BambooHR and Jobvite, by company name), [iCIMS Jobs](https://apify.com/yugenox/icims-careers-scraper) | $0.0015 to $0.002 |

Prices are the main per-row Store list prices on 2026-10-06. Other row types (store stock rows,
warehouses) and optional add-ons (product, listing or job details, live stock checks) are priced
separately, and several of these Actors also charge a start fee per run, billed per GB of run
memory (at most $0.005 per GB, including the changes scheduled for 2026-10-11). The Actor pages are the source of truth, and
`fetch-actor-details` lets the agent read the price in force before it starts a run.

### yugenox-canada-grocery

```bash
claude mcp add --transport http yugenox-canada-grocery "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/loblaws-grocery-scraper,yugenox/instacart-grocery-scraper,yugenox/costco-scraper,yugenox/flipp-flyer-deals-scraper"
```

[Cursor](https://cursor.com/en/install-mcp?name=yugenox-canada-grocery&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC9sb2JsYXdzLWdyb2Nlcnktc2NyYXBlcix5dWdlbm94L2luc3RhY2FydC1ncm9jZXJ5LXNjcmFwZXIseXVnZW5veC9jb3N0Y28tc2NyYXBlcix5dWdlbm94L2ZsaXBwLWZseWVyLWRlYWxzLXNjcmFwZXIifQ%3D%3D) · [VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-canada-grocery&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Floblaws-grocery-scraper%2Cyugenox%2Finstacart-grocery-scraper%2Cyugenox%2Fcostco-scraper%2Cyugenox%2Fflipp-flyer-deals-scraper%22%7D) · [VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-canada-grocery&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Floblaws-grocery-scraper%2Cyugenox%2Finstacart-grocery-scraper%2Cyugenox%2Fcostco-scraper%2Cyugenox%2Fflipp-flyer-deals-scraper%22%7D&quality=insiders)

- "Price 2 L milk, a dozen eggs and chicken breast at the three No Frills and three Loblaws stores nearest M5V 2T6, with PC Optimum member prices."
- "This week's flyer deals on chicken near K1P 1J1, with the price per kg."
- "Costco.ca coffee on sale right now, with the date each deal ends."

### yugenox-canada-store-stock

```bash
claude mcp add --transport http yugenox-canada-store-stock "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/canadian-tire-scraper,yugenox/home-depot-canada-scraper,yugenox/home-hardware-canada-scraper,yugenox/princess-auto-scraper,yugenox/bestbuy-canada-scraper,yugenox/shoppers-drug-mart-scraper,yugenox/lcbo-products-scraper,yugenox/saq-scraper"
```

[Cursor](https://cursor.com/en/install-mcp?name=yugenox-canada-store-stock&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC9jYW5hZGlhbi10aXJlLXNjcmFwZXIseXVnZW5veC9ob21lLWRlcG90LWNhbmFkYS1zY3JhcGVyLHl1Z2Vub3gvaG9tZS1oYXJkd2FyZS1jYW5hZGEtc2NyYXBlcix5dWdlbm94L3ByaW5jZXNzLWF1dG8tc2NyYXBlcix5dWdlbm94L2Jlc3RidXktY2FuYWRhLXNjcmFwZXIseXVnZW5veC9zaG9wcGVycy1kcnVnLW1hcnQtc2NyYXBlcix5dWdlbm94L2xjYm8tcHJvZHVjdHMtc2NyYXBlcix5dWdlbm94L3NhcS1zY3JhcGVyIn0%3D) · [VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-canada-store-stock&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Fcanadian-tire-scraper%2Cyugenox%2Fhome-depot-canada-scraper%2Cyugenox%2Fhome-hardware-canada-scraper%2Cyugenox%2Fprincess-auto-scraper%2Cyugenox%2Fbestbuy-canada-scraper%2Cyugenox%2Fshoppers-drug-mart-scraper%2Cyugenox%2Flcbo-products-scraper%2Cyugenox%2Fsaq-scraper%22%7D) · [VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-canada-store-stock&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Fcanadian-tire-scraper%2Cyugenox%2Fhome-depot-canada-scraper%2Cyugenox%2Fhome-hardware-canada-scraper%2Cyugenox%2Fprincess-auto-scraper%2Cyugenox%2Fbestbuy-canada-scraper%2Cyugenox%2Fshoppers-drug-mart-scraper%2Cyugenox%2Flcbo-products-scraper%2Cyugenox%2Fsaq-scraper%22%7D&quality=insiders)

- "Which of the 5 Home Depot stores nearest Ottawa have a DeWalt 20V drill in stock, and in which aisle?"
- "Clearance items in stock at Princess Auto Mississauga, biggest discount first."
- "How many units of this LCBO product does each store have on hand?"

### yugenox-realtor-ca

```bash
claude mcp add --transport http yugenox-realtor-ca "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/realtor-ca-property-scraper,yugenox/realtor-ca-agent-scraper,yugenox/kijiji-scraper"
```

[Cursor](https://cursor.com/en/install-mcp?name=yugenox-realtor-ca&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC9yZWFsdG9yLWNhLXByb3BlcnR5LXNjcmFwZXIseXVnZW5veC9yZWFsdG9yLWNhLWFnZW50LXNjcmFwZXIseXVnZW5veC9raWppamktc2NyYXBlciJ9) · [VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-realtor-ca&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Frealtor-ca-property-scraper%2Cyugenox%2Frealtor-ca-agent-scraper%2Cyugenox%2Fkijiji-scraper%22%7D) · [VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-realtor-ca&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Frealtor-ca-property-scraper%2Cyugenox%2Frealtor-ca-agent-scraper%2Cyugenox%2Fkijiji-scraper%22%7D&quality=insiders)

- "Realtor.ca rental listings in Vancouver: the 2-bedroom ones sorted by price, with the listing brokerage."
- "Which brokerages have the most agents listed in North York on Realtor.ca?"
- "Honda Civics for sale on Kijiji in Calgary under $15,000, with year and kilometres."

### yugenox-ats-jobs

```bash
claude mcp add --transport http yugenox-ats-jobs "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/workday-jobs-scraper,yugenox/ats-jobs-search,yugenox/ats-jobs-scraper,yugenox/icims-careers-scraper"
```

[Cursor](https://cursor.com/en/install-mcp?name=yugenox-ats-jobs&config=eyJ1cmwiOiJodHRwczovL21jcC5hcGlmeS5jb20vP3Rvb2xzPWZldGNoLWFjdG9yLWRldGFpbHMseXVnZW5veC93b3JrZGF5LWpvYnMtc2NyYXBlcix5dWdlbm94L2F0cy1qb2JzLXNlYXJjaCx5dWdlbm94L2F0cy1qb2JzLXNjcmFwZXIseXVnZW5veC9pY2ltcy1jYXJlZXJzLXNjcmFwZXIifQ%3D%3D) · [VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-ats-jobs&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Fworkday-jobs-scraper%2Cyugenox%2Fats-jobs-search%2Cyugenox%2Fats-jobs-scraper%2Cyugenox%2Ficims-careers-scraper%22%7D) · [VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=yugenox-ats-jobs&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.apify.com%2F%3Ftools%3Dfetch-actor-details%2Cyugenox%2Fworkday-jobs-scraper%2Cyugenox%2Fats-jobs-search%2Cyugenox%2Fats-jobs-scraper%2Cyugenox%2Ficims-careers-scraper%22%7D&quality=insiders)

- "Remote backend engineer jobs at Stripe, Airbnb and Notion, with salary ranges where posted."
- "Engineering roles on NVIDIA's Workday career site posted in the last 7 days."
- "Nursing jobs in Texas posted this week, across the largest iCIMS employers."

**Limits for these servers.** Public pages only: no logins, and Realtor.ca coverage is active
listings (no sold history). Prices and stock are what each retailer shows for the chosen store or
postal code at run time. A Realtor.ca search area returns up to about 600 listings (search several
smaller areas for more), and the agent search does not take postal codes. Instacart and Home Depot
Canada work best on Apify residential proxies; on a plan without them they fall back to datacenter
IPs, which is slower and may miss some results. Salaries appear only where the employer publishes
them. Realtor.ca rows include agent names and phone numbers, Kijiji listing text can include
personal details, and Home Depot product details include reviewers' display names: handle them
under PIPEDA, GDPR or CCPA.

Not affiliated with or endorsed by any retailer named here, Instacart, Flipp, CREA or
REALTOR.ca, Kijiji, the applicant tracking systems named, or the employers and brands in the
example prompts.

## MCP Registry

Listed in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=yugenox)
under the `io.github.ArpitGandhi1934/` namespace:

| Registry name | Pinned server |
|---|---|
| `yugenox-social-data` | `yugenox-social` |
| `yugenox-youtube-scraper` | `yugenox-youtube` |
| `yugenox-instagram-scraper` | `yugenox-instagram` |
| `yugenox-canada-grocery-prices` | `yugenox-canada-grocery` |
| `yugenox-canada-retail-store-stock` | `yugenox-canada-store-stock` |
| `yugenox-realtor-ca-real-estate` | `yugenox-realtor-ca` |
| `yugenox-ats-jobs-salaries` | `yugenox-ats-jobs` |

The entries live in [`registry/`](registry/) and are published by GitHub Actions on each
version tag.

## About

Built by Yugenox Corporation, Toronto. Questions or a bug: open an issue here or on the
Actor's Issues tab on Apify. Uses public data only. Not affiliated with or endorsed by
YouTube, Google, Instagram, Meta, OpenAI or Anthropic.

MIT licensed (this repo's configs and examples). The Actors are paid services on Apify.
