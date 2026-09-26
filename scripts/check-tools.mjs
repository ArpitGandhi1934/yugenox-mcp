#!/usr/bin/env node
// Confirms which tools each pinned URL exposes, via MCP initialize + tools/list.
// Usage: APIFY_TOKEN=<your own token> node scripts/check-tools.mjs
//
// mcp.apify.com has no unauthenticated discovery (401 + WWW-Authenticate: Bearer realm="OAuth"),
// so this needs a token. It is read from the environment and sent as a header, never put in a
// URL. tools/list does not start any actor run, so it costs nothing.
import { SERVERS, mcpUrl, actorToolName } from './servers.mjs';

const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error('Set APIFY_TOKEN (your own Apify token) to run this check.');
  process.exit(2);
}

const PROTOCOL = '2025-06-18';

async function rpc(url, body, sessionId) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      'Mcp-Protocol-Version': PROTOCOL,
      ...(sessionId ? { 'Mcp-Session-Id': sessionId } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok && res.status !== 202) throw new Error(`HTTP ${res.status} from ${url}`);
  const text = await res.text();
  // Streamable HTTP may answer as SSE ("data: {...}") or as plain JSON.
  const payloads = text.includes('data:')
    ? text.split('\n').filter((l) => l.startsWith('data:')).map((l) => JSON.parse(l.slice(5)))
    : text ? [JSON.parse(text)] : [];
  return { sessionId: res.headers.get('mcp-session-id') || sessionId, payload: payloads.find((p) => p.id === body.id) };
}

let failed = false;
for (const s of SERVERS) {
  const url = mcpUrl(s);
  const init = await rpc(url, {
    jsonrpc: '2.0', id: 1, method: 'initialize',
    params: { protocolVersion: PROTOCOL, capabilities: {}, clientInfo: { name: 'yugenox-mcp-check', version: '1.0.0' } },
  });
  await rpc(url, { jsonrpc: '2.0', method: 'notifications/initialized' }, init.sessionId);
  const list = await rpc(url, { jsonrpc: '2.0', id: 2, method: 'tools/list' }, init.sessionId);
  const tools = list.payload?.result?.tools?.map((t) => t.name) ?? [];
  const expected = ['fetch-actor-details', ...s.actors.map(actorToolName)];
  const missing = expected.filter((t) => !tools.includes(t));
  if (missing.length) failed = true;
  console.log(`${s.name}  (${init.payload?.result?.serverInfo?.name} ${init.payload?.result?.serverInfo?.version})`);
  console.log(`  ${url}`);
  console.log(`  tools: ${tools.join(', ')}`);
  console.log(missing.length ? `  MISSING: ${missing.join(', ')}` : '  ok: every pinned tool is present');
}
process.exit(failed ? 1 : 0);
