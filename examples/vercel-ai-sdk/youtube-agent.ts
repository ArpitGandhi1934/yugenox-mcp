// REGENERATE AFTER UPGRADE: tool names and input fields match the Apify MCP server
// (apify-mcp-server 0.16.0) and yugenox/youtube-scraper as of 2026-09-26.
//
// Vercel AI SDK (ai v7 + @ai-sdk/mcp): YouTube outlier finder over the pinned MCP URL.
//
//   npm install
//   export APIFY_TOKEN=...      # your own Apify token, sent as a header (never in the URL)
//   export OPENAI_API_KEY=...
//   npm run vercel-ai           # Node >= 22.18 runs .ts files directly
//
// Cost: $2.00 per 1,000 video rows (Store price on 2026-09-26). 20 videos is about $0.04.
import { createMCPClient } from '@ai-sdk/mcp';
import { openai } from '@ai-sdk/openai';
import { generateText, isStepCount } from 'ai';

const MCP_URL = 'https://mcp.apify.com/?tools=fetch-actor-details,yugenox/youtube-scraper';

const token = process.env.APIFY_TOKEN;
if (!token) throw new Error('Set APIFY_TOKEN to your own Apify API token.');

const mcp = await createMCPClient({
  transport: { type: 'http', url: MCP_URL, headers: { Authorization: `Bearer ${token}` } },
});

try {
  const { text } = await generateText({
    model: openai(process.env.MODEL ?? 'gpt-5-mini'),
    tools: await mcp.tools(),
    stopWhen: isStepCount(6),
    system:
      'You analyse public YouTube data. State the estimated cost (videos x $0.002) before calling ' +
      'yugenox--youtube-scraper and always set maxItems. Dislikes are Return YouTube Dislike ' +
      'estimates (returnyoutubedislike.com).',
    prompt:
      'Get the 20 latest videos from @mkbhd with views, likes and estimated dislikes. ' +
      'List the ones above 2x the median views and the like-to-dislike ratio of each.',
  });
  console.log(text);
} finally {
  await mcp.close();
}
