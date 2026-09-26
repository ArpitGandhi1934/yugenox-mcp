# Framework examples

Minimal agents that call [yugenox/youtube-scraper](https://apify.com/yugenox/youtube-scraper)
and [yugenox/instagram-scraper](https://apify.com/yugenox/instagram-scraper) on Apify.

Every example reads **your own** Apify token from the environment and sends it as an
`Authorization: Bearer` header. Runs bill to your Apify account. Never put a token in a URL
or commit it. Interactive clients (ChatGPT, Claude, Cursor, VS Code) use OAuth instead; see
the main README.

| Folder | Framework | Needs |
|---|---|---|
| `langgraph/` | LangChain + LangGraph (`ApifyActorsTool`) | `APIFY_API_TOKEN`, an LLM key (`OPENAI_API_KEY` by default, `MODEL` to switch) |
| `crewai/` | CrewAI (`ApifyActorsTool`) | `APIFY_API_TOKEN`, `OPENAI_API_KEY` |
| `llamaindex/` | LlamaIndex (`BasicMCPClient` + `McpToolSpec`) | `APIFY_TOKEN`, `OPENAI_API_KEY` |
| `openai-agents/` | OpenAI Agents SDK (`MCPServerStreamableHttp`) | `APIFY_TOKEN`, `OPENAI_API_KEY` |
| `vercel-ai-sdk/` | Vercel AI SDK v7 (`@ai-sdk/mcp`) | `APIFY_TOKEN`, `OPENAI_API_KEY` |
| `claude-agent-sdk/` | Claude Agent SDK (`mcpServers`, `type: "http"`) | `APIFY_TOKEN`, Anthropic credentials |

LangChain and CrewAI read `APIFY_API_TOKEN` (that is the variable their Apify integration
expects); the MCP examples read `APIFY_TOKEN`. Both hold the same value.

## Run

```bash
# Python
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
python openai-agents/social_agent.py

# TypeScript (Node >= 22.18 runs .ts directly)
npm install
npm run vercel-ai
npm run claude-agent
```

`npm run check` type-checks the TypeScript files and byte-compiles the Python files without
calling any API.

## Cost

Each example asks for 10-20 rows, which costs a few cents (YouTube $0.002 per video row,
Instagram $0.0019 per row plus $0.004 per transcript minute, Store prices on 2026-09-26).
The prompts tell the agent to state the estimate and set `maxItems` before each run.

Input fields match the Actor schemas as of 2026-09-26. If a field is rejected, read the
current schema with `apify actors info yugenox/<actor> --input` or the `fetch-actor-details`
tool.
