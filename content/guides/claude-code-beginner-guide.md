# Claude Code for Complete Beginners: Install in 3 Minutes, No Coding Required

*Originally written by [Grace Ruan Su (@graceruansu)](https://x.com/graceruansu/status/2029353676217958638) — translated and adapted with permission.*

![Claude Code Beginner Guide](https://raw.githubusercontent.com/Tony11081/clawlist-images/main/blog/claude-code-beginner-guide/cover.png)

---

Many people subscribe to Claude Pro and use it like this every day: open the website, type a question, read the answer, close the tab. Repeat.

That workflow is fine — but you're leaving most of the value on the table.

Here's the one-sentence difference: **The web version of Claude lives on a server somewhere. Claude Code lives on your computer.** It can read your files, execute commands, and complete real work tasks on your behalf.

And the best part? You don't need any programming background. Everything below requires only the ability to copy and paste. Really.

---

## Before You Install: Two Things You Must Have

Most installation failures trace back to skipping this step.

**1. A stable proxy connection (non-negotiable for users in China)**

Claude Code's servers are in the US. Without a reliable proxy, every subsequent step is futile. You'll need:
- A working proxy that can access [claude.ai](https://claude.ai)
- **US node** recommended
- **Global mode** enabled — not just browser mode

This is why many people can open the Claude website but still get errors during installation. The terminal doesn't automatically use your browser's proxy settings.

**2. An active Claude Pro subscription ($20/month)**

If you're already subscribed, you're ready. No additional payment is needed for Claude Code.

---

## Mac / Linux Installation (3 minutes)

### Step 1: Open Terminal

Press `Command + Space`, search for "Terminal", hit Enter. You'll see a window with a blinking cursor. Don't be intimidated — this is just a text interface.

### Step 2: Paste the install command and hit Enter

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

You'll see a stream of English text scrolling by. That's normal. Wait for it to stop on its own.

### Step 3: Type `claude` and hit Enter

```bash
claude
```

### Step 4: Authorize via browser

Use the arrow keys to select `1. Claude account with subscription`, then hit Enter. Your browser will open — click the black **Authorize** button.

### Step 5: You're in

If you see "Welcome back!" or the Claude interface appears in your terminal, you've successfully installed Claude Code. ✓

---

## Windows Installation (also 3 minutes)

### Step 1: Open PowerShell as Administrator

Press `Win + S`, search for "PowerShell", right-click → **Run as administrator**.

### Step 2: Paste the install command

```powershell
irm https://claude.ai/install.ps1 | iex
```

Wait for the progress bar to complete. Don't close the window.

### Step 3: Type `claude`, hit Enter, authorize in browser

Same as Mac: type `claude`, browser opens, click **Authorize**.

> **Windows heads-up:** If you get a "scripts are disabled" error, run this first to unlock execution, then retry:
> ```powershell
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

---

## Troubleshooting: 90% of Problems Come From These 3 Issues

### 🪤 Issue #1: Progress bar freezes / `ETIMEDOUT` error

**Cause:** The terminal isn't routing through your proxy, even if your browser can access Claude. They're separate.

**Fix for Mac users:**

First, find your proxy port:
```bash
networksetup -getwebproxy "Wi-Fi"
```

Note the port number (e.g., `15236`), then run:
```bash
export https_proxy=http://127.0.0.1:15236 http_proxy=http://127.0.0.1:15236 all_proxy=socks5://127.0.0.1:15236
```

Then retry the install command.

---

### 🪤 Issue #2: `command not found` after installation

**Cause:** The PATH variable hasn't refreshed yet in your current terminal session.

**Fix:** Close the terminal window completely and open a fresh one, then try `claude` again.

---

### 🪤 Issue #3: Browser opens but authorization fails

**Cause:** Usually one of two things — the Claude account isn't Pro, or the network dropped during the redirect.

**Fix:** Confirm you have a Pro subscription, switch your proxy to global mode, close the browser, and retry.

---

### 💡 Universal debugging tip

When you hit any error, copy the red error text and paste it into the [Claude web interface](https://claude.ai) with this message:

> "I'm installing Claude Code and got this error. Help me figure out what's wrong: [paste error here]"

Claude will diagnose it. Yes, you're using Claude to fix Claude. Works every time.

---

## After Installation: How to Launch Claude Code

Claude Code runs inside the terminal. Each time you want to use it:

**1. Open Terminal and navigate to your working folder**

```bash
cd ~/Desktop/MyWork
```

(`cd` = "Change Directory" — just swap in your actual folder path)

**2. Type `claude` to launch**

Once the interface appears, talk to it in plain language. You don't need commands or code — just describe what you want done.

**Try this first command to verify it's working:**

```
Create a folder called "Claude-Projects" on my Desktop, and inside it create a text file called "first-file.txt" with today's date and the message "Claude Code is installed!"
```

Watch as a folder and file appear on your Desktop in real time. That's the difference between Claude-on-a-server and Claude-on-your-computer.

---

## The Most Important Step: Give Claude a Memory

Installing Claude Code without this step means you're working with an amnesiac assistant who forgets everything after each session.

The fix: create a `CLAUDE.md` file in your working directory. This is Claude Code's persistent memory — a document it reads at the start of every session.

```bash
touch ~/Desktop/MyWork/CLAUDE.md
```

Then open it and write things like:
- Who you are and what you're working on
- Your preferred language and communication style
- Recurring tools or workflows you use
- Rules you want it to follow

Claude Code will read this file every time you launch it from that directory. It transforms a forgetful tool into a consistent AI assistant that knows your context.

---

## The Bottom Line

The web version of Claude is a brilliant conversation partner. Claude Code is an AI employee who can actually touch your files and get things done.

Same subscription. Completely different leverage.

If you found this helpful, the original tutorial was written by [Grace Ruan Su](https://x.com/graceruansu) — worth a follow for more practical AI guides.

---

*Related: [Build Your Own AI-Powered Personal Podcast](/guides/ai-personal-podcast-pipeline) · [Hello World: Your First OpenClaw Module](/guides/hello-world-module)*
