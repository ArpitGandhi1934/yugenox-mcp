#!/usr/bin/env node
// Pre-publish gate for every Actor pinned in scripts/servers.mjs. No token: public Apify API GETs only.
// Usage: node scripts/check-actors.mjs
//
// For each pinned Actor it checks what the Apify MCP server needs to build the Actor's tool, and what a
// registry visitor would trip over:
//   - the Actor is public and not deprecated, and its notice is NONE (no "under maintenance" badge)
//   - the default build exists, SUCCEEDED, and carries an input schema (the tool's argument schema)
// and prints the in-force primary price (latest pricingInfos entry with startedAt <= now) plus any
// scheduled price change, so README prices can be re-dated.
//
// This does not replace scripts/check-tools.mjs (tools/list over MCP, needs APIFY_TOKEN). It is the part
// of the check that anyone can run without credentials. It starts no runs and writes nothing.
import { SERVERS } from './servers.mjs';

const API = 'https://api.apify.com/v2';
const now = new Date().toISOString();

async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) return { error: `HTTP ${res.status}` };
  return (await res.json()).data;
}

function primaryPrice(info) {
  if (!info) return 'no pricing';
  if (info.pricingModel !== 'PAY_PER_EVENT') return info.pricingModel;
  const events = Object.entries(info.pricingPerEvent?.actorChargeEvents ?? {});
  const [key, ev] = events.find(([, e]) => e.isPrimaryEvent) ?? events.find(([k]) => k !== 'apify-actor-start') ?? [];
  if (!ev) return 'PPE (no events)';
  const tiers = ev.eventTieredPricingUsd;
  const unit = ev.eventPriceUsd ?? (tiers ? `${tiers.FREE?.tieredEventPriceUsd} on Free, tiered` : '?');
  const start = info.pricingPerEvent.actorChargeEvents['apify-actor-start']?.eventPriceUsd;
  return `${key} $${unit}` + (start ? ` + start $${start}` : '');
}

const actors = [...new Set(SERVERS.flatMap((s) => s.actors))];
let failed = 0;
for (const actor of actors) {
  const act = await get(`/acts/${actor.replace('/', '~')}`);
  const problems = [];
  if (act.error) {
    problems.push(`actor ${act.error} (not public or renamed)`);
  } else {
    if (!act.isPublic) problems.push('not public');
    if (act.isDeprecated) problems.push('deprecated');
    if ((act.notice ?? 'NONE') !== 'NONE') problems.push(`notice ${act.notice}`);
    const build = await get(`/acts/${act.id}/builds/default`);
    if (build.error) problems.push(`default build ${build.error}`);
    else {
      if (build.status !== 'SUCCEEDED') problems.push(`default build ${build.status}`);
      if (!build.inputSchema && !build.actorDefinition?.input) problems.push('no input schema');
    }
  }
  const infos = (act.pricingInfos ?? []).slice().sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const inForce = infos.filter((p) => p.startedAt <= now).at(-1);
  const next = infos.find((p) => p.startedAt > now);
  const price = act.error ? '' : `  ${primaryPrice(inForce)}` + (next ? `  (changes ${next.startedAt.slice(0, 10)}: ${primaryPrice(next)})` : '');
  if (problems.length) failed++;
  console.log(`${problems.length ? 'FAIL' : 'ok  '}  ${actor}${price}${problems.length ? `  -> ${problems.join('; ')}` : ''}`);
}
console.log(`\n${actors.length - failed}/${actors.length} pinned Actors pass (${now})`);
process.exit(failed ? 1 : 0);
