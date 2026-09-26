# REGENERATE AFTER UPGRADE: tool names and input fields match the Apify MCP server
# (apify-mcp-server 0.16.0) and both yugenox actors as of 2026-09-26.
"""OpenAI Agents SDK: one agent, both actors, via MCPServerStreamableHttp and the pinned URL.

    pip install -r ../requirements.txt
    export APIFY_TOKEN=...       # your own Apify token, sent as a header (never in the URL)
    export OPENAI_API_KEY=...
    python social_agent.py

Cost (2026-09-26): YouTube $2.00 per 1,000 video rows; Instagram $1.90 per 1,000 rows.
This prompt pulls about 20 rows, so about $0.04.
"""

import asyncio
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

MCP_URL = (
    "https://mcp.apify.com/?tools=fetch-actor-details,"
    "yugenox/instagram-scraper,yugenox/youtube-scraper"
)


async def main() -> None:
    async with MCPServerStreamableHttp(
        name="yugenox-social",
        params={
            "url": MCP_URL,
            "headers": {"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
            "timeout": 60,
        },
        client_session_timeout_seconds=300,  # Actor runs are synchronous tool calls
        cache_tools_list=True,
    ) as server:
        agent = Agent(
            name="Creator analyst",
            instructions=(
                "You analyse public Instagram and YouTube data. Before each scraper call, state "
                "the estimated cost and keep maxItems at 15 or less unless asked. Use public "
                "signals only: never infer audience demographics. YouTube dislikes are Return "
                "YouTube Dislike estimates (returnyoutubedislike.com)."
            ),
            mcp_servers=[server],
        )
        result = await Runner.run(
            agent,
            "Compare @nike on Instagram (last 10 posts) with the Nike YouTube channel (last 10 "
            "videos): average likes, comments and views per post, and which format wins.",
        )
        print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
