// REGENERATE AFTER UPGRADE: tool names and input fields match the Apify MCP server
// (apify-mcp-server 0.16.0) and yugenox/instagram-scraper as of 2026-09-26.
//
// Claude Agent SDK: Instagram Reels-to-text over the pinned MCP URL.
//
//   npm install
//   export APIFY_TOKEN=...          # your own Apify token, sent as a header (never in the URL)
//   export ANTHROPIC_API_KEY=...    # or any auth the Agent SDK supports
//   npm run claude-agent            # Node >= 22.18 runs .ts files directly
//
// Cost: $1.90 per 1,000 rows + $0.004 per started minute of transcribed audio
// (Store price on 2026-09-26). 10 reels of ~30 s with transcripts is about $0.06.
import { query } from '@anthropic-ai/claude-agent-sdk';

const MCP_URL = 'https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) throw new Error('Set APIFY_TOKEN to your own Apify API token.');

for await (const message of query({
  prompt:
    'Scrape the 10 newest reels from https://www.instagram.com/nasa/reels/ with ' +
    'transcripts (maxItems 10, includeTranscript true). Give me each reel URL, its plays and ' +
    'the first spoken sentence, then group the openings into hook types.',
  options: {
    mcpServers: {
      'yugenox-instagram': {
        type: 'http',
        url: MCP_URL,
        headers: { Authorization: `Bearer ${token}` },
        timeout: 300_000, // an Actor run is one synchronous tool call
      },
    },
    tools: [], // no built-in file or shell tools: this agent only needs the MCP server
    allowedTools: [
      'mcp__yugenox-instagram__fetch-actor-details',
      'mcp__yugenox-instagram__yugenox--instagram-scraper',
      'mcp__yugenox-instagram__get-dataset-items',
    ],
    systemPrompt:
      'You analyse public Instagram data. State the estimated cost before running the scraper ' +
      '(rows x $0.0019, plus $0.004 per started minute of transcribed audio) and always set ' +
      'maxItems. Use public signals only; never infer audience demographics.',
    maxTurns: 8,
  },
})) {
  if (message.type === 'result') {
    console.log(message.subtype === 'success' ? message.result : `Run ended: ${message.subtype}`);
  }
}
