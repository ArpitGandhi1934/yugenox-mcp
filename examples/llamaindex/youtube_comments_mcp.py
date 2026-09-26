# REGENERATE AFTER UPGRADE: tool names and input fields match the Apify MCP server
# (apify-mcp-server 0.16.0) and yugenox/youtube-scraper as of 2026-09-26.
"""LlamaIndex: agent over the pinned Apify MCP URL (YouTube comments + dislike estimates).

    pip install -r ../requirements.txt
    export APIFY_TOKEN=...       # your own Apify token, sent as a header (never in the URL)
    export OPENAI_API_KEY=...
    python youtube_comments_mcp.py

Cost: $2.00 per 1,000 video rows, comments included in the row (2026-09-26).
"""

import asyncio
import os

from llama_index.core.agent.workflow import FunctionAgent
from llama_index.llms.openai import OpenAI
from llama_index.tools.mcp import BasicMCPClient, McpToolSpec

MCP_URL = "https://mcp.apify.com/?tools=fetch-actor-details,yugenox/youtube-scraper"


async def main() -> None:
    client = BasicMCPClient(
        MCP_URL,
        headers={"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
        timeout=300,  # an Actor run can take a minute or two
    )
    tools = await McpToolSpec(
        client,
        allowed_tools=["fetch-actor-details", "yugenox--youtube-scraper", "get-dataset-items"],
    ).to_tool_list_async()

    agent = FunctionAgent(
        tools=tools,
        llm=OpenAI(model=os.environ.get("MODEL", "gpt-5-mini")),
        system_prompt=(
            "State the estimated cost (videos x $0.002) before running yugenox--youtube-scraper and "
            "always set maxItems. Dislikes are Return YouTube Dislike estimates "
            "(returnyoutubedislike.com)."
        ),
    )
    answer = await agent.run(
        "Search YouTube for 'home espresso' uploaded this month, sorted by views, 10 videos with "
        "10 top comments each and estimated dislikes. What do viewers complain about most?"
    )
    print(answer)


if __name__ == "__main__":
    asyncio.run(main())
