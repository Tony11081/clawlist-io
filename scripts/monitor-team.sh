#!/bin/bash

# Monitor tmux sessions and report progress
# Usage: ./monitor-team.sh

echo "📊 ClawList Team Progress Report"
echo "================================"
echo ""

# Claude's progress
echo "🧠 Claude (Auth & User System):"
tmux capture-pane -t clawlist-claude -p | tail -15 | grep -v "^$" | sed 's/^/  /'
echo ""

# Codex's progress
echo "🤖 Codex (Recommendations & Search):"
tmux capture-pane -t clawlist-codex -p | tail -15 | grep -v "^$" | sed 's/^/  /'
echo ""

# Gemini's progress
echo "💎 Gemini (UI/UX Optimization):"
tmux capture-pane -t clawlist-gemini -p | tail -15 | grep -v "^$" | sed 's/^/  /'
echo ""

echo "================================"
echo "Next check in 10 minutes..."
