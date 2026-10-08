// Single source of truth for the pinned Apify MCP URLs (6 social + 4 Canada/jobs verticals).
// install-links.json and the README tables are generated/checked from this file.
//
// fetch-actor-details is pinned alongside each actor so an agent can read the README and
// the current price before its first paid run. Apify adds get-actor-run, get-dataset-items,
// get-key-value-store-record and abort-actor-run on its own.
//
// Vertical lists (2026-10-06): an actor is pinned only if it returns rows on an ordinary Apify
// plan, without a special proxy group on the caller's account. That is why save-on-foods-scraper
// (needs Apify's UNBLOCKER group) is not in the grocery server. Run scripts/check-actors.mjs before
// every tag: each pinned actor must be public, have no notice and a built default version.
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
  // Single-purpose Instagram/YouTube actors with paying demand (growth backlog M2, 2026-10-08):
  // comments is our #2 actor by customer runs; reel transcripts and the YouTube summarizer had paying bursts.
  {
    key: 'instagram-comments',
    name: 'yugenox-instagram-comments',
    registryName: 'io.github.ArpitGandhi1934/yugenox-instagram-comments',
    actors: ['yugenox/instagram-comments-scraper'],
    store: 'https://apify.com/yugenox/instagram-comments-scraper',
  },
  {
    key: 'instagram-reels-transcript',
    name: 'yugenox-reels-transcript',
    registryName: 'io.github.ArpitGandhi1934/yugenox-instagram-reels-transcript',
    actors: ['yugenox/instagram-reels-transcript'],
    store: 'https://apify.com/yugenox/instagram-reels-transcript',
  },
  {
    key: 'youtube-summarizer',
    name: 'yugenox-youtube-summarizer',
    registryName: 'io.github.ArpitGandhi1934/yugenox-youtube-ai-summarizer',
    actors: ['yugenox/youtube-ai-video-summarizer'],
    store: 'https://apify.com/yugenox/youtube-ai-video-summarizer',
  },
  {
    key: 'canada-grocery',
    name: 'yugenox-canada-grocery',
    registryName: 'io.github.ArpitGandhi1934/yugenox-canada-grocery-prices',
    actors: [
      'yugenox/loblaws-grocery-scraper',
      'yugenox/instacart-grocery-scraper',
      'yugenox/costco-scraper',
      'yugenox/flipp-flyer-deals-scraper',
    ],
    store: 'https://apify.com/yugenox',
  },
  {
    key: 'canada-stock',
    name: 'yugenox-canada-store-stock',
    registryName: 'io.github.ArpitGandhi1934/yugenox-canada-retail-store-stock',
    actors: [
      'yugenox/canadian-tire-scraper',
      'yugenox/home-depot-canada-scraper',
      'yugenox/home-hardware-canada-scraper',
      'yugenox/princess-auto-scraper',
      'yugenox/bestbuy-canada-scraper',
      'yugenox/shoppers-drug-mart-scraper',
      'yugenox/lcbo-products-scraper',
      'yugenox/saq-scraper',
    ],
    store: 'https://apify.com/yugenox',
  },
  {
    key: 'canada-real-estate',
    name: 'yugenox-realtor-ca',
    registryName: 'io.github.ArpitGandhi1934/yugenox-realtor-ca-real-estate',
    actors: [
      'yugenox/realtor-ca-property-scraper',
      'yugenox/realtor-ca-agent-scraper',
      'yugenox/kijiji-scraper',
    ],
    store: 'https://apify.com/yugenox/realtor-ca-property-scraper',
  },
  {
    key: 'ats-jobs',
    name: 'yugenox-ats-jobs',
    registryName: 'io.github.ArpitGandhi1934/yugenox-ats-jobs-salaries',
    actors: [
      'yugenox/workday-jobs-scraper',
      'yugenox/ats-jobs-search',
      'yugenox/ats-jobs-scraper',
      'yugenox/icims-careers-scraper',
    ],
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
