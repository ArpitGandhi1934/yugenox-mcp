// Single source of truth for the three pinned Apify MCP URLs.
// install-links.json and the README tables are generated/checked from this file.
//
// fetch-actor-details is pinned alongside each actor so an agent can read the README and
// the current price before its first paid run. Apify adds get-actor-run, get-dataset-items,
// get-key-value-store-record and abort-actor-run on its own.
//
// AFFILIATE: no ?fpr= parameter anywhere yet (no Apify affiliate id). Store links only.

const BASE = 'https://mcp.apify.com/';

export const SERVERS = [
  {
    key: 'instagram',
    name: 'yugenox-instagram',
    registryName: 'io.github.ArpitGandhi1934/yugenox-instagram-scraper',
    actors: ['yugenox/instagram-scraper'],
    store: 'https://apify.com/yugenox/instagram-scraper',
  },
  {
    key: 'youtube',
    name: 'yugenox-youtube',
    registryName: 'io.github.ArpitGandhi1934/yugenox-youtube-scraper',
    actors: ['yugenox/youtube-scraper'],
    store: 'https://apify.com/yugenox/youtube-scraper',
  },
  {
    key: 'social',
    name: 'yugenox-social',
    registryName: 'io.github.ArpitGandhi1934/yugenox-social-data',
    actors: ['yugenox/instagram-scraper', 'yugenox/youtube-scraper'],
    store: 'https://apify.com/yugenox',
  },
];

export function mcpUrl(server) {
  return `${BASE}?tools=${['fetch-actor-details', ...server.actors].join(',')}`;
}

// Tool names the Apify MCP server exposes for a pinned actor: "owner/name" -> "owner--name".
export function actorToolName(actor) {
  return actor.replace('/', '--');
}
