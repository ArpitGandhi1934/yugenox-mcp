# REGENERATE AFTER UPGRADE: the input fields below match yugenox/instagram-scraper's
# input schema as of 2026-09-26. Re-check with `apify actors info yugenox/instagram-scraper --input`.
"""CrewAI: Instagram Reels-to-text research crew with yugenox/instagram-scraper.

    pip install -r ../requirements.txt
    export APIFY_API_TOKEN=...   # your own Apify token; runs bill to your account
    export OPENAI_API_KEY=...    # CrewAI's default LLM provider
    python instagram_crew.py

Cost: $1.90 per 1,000 rows plus $0.004 per started minute of transcribed audio
(Store price on 2026-09-26). 10 reels of ~30 s with transcripts is about $0.06.
"""

from crewai import Agent, Crew, Task
from crewai_tools import ApifyActorsTool

instagram = ApifyActorsTool(actor_name="yugenox/instagram-scraper")

researcher = Agent(
    role="Short-form content researcher",
    goal="Explain which opening hooks a creator uses in their Reels, with evidence.",
    backstory=(
        "You work from public Instagram data only. You always cap maxItems and state the "
        "estimated cost before a run. You never claim audience demographics."
    ),
    tools=[instagram],
    verbose=True,
)

task = Task(
    description=(
        "Scrape the 10 newest Reels from https://www.instagram.com/hubermanlab/reels/ with "
        'run_input {"startUrls": ["https://www.instagram.com/hubermanlab/reels/"], '
        '"maxItems": 10, "includeTranscript": true}. Summarise the first sentence of each '
        "transcript and group them into hook types."
    ),
    expected_output="A table of reel URL, plays, first spoken line, hook type; then 3 takeaways.",
    agent=researcher,
)

if __name__ == "__main__":
    print(Crew(agents=[researcher], tasks=[task]).kickoff())
