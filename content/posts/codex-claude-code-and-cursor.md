---
title: "Codex, Claude Code, and Cursor"
description: "I tried all three AI coding tools in one week. By Saturday I had cancelled two subscriptions and maxed out the third."
date: "2026-03-04"
category: "work"
tags: ["ai", "claude-code", "cursor", "codex", "engineering", "tooling"]
slug: "codex-claude-code-and-cursor"
status: "published"
---

Quick note: I wrote this before the whole OpenAI-Pentagon thing blew up. Anthropic getting blacklisted for refusing to allow mass surveillance, OpenAI swooping in hours later with their own deal, the QuitGPT movement, all of it. This was written purely from a tooling perspective. I had already uninstalled ChatGPT and Cursor and paid up for Claude Code weeks before any of that happened. Make of that what you will.

## How It Happened

I had ChatGPT Plus and Cursor Pro and was using both as tools for my software agency. Had been for months. Then one week happened:

**Wednesday:** Finally try Claude Code at work. It nearly one-shots hosting a Dash webapp inside a custom internal component library React front-end and sets up a reverse proxy to allow React components to interact with the Python webapp in the iframe.

**Thursday:** Realize my stack needs looking at. Try out Codex because it came with my ChatGPT Plus subscription.

**Friday:** Install Claude Code at 7pm. By 9pm, I upgrade to Claude Code Pro.

**Saturday:** Cancel Cursor. Cancel ChatGPT. Upgrade to Claude Code Max.

The result of me trying Codex was pulling my wallet out and giving more money to Claude Code. It failed not just as AI codegen, but as a functioning piece of software. Codex might be Claude Code's greatest marketing asset.

## Three Different Philosophies

Codex, Cursor, and Claude Code all have different UI/UX philosophies.

For the longest time, I thought Cursor had it figured out. Integrated into an IDE, meet developers where they already are, layer intelligence on top of the existing workflow. Compelling pitch. Worked for me for a while.

Claude Code flipped that. It's a CLI tool. No GUI. No syntax highlighting panel. No inline suggestions. Just a terminal. And for bootstrappers who know how to design systems, people who think in architectures and not individual files, it kind of deprecates the entire idea of an IDE. You describe what you want built and it builds it. The abstraction level is just higher.

## The Gap in Practice

So I whipped out my wallet and paid for Claude Code. And man, night and day.

Cursor would choke on frontend engineering in ways that cost me real time. Not updating state for auth, not accounting for race conditions, occasionally using the wrong API key or not even realizing an ngrok server wasn't active. These are the kinds of bugs that make you wonder if the AI is actually saving you time or just creating a different category of work.

Meanwhile Claude Code is effortlessly provisioning cost-efficient infra on my AWS server via the CLI. Not just writing code, but thinking about the system. It operates at the level of an engineer, not a code completer.

And the benchmarks back this up. Claude Opus 4.6 leads SWE-bench Verified at 80.8%, which tests whether a model can actually resolve real GitHub issues from production codebases. Independent testing found Claude Code uses 5.5x fewer tokens than Cursor for identical tasks, finishing faster with fewer errors. On tool-calling benchmarks it scores 91.9% on Retail and 99.3% on Telecom, which matters because real engineering is multi-step tool orchestration, not autocomplete. It also has a 1M token context window in beta, which means it can hold an entire codebase in context without the performance degradation you get with Cursor's advertised 200K (which users consistently report hitting limits around 70-120K due to internal truncation).

These aren't abstract numbers. You feel them. When Claude Code one-shots a complex reverse proxy setup, that's the benchmark gap made tangible.

## Quick Aside: Supabase

Quick shoutout to the degradation of Supabase. The service went from really cool when I first started using it to so many reliability issues it became kind of a joke. I casually mentioned in two separate YC Founding Engineer interviews that I was moving on from Supabase and both times the founders' eyes lit up to tell me how frustrating they found it to work with. That's not a great sign.

Sucks, because I actually quite like the UI. But "when it works" is doing a lot of heavy lifting in that sentence.

## The Verdict

But yeah, right now Claude Code is comfortably beating all else in the "AI Software Engineer" game. And I say that over codegen because it does more than just generate code. It can architect an entire system if you prompt it properly. Infrastructure, backend, frontend, deployment. It thinks about your project holistically in a way that autocomplete-style tools just can't.

I didn't switch because of brand loyalty or politics or hype. I switched because I described a complex problem and Claude Code solved it while the alternatives were still tripping over themselves.
