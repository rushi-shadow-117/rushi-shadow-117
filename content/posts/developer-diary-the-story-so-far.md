---
title: "Developer Diary: The Story So Far"
description: "A status update on Caleo, Verity, and Shadow Solutions. Where things stand and what's coming next."
date: "2025-12-09"
category: "work"
tags: ["development", "startups", "caleo", "verity", "shadow-solutions"]
slug: "developer-diary-the-story-so-far"
status: "published"
---

Since I came back from Germany, I've been up to a few things.

I plan to document the process as I continue to build these ideas out, and you'll get some insight before I post to a broader audience.

This will be more of a status update and some short-term planning; an origin story of ideation for each project is something I'd love to eventually write up.

Enough preamble, let's start with Caleo.

## Caleo

Caleo ([caleoai.com](https://caleoai.com)) is an agentic AI application that will be an extension for Microsoft Teams, Slack, and Google Chrome. It'll fill the role of an executive admin for corporate workers and students, and be able to do things like rearrange meetings based on availability in your organization, give insights on upcoming events and past meetings, and analyze trends in your work metadata.

All that corporate speak to say: **if you hate looking at Outlook calendars, Caleo will fix that problem.**

Caleo is actually pretty close to launching onto the Microsoft Teams Store. It passed all initial preflight checks from Microsoft, and I just have to grind out the implementation of Stripe for processing payments.

The AI engineering side of that has been going well too, using the OpenAI Agents SDK and LangGraph/LangChain to get the agent to execute most calendar functions with about 95 percent accuracy. The hardest part was, ironically, working with the Microsoft Teams Bot SDK and Azure. The cloud infra is a mix of Microsoft Azure and Supabase, and Supabase continues to be great to work with.

Hoping for a proper release post next year. Sign up for the waitlist in the meantime.

It's free to sign up.

## Verity

Verity ([getverity.io](https://getverity.io)) is software that helps hotels and short-term rentals deal with fraudulent chargebacks.

People stay at hotels or vacation homes and later say their credit card was stolen. The bank gives the cardholder a refund, and the business owner fronts the cost.

There's a bit more to it, but that's the issue Verity is trying to solve. And the solution is actually pretty elegant.

Development on this has been going steadily for the last month. I've been busy developing Caleo and expanding Shadow Solutions, so I handed off the majority of this work to a developer who reached out to me for career guidance named [Hari](https://www.linkedin.com/in/hari-patel-7139a52b0/).

He's been killing it, asking the right questions, and finding creative solutions to problems on his own.

There really is only one big feature left for Verity before we hit the "viable" in MVP. The information Verity captures needs to be easily compiled into financial reports that align with dispute requirements from Visa, AMEX, and Mastercard.

There has been a lot of interest in Verity. Apart from the Days Inn my dad owns, several individual owners of short-term rentals and one guy who manages several Airbnb properties reached out to test the app. Getting it to them sooner rather than later is certainly a priority, and I need to make time for it now that Hari is on vacation.

If you or anyone you know runs a hotel or a short-term rental, check it out.

## Shadow Solutions

And now we come to the umbrella LLC.

Shadow Solutions ([shadowsolutions.tech](https://shadowsolutions.tech)) is a small software and consulting agency I'm running to take on projects for small businesses.

It's the "umbrella corp" because right now, Caleo, Verity, and even this blog all live in its ecosystem.

So far, it's been a team of four. We have done logo redesigns, custom website development, AI automation workflows for digital marketing, and handled digital outreach.

While I've been loving working with the small business clients I've had and helping them generate their first sales, I originally was mostly interested in delivering AI software apps for more mid-sized companies.

That's what I do in my day job, and I do it exceptionally well. I have always been in the position where I can't just be a code monkey, I have always had to help folks who didn't know much about what AI software can do for them figure out their issues, pitch them a solution, build it out, and make sure they are using it effectively.

So in 2026, I want to do that. The goal will be, for sure, to build a true custom solution for a client that fixes their issues. I have feelers out on that. More to come.

Also, I named the company after my dog. Miss ya pup.

## What's Next

Finish current client work for Shadow Solutions. Look for new clients. Launch Caleo and Verity.

2026 is gonna be fun.

