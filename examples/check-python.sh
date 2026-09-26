#!/bin/sh
# Syntax-checks every Python example (import-level checks need the packages installed:
# pip install -r requirements.txt, then run each file with --help-free import via python -c).
set -e
cd "$(dirname "$0")"
for f in langgraph/*.py crewai/*.py llamaindex/*.py openai-agents/*.py; do
  python3 -m py_compile "$f" && echo "py_compile ok  $f"
done
