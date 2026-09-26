# REGENERATE AFTER UPGRADE: the run_input fields below match yugenox/youtube-scraper's
# input schema as of 2026-09-26. Re-check with `apify actors info yugenox/youtube-scraper --input`.
"""LangChain / LangGraph: YouTube channel audit with yugenox/youtube-scraper.

    pip install -r ../requirements.txt
    export APIFY_API_TOKEN=...   # your own Apify token; runs bill to your account
    export OPENAI_API_KEY=...    # or any provider init_chat_model supports (set MODEL)
    python youtube_langgraph.py

Cost: $2.00 per 1,000 video rows (Store price on 2026-09-26). This prompt asks for 15
videos with 5 top comments each, so about $0.03.
"""

import os

from langchain.chat_models import init_chat_model
from langchain_apify import ApifyActorsTool
from langgraph.prebuilt import create_react_agent

# Reads APIFY_API_TOKEN from the environment and builds the tool's argument schema
# from the Actor's live input schema.
youtube = ApifyActorsTool("yugenox/youtube-scraper")

agent = create_react_agent(
    init_chat_model(os.environ.get("MODEL", "openai:gpt-5-mini")),
    tools=[youtube],
    prompt=(
        "You analyse public YouTube data. Before calling the scraper, state the estimated cost "
        "(videos x $0.002). Always set maxItems (15 or less unless the user asks for more). "
        "Dislike counts are Return YouTube Dislike estimates (returnyoutubedislike.com): say so."
    ),
)

if __name__ == "__main__":
    question = (
        "Pull the 15 most recent videos from @Fireship with 5 top comments each and estimated "
        "dislikes. Which videos beat the median view count by 2x, and what do commenters praise?"
    )
    for step in agent.stream({"messages": [("user", question)]}, stream_mode="values"):
        step["messages"][-1].pretty_print()
