# yugenox-mcp

Public distribution repo that puts Yugenox's two paid Apify actors inside AI clients
(ChatGPT, Claude, Claude Code, Cursor, VS Code, Windsurf, n8n, agent frameworks) through
**pinned Apify MCP URLs**. There is no server code here: `mcp.apify.com` hosts the MCP
server, and a `?tools=` pin exposes only our actors. Each user signs in to their own Apify
account with OAuth, runs bill to them, and every run pays yugenox per event (PPE).

- **YouTube Scraper**: https://apify.com/yugenox/youtube-scraper (id `feZD4ZsfLqVo4o5Hg`), $2.00 per 1,000 video rows
- **Instagram Scraper**: https://apify.com/yugenox/instagram-scraper (id `JWobb5RZ2tA5WckR1`), $1.90 per 1,000 rows + $0.004 per transcript minute
- Public repo: https://github.com/ArpitGandhi1934/yugenox-mcp
- Owner: Yugenox Corporation. Workstream WS3 of the IG + YT marketing plan
  (`~/projects/apify/marketing/ig-yt/`). Private drafts (Custom GPT, directory forms,
  awesome-skills PRs) live in `~/projects/apify/marketing/ig-yt/ai-distribution/`, not here.

## Pinned URLs (the product)

| Name | URL |
|---|---|
| yugenox-instagram | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper` |
| yugenox-youtube | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/youtube-scraper` |
| yugenox-social | `https://mcp.apify.com/?tools=fetch-actor-details,yugenox/instagram-scraper,yugenox/youtube-scraper` |

Verified 2026-09-26 with `node scripts/check-tools.mjs` (apify-mcp-server 0.16.0). tools/list returns
`yugenox--instagram-scraper` / `yugenox--youtube-scraper` plus the helpers Apify always adds:
`fetch-actor-details`, `get-actor-run`, `get-dataset-items`, `get-key-value-store-record`,
`abort-actor-run`. Unauthenticated discovery is NOT possible: the server answers 401 with
`WWW-Authenticate: Bearer realm="OAuth"`, and OAuth metadata is at
`https://mcp.apify.com/.well-known/oauth-protected-resource` (authorization server
`console-backend.apify.com`, dynamic client registration supported, scope `full_api_access`).

## Stack / layout

No build step. Plain JSON + Markdown, plus small Node (>=20) scripts with zero dependencies.

- `README.md` — the public landing page: 60-second connect per client, cost, example prompts.
- `install-links.json` — single source for every URL/deeplink. **Generated** by
  `node scripts/make-install-links.mjs` from `scripts/servers.mjs`. Never hand-edit.
- `.claude-plugin/marketplace.json` + `plugins/yugenox-social-data/` — Claude Code plugin
  marketplace (`/plugin marketplace add ArpitGandhi1934/yugenox-mcp`). The plugin ships
  `.mcp.json` (pinned URL, OAuth, no headers) and two skills.
- `registry/{instagram,youtube,social}/server.json` — MCP Registry entries, namespace
  `io.github.ArpitGandhi1934/*` (must match the GitHub owner for OIDC). Descriptions ≤100 chars.
- `.github/workflows/publish-mcp-registry.yml` — on tag `v*`: stamps the tag version into
  each server.json, `mcp-publisher login github-oidc`, publishes all three.
- `examples/` — runnable minimal snippets: LangChain/LangGraph, CrewAI, LlamaIndex, OpenAI
  Agents SDK (py), Vercel AI SDK, Claude Agent SDK (ts/js). Users pass their OWN
  `APIFY_TOKEN` via env var, sent as a header. Never a token in a URL or a file.
- `scripts/check-tools.mjs` — tools/list against the three pinned URLs (needs `APIFY_TOKEN`).

## How to run / verify

```bash
node scripts/make-install-links.mjs            # regenerate install-links.json
APIFY_TOKEN=... node scripts/check-tools.mjs   # confirm tool names per pinned URL
claude plugin validate --strict .              # marketplace.json
claude plugin validate --strict plugins/yugenox-social-data
mcp-publisher validate registry/youtube/server.json   # (validates against the live registry)
cd examples && npm install && npm run check    # TS/JS snippets compile; py snippets py_compile
```

## Publish a new registry version

Bump nothing by hand: push a tag. `git tag v1.0.1 && git push origin v1.0.1`. The workflow
writes `1.0.1` into all three server.json files before publishing (the registry rejects a
version that already exists). Verify:
`curl -s 'https://registry.modelcontextprotocol.io/v0/servers?search=yugenox' | jq '.servers[].server.name'`.
If OIDC ever fails: `mcp-publisher login github` (device code, Arpit's browser) then
`mcp-publisher publish registry/<name>/server.json` locally.

## Registry entries (live)

REGISTRY_STATUS_PLACEHOLDER

## Rules / gotchas

- **OAuth only in docs for interactive clients.** Never put a token in a URL, a repo file,
  a deeplink or a GPT config. Code examples read the user's own token from `APIFY_TOKEN`.
- Public data only. No "bypass", "hack", "undetectable" wording; no login/cookie instructions.
- YouTube dislikes are Return YouTube Dislike **estimates**; always link returnyoutubedislike.com.
- Never market YouTube transcripts (subtitle text is best-effort). No Instagram audience
  demographics, fake-follower or payout-grade view verification claims.
- Don't claim "cheapest". Prices are dated (2026-09-26); the Store page is the source of truth.
- Do NOT submit to the ChatGPT app directory or the Anthropic connectors directory
  (see `~/projects/apify/marketing/ig-yt/ai-distribution/DO-NOT-SUBMIT.md`).
- Skills and examples carry **REGENERATE AFTER UPGRADE** notes: input fields match the actor
  schemas as of 2026-09-26; an upgrade workflow is changing both actors. Re-check inputs with
  `apify actors info yugenox/<actor> --input` and re-run `check-tools.mjs` after it ships.
- Commits: author `Arpit Gandhi <42184053+ArpitGandhi1934@users.noreply.github.com>` (GitHub
  noreply, so the personal email never lands in public history). No AI attribution lines.
- Affiliate: no `?fpr=` anywhere yet (no affiliate id). Search for `AFFILIATE` comments when
  one exists.

Cross-project todos: `~/todos/TODO.json`.
