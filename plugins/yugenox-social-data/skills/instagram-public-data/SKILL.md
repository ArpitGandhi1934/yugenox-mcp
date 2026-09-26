---
# REGENERATE AFTER UPGRADE: input recipes, prices and the free-plan cap match yugenox/instagram-scraper as of 2026-09-26.
name: instagram-public-data
description: Pull public Instagram data with no Instagram account, through the yugenox-social MCP server (Actor yugenox/instagram-scraper, pay per result). Use when the user asks to transcribe a creator's reels, get the last 30 days of posts from a brand, pull top posts for a hashtag or location, find reels using a sound, read the newest comments on posts, vet an influencer on public engagement, find accounts similar to a competitor, or list public business profiles with a contact in the bio. Returns likes, comments, plays, captions, media URLs, owner follower counts, co-authors, paid-partnership flags, music, locations, latest comments, reel transcripts and Instagram's own AI summaries. Not for stories, follower lists, tagged posts, private accounts or audience demographics.
---

# Instagram Reels to text and public creator signals

Turn a request about public Instagram content into one table of posts, profiles or comments. State the cost before every run.

The tool is `yugenox--instagram-scraper` on the `yugenox-social` MCP server. The first call opens an Apify sign-in (OAuth); runs bill to the user's own Apify account. Disclosure: Yugenox Corporation publishes both this plugin and the Actor.

## Example prompts

- "Transcribe the last 20 reels from @nasa and group the opening lines into hook types."
- "Get every post [a brand handle] published in the last 30 days with likes, comments and plays, as a CSV."
- "Vet @somecreator: engagement rate over their last 30 posts, paid-partnership posts, and 20 similar accounts that list a contact in their bio."

Out of scope: stories, highlights content, follower or following lists, tagged posts and private accounts (Instagram shows them only to signed-in accounts, so this tool never returns them). Audience demographics, fake-follower analysis and payout-grade view verification are not available either: this is public engagement data only.

## Workflow

1. **Pick the source** in `startUrls`: profile (`https://www.instagram.com/<handle>/` or just `<handle>`), reels tab (`/<handle>/reels/`), hashtag (`#tag`), location (`/explore/locations/<id>/`), audio (`/reels/audio/<id>/`) or a post URL. Keyword search goes in `keywords`.
2. **Pick the row type** with `resultsType`: `posts` (default), `details` (one row per profile, hashtag or place: bio, followers, category, account type, emails and phones published in the bio, related accounts) or `comments`.
3. **State the cost and cap it.** Always set `maxItems`. Estimate: rows × $0.0019, plus $0.004 per started minute of audio when `includeTranscript` is on. A 30-second reel with its transcript costs about $0.0059. Latest comments, AI summaries and view counts are included in the row price. Get a go-ahead before the first paid run.
4. **Run and deliver.** The tool returns the rows; page a large run with `get-dataset-items`. Report the row count and a short summary; offer CSV or JSON.

## Input recipes

| Goal | Input |
|---|---|
| Reels with transcripts | `{"startUrls":["https://www.instagram.com/nike/reels/"],"includeTranscript":true,"maxItems":20}` |
| Last 30 days from a profile | `{"startUrls":["https://www.instagram.com/nike/"],"until":"30 days","maxItems":100}` |
| Hashtag + latest comments | `{"startUrls":["#travel"],"commentsPerPost":10,"maxItems":60}` |
| Creator vetting row + lookalikes | `{"startUrls":["allbirds"],"resultsType":"details","includeRelatedProfiles":true,"maxItems":1}` |
| Lookalike business profiles with a contact | `{"startUrls":["allbirds"],"resultsType":"details","scrapeRelatedProfiles":30,"businessOnly":true,"withContactOnly":true,"maxItems":30}` |
| Comments on one post | `{"startUrls":["https://www.instagram.com/p/DRvit9Ejgel/"],"resultsType":"comments","maxComments":200}` |

## Output fields worth knowing

Posts: `url`, `createdAt`, `caption`, `likeCount`, `commentCount`, `video.playCount`, `owner.username`, `owner.followerCount`, `engagementRate`, `isPaidPartnership`, `mediaType`, `location`, `audio`, `latestComments`, `transcript`, `transcriptLanguage`, `aiTitle`, `aiSummary`, `source`. Profile rows add bio links, category, account type, `emails` and `phones` found in the bio, and `relatedProfiles`.

## Honest limits

- Hashtags and keywords return Instagram's curated top posts for popular terms, typically about 60. Terms Instagram keeps for signed-in users return nothing and cost nothing. Suggest `expandRelatedKeywords` for more.
- `likeCount` is null when the creator hides like counts; use comments and plays instead.
- Reel play counts shown to logged-out visitors can undercount; treat them as public signals, not audited numbers.
- Reels with no detectable speech (for example, set only to a licensed song) are usually skipped for transcription. Occasionally one comes back with an empty transcript and its minute billed.
- Free Apify plans get a limited number of results per run (10 on 2026-09-26).
- Results include public usernames and bios. The user must handle them under GDPR, PIPEDA or CCPA.
