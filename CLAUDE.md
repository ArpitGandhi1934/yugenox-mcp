# yugenox-mcp

Public distribution repo that puts Yugenox's paid Apify actors inside AI clients
(ChatGPT, Claude, Claude Code, Cursor, VS Code, Windsurf, n8n, agent frameworks) through
**pinned Apify MCP URLs**. There is no server code here: `mcp.apify.com` hosts the MCP
server, and a `?tools=` pin exposes only our actors. Each user signs in to their own Apify
account with OAuth, runs bill to them, and every run pays yugenox per event (PPE).

- **YouTube Scraper**: https://apify.com/yugenox/youtube-scraper (id `feZD4ZsfLqVo4o5Hg`), $2.00 per 1,000 video rows
- **Instagram Scraper**: https://apify.com/yugenox/instagram-scraper (id `JWobb5RZ2tA5WckR1`), $1.90 per 1,000 rows + $0.004 per transcript minute
- **Since v1.1.0 (staged 2026-10-06, growth backlog M1):** four vertical servers, 19 more actors: Canadian
  grocery, Canadian retail store stock, Realtor.ca + Kijiji, ATS jobs. Lists live in
  `scripts/servers.mjs` (header comment states the inclusion rule).
- **Since v1.2.0 (2026-10-08, growth backlog M2):** three single-purpose servers for actors with paying demand:
  instagram-comments-scraper (our #2 actor by customer runs), instagram-reels-transcript, youtube-ai-video-summarizer.
  One registry entry each, so each gets its own directory page (mcprush, Glama… mirror the registry).
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
| yugenox-instagram-comments | instagram-comments-scraper |
| yugenox-reels-transcript | instagram-reels-transcript |
| yugenox-youtube-summarizer | youtube-ai-video-summarizer |
| yugenox-canada-grocery | loblaws-grocery-scraper, instacart-grocery-scraper, costco-scraper, flipp-flyer-deals-scraper (save-on-foods-scraper left out: UNBLOCKER-only) |
| yugenox-canada-store-stock | canadian-tire-scraper, home-depot-canada-scraper, home-hardware-canada-scraper, princess-auto-scraper, bestbuy-canada-scraper, shoppers-drug-mart-scraper, lcbo-products-scraper, saq-scraper |
| yugenox-realtor-ca | realtor-ca-property-scraper, realtor-ca-agent-scraper, kijiji-scraper |
| yugenox-ats-jobs | workday-jobs-scraper, ats-jobs-search, ats-jobs-scraper, icims-careers-scraper |

Vertical rows list the Apify actor names (each is `yugenox/<name>`); the full URLs are `https://mcp.apify.com/?tools=fetch-actor-details,`
+ those names, generated into `install-links.json`. Verified 2026-10-06 with `check-tools.mjs`
(apify-mcp-server 0.17.2): all 7 pinned URLs list every pinned tool; `check-actors.mjs` passed 21/21.
Re-verified 2026-10-08 (apify-mcp-server 0.17.3): all 10 URLs list every pinned tool; `check-actors.mjs` 24/24.

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
  `.mcp.json` (pinned URL, OAuth, no headers) and two skills. The same folder is also a portable
  Agent Plugin (agent-plugins.org 1.0): `plugin.json` + `mcp.json` (type `streamable-http`), validated
  against the published schemas. Keep `.mcp.json` and `mcp.json` pointing at the same URL.
- `glama.json` — Glama ownership claim (maintainer ArpitGandhi1934).
- `registry/{instagram,youtube,social,instagram-comments,instagram-reels-transcript,youtube-summarizer,canada-grocery,canada-stock,canada-real-estate,ats-jobs}/server.json` — MCP Registry entries, namespace
  `io.github.ArpitGandhi1934/*` (must match the GitHub owner for OIDC). Descriptions ≤100 chars.
- `.github/workflows/publish-mcp-registry.yml` — on tag `v*`: stamps the tag version into
  every `registry/*/server.json` (glob since v1.1.0), `mcp-publisher login github-oidc`, publishes them all.
- `examples/` — runnable minimal snippets: LangChain/LangGraph, CrewAI, LlamaIndex, OpenAI
  Agents SDK (py), Vercel AI SDK, Claude Agent SDK (ts/js). Users pass their OWN
  `APIFY_TOKEN` via env var, sent as a header. Never a token in a URL or a file.
- `scripts/check-tools.mjs` — tools/list against every pinned URL (needs `APIFY_TOKEN`; starts no runs).
- `scripts/check-actors.mjs` — no-token pre-publish gate: every pinned actor public, notice NONE, default build
  SUCCEEDED with an input schema; prints the in-force price and any scheduled change.

## How to run / verify

```bash
node scripts/make-install-links.mjs            # regenerate install-links.json
node scripts/check-actors.mjs                  # no token: pinned actors public, no notice, built
APIFY_TOKEN=... node scripts/check-tools.mjs   # confirm tool names per pinned URL
claude plugin validate --strict .              # marketplace.json
claude plugin validate --strict plugins/yugenox-social-data
mcp-publisher validate registry/youtube/server.json   # (validates against the live registry)
cd examples && npm install && npm run check    # TS/JS snippets compile; py snippets py_compile
```

## Publish a new registry version

Bump nothing by hand: push a tag. `git tag v1.1.1 && git push origin v1.1.1`. The workflow
writes `1.1.1` into every server.json file before publishing (the registry rejects a
version that already exists). Verify:
`curl -s 'https://registry.modelcontextprotocol.io/v0/servers?search=yugenox' | jq '.servers[].server.name'`.
If OIDC ever fails: `mcp-publisher login github` (device code, Arpit's browser) then
`mcp-publisher publish registry/<name>/server.json` locally.

## Registry entries (live)

History: v1.0.0 published 2026-09-26 13:07 UTC (Actions run 36244107188: instagram, youtube, social).
v1.1.0 published 2026-10-06 04:32 UTC (all 7: the 3 above + the 4 verticals). v1.2.0 published 2026-10-08 04:13 UTC
(Actions run 37726467194: all 10, adding instagram-comments, instagram-reels-transcript, youtube-ai-summarizer).
The search endpoint can show a stale `isLatest`; the per-name `/versions/latest` URL is authoritative. Every tag republishes every
entry at the tag's version. Entry URL pattern:
`https://registry.modelcontextprotocol.io/v0/servers/io.github.ArpitGandhi1934%2F<name>/versions/latest`.

| Name | Latest | Folder |
|---|---|---|
| io.github.ArpitGandhi1934/yugenox-instagram-scraper | 1.2.0 | registry/instagram |
| io.github.ArpitGandhi1934/yugenox-youtube-scraper | 1.2.0 | registry/youtube |
| io.github.ArpitGandhi1934/yugenox-social-data | 1.2.0 | registry/social |
| io.github.ArpitGandhi1934/yugenox-canada-grocery-prices | 1.2.0 | registry/canada-grocery |
| io.github.ArpitGandhi1934/yugenox-canada-retail-store-stock | 1.2.0 | registry/canada-stock |
| io.github.ArpitGandhi1934/yugenox-realtor-ca-real-estate | 1.2.0 | registry/canada-real-estate |
| io.github.ArpitGandhi1934/yugenox-ats-jobs-salaries | 1.2.0 | registry/ats-jobs |
| io.github.ArpitGandhi1934/yugenox-instagram-comments | 1.2.0 | registry/instagram-comments |
| io.github.ArpitGandhi1934/yugenox-instagram-reels-transcript | 1.2.0 | registry/instagram-reels-transcript |
| io.github.ArpitGandhi1934/yugenox-youtube-ai-summarizer | 1.2.0 | registry/youtube-summarizer |

Third-party directories mirror the registry on their own: mcprush.com listed all 7 v1.1.0 entries by
2026-10-07 and emailed Arpit to claim them (claiming = his account).

Search: https://registry.modelcontextprotocol.io/v0/servers?search=yugenox (registry search matches the
server name only, which is why every name contains "yugenox"). Downstream directories that mirror the
registry (PulseMCP, Glama and others) pick these up on their own schedule.


## Rules / gotchas

- **OAuth only in docs for interactive clients.** Never put a token in a URL, a repo file,
  a deeplink or a GPT config. Code examples read the user's own token from `APIFY_TOKEN`.
- Public data only. No "bypass", "hack", "undetectable" wording; no login/cookie instructions.
- YouTube dislikes are Return YouTube Dislike **estimates**; always link returnyoutubedislike.com.
- Never market YouTube transcripts (subtitle text is best-effort). No Instagram audience
  demographics, fake-follower or payout-grade view verification claims.
- Don't claim "cheapest". Prices are dated (IG/YT 2026-09-26, verticals 2026-10-06); the Store page is the
  source of truth. Example prompts name no banks.
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
