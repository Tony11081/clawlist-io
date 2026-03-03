#!/bin/bash

# Auto-monitor team progress and report to Tony
# Runs every 5 minutes

REPORT_FILE=~/clawd/projects/clawlist/logs/team-progress.log
mkdir -p ~/clawd/projects/clawlist/logs

while true; do
  TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
  echo "[$TIMESTAMP] Team Progress Check" >> $REPORT_FILE
  echo "================================" >> $REPORT_FILE
  
  # Claude
  echo "🧠 Claude:" >> $REPORT_FILE
  tmux capture-pane -t clawlist-claude -p | tail -10 | grep -v "^$" | sed 's/^/  /' >> $REPORT_FILE
  
  # Codex
  echo "🤖 Codex:" >> $REPORT_FILE
  tmux capture-pane -t clawlist-codex -p | tail -10 | grep -v "^$" | sed 's/^/  /' >> $REPORT_FILE
  
  # Gemini
  echo "💎 Gemini:" >> $REPORT_FILE
  tmux capture-pane -t clawlist-gemini -p | tail -10 | grep -v "^$" | sed 's/^/  /' >> $REPORT_FILE
  
  echo "" >> $REPORT_FILE
  
  # Check for completion signals
  if tmux capture-pane -t clawlist-claude -p | grep -q "完成后告诉我"; then
    echo "⚠️  Claude might be waiting for input" >> $REPORT_FILE
  fi
  
  # Sleep 5 minutes
  sleep 300
done
