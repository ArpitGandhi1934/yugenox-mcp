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
  minute of speech, so a 30-second reel with its transcript is about **$0.0059**. Reels set
  to a licensed song have no speech and are not charged for a transcript.
- On Instagram, rows removed by your filters, sources that return nothing and private
  accounts cost nothing.

Good habit for agents: set `maxItems` on every call and say the estimate before running.
The plugin skills and example prompts do this.

## Example prompts

YouTube:

- "Pull the last 50 videos from @mkbhd and flag the ones above 2x the channel's median views."
- "Top 30 videos about 'home espresso' uploaded this month, sorted by views, with 10 top comments each. What do viewers complain about?"
- "Like-to-dislike ratio for these 40 video URLs." (Dislikes are estimates, see below.)
- "Audit @somecreator before we sponsor them: average views over the last 30 uploads and the sponsor and social links in their descriptions."

Instagram:

- "Transcribe the last 20 reels from @hubermanlab and group the opening lines into hook types."
- "Every post @glossier published in the last 30 days with likes, comments and plays."
- "Vet @somecreator: engagement rate over the last 30 posts, paid-partnership posts, and 20 similar accounts with a contact in their bio."
- "Reels using this sound: https://www.instagram.com/reels/audio/271328201351336/"

## Honest limits

- **Public data only.** Nothing behind a sign-in: no stories, follower lists, tagged posts,
  private accounts, members-only videos or YouTube Studio analytics.
- **YouTube dislikes are estimates** from the community
  [Return YouTube Dislike](https://returnyoutubedislike.com) database, most accurate on older
  videos. YouTube removed public dislike counts in 2021.
- **YouTube transcripts** are not a feature here; subtitle languages are listed, subtitle
  text is best-effort.
- **Instagram hashtags and keywords** return the curated top posts Instagram shows publicly,
  typically about 60 per term.
- **Instagram creator signals** are public engagement numbers. There are no audience
  demographics or fake-follower scores, and public reel play counts can undercount, so they
  are not a basis for creator payouts.
- Results can include public usernames and comment authors. Handle them under GDPR, PIPEDA
  or CCPA.

## MCP Registry

Listed in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=yugenox)
as `io.github.ArpitGandhi1934/yugenox-social-data`, `io.github.ArpitGandhi1934/yugenox-youtube-scraper`
and `io.github.ArpitGandhi1934/yugenox-instagram-scraper`. The entries live in
[`registry/`](registry/) and are published by GitHub Actions on each version tag.

## About

Built by Yugenox Corporation, Toronto. Questions or a bug: open an issue here or on the
Actor's Issues tab on Apify. Not affiliated with YouTube, Instagram, Meta, Google, OpenAI or
Anthropic.

MIT licensed (this repo's configs and examples). The Actors are paid services on Apify.
