---
# REGENERATE AFTER UPGRADE: input recipes and field names match yugenox/youtube-scraper as of 2026-09-26.
name: youtube-channel-intel
description: Pull public YouTube video, channel and comment data without a YouTube API key or quota, through the yugenox-social MCP server (Actor yugenox/youtube-scraper, pay per result). Use when the user asks to get every video from a channel with views and likes, audit a creator before a sponsorship, find a competitor's over-performing videos, list the top videos about a topic this week, pull top comments for sentiment, check like-to-dislike ratios in bulk, or scrape a playlist. Returns views, exact likes, estimated dislikes (Return YouTube Dislike), duration, publish date, channel and subscriber count, description, hashtags, description links and top comments in one row per video. Not for transcripts, video downloads or YouTube Studio analytics.
---

# YouTube channel and video intelligence

Turn "how does this channel or topic perform on YouTube" into one table of videos with engagement numbers. State the cost before every run.

The tool is `yugenox--youtube-scraper` on the `yugenox-social` MCP server. The first call opens an Apify sign-in (OAuth); runs bill to the user's own Apify account. Disclosure: Yugenox Corporation publishes both this plugin and the Actor.

## Example prompts

- "Pull the last 50 videos from @mkbhd with views, likes and publish dates, then flag the ones above 2x the channel median."
- "Top 30 videos about 'home espresso' uploaded this month, sorted by views, with 10 top comments each. What do people complain about?"
- "Before we sponsor @somecreator: average views over their last 30 uploads, like rate, estimated dislike ratio and the links in their descriptions."

Out of scope: full spoken transcripts (subtitle text is best-effort; say so and suggest a dedicated transcript tool), downloading videos, private or members-only videos, and Studio analytics such as impressions, CTR or watch time.

## Workflow

1. **Pick the source.** `channels` (channel name, `@handle` or URL), `searchTerms` (like the YouTube search bar) or `startUrls` (video, playlist, channel or search URLs). They can be mixed in one run.
2. **Add only the extras the question needs.** `maxComments` for sentiment (top comments ride inside the video row), `includeDislikes: true` for dislike ratios, `dateFilter` + `sortBy` for trend questions (search terms only), `includeShorts: true` if Shorts matter.
3. **State the cost and cap it.** Always set `maxItems` (videos per search term, channel or playlist). Estimate: videos × $0.002 ($2.00 per 1,000 on 2026-09-26; `fetch-actor-details` returns the current price). Comments and dislikes do not add a charge. Get a go-ahead before the first paid run.
4. **Run, then answer with numbers.** The tool returns the rows. For a large run, page through them with `get-dataset-items` using the run's dataset id. Report the row count, then answer the question (median views, outliers, like rate, comment themes).

## Input recipes

| Goal | Input |
|---|---|
| Whole channel | `{"channels":["@mkbhd"],"maxItems":100}` |
| Creator audit with sentiment | `{"channels":["@mkbhd"],"maxItems":30,"includeDislikes":true,"maxComments":20}` |
| Trending in a niche | `{"searchTerms":["home espresso"],"dateFilter":"month","sortBy":"views","maxItems":50}` |
| Specific videos | `{"startUrls":["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],"includeDislikes":true}` |
| Shorts in a niche | `{"searchTerms":["cat shorts"],"includeShorts":true,"maxItems":30}` |

## Output fields worth knowing

`title`, `url`, `viewCount`, `likes`, `dislikes` (estimate), `duration`, `date`, `publishedAt` (YYYY-MM-DD), `channelName`, `channelUrl`, `numberOfSubscribers`, `text` (description), `hashtags`, `descriptionLinks` (`{url, text}` from the public description: socials, sponsors, contact pages), `commentsCount`, `comments` (author, text, likes, replyCount, publishedTime), `isShort`, `availableSubtitles`.

## Honest limits

- **Dislikes are estimates** from the community [Return YouTube Dislike](https://returnyoutubedislike.com) database, most accurate on older videos. Always call them estimates and credit Return YouTube Dislike.
- `dateFilter` and `sortBy` apply to `searchTerms` only, not to channel or video URLs.
- `publishedAt` is null when YouTube shows a relative date ("3 weeks ago"); fall back to `date`.
- Shorts are off by default; `duration` is not available on Shorts.
- Results include public channel names in comments. The user must handle them under GDPR, PIPEDA or CCPA.
