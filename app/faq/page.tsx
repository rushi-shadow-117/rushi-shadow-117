import React from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";
import { FAQ, FAQItem } from "@/components/faq/FAQ";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME}`,
  description: "Frequently asked questions about this blog, its purpose, and the thoughts behind it.",
};

const faqItems: FAQItem[] = [
  {
    q: "Why make a blog?",
    a: (
      <>
        <p>I've always wanted to. I enjoy writing, and hopefully someone enjoys reading what I write.</p>
        <p>Based on the content, you can probably call this platform a lot of things. <strong>Digital journal. Public facing notes App. Career limiting move.</strong> I'll stick with Blog.</p>
      </>
    ),
  },
  {
    q: "You're a Web Engineer. You should know that most blogs succeed because they fill a specific niche. You're going broad. Why?",
    a: (
      <>
        <p>That's right, most agencies and engineers will tell you that an online blog typically succeeds if it fills a specific niche.</p>
        <p>This purely serves as an outlet for me to write, I don't really plan on monetizing it. At most, I am considering a very light implementation of Google AdSense, mostly because I want to see how it works.</p>
      </>
    ),
  },
  {
    q: "Are you trying to be some type of influencer-philosopher?",
    a: (
      <>
        <p>No, definitely not. Well, at least not directly.</p>
        <p>A few of the topics I write about I will have some subject matter expertise, but when it comes to outlook on life, retrospectives and topics concerning mental health, I'm just voicing my thoughts.</p>
        <p>While I won't pretend to preach answers, I'd love it if you could be guided to find introspects and find answers on your own. You might find that I'm completely wrong about something and thinking about it gives you space to reflect and find clarity, I 100% support that.</p>
      </>
    ),
  },
  {
    q: "When it comes to your thoughts on tech and the professional world, do you think you know enough to have a qualified opinion? You're not an executive.",
    a: (
      <>
        <p>Actually, I do.</p>
        <p>Thinking critically and noticing things isn't something you need to be a Director to do, but you need to temper it with a simple thought: <strong>I might be wrong.</strong></p>
      </>
    ),
  },
  {
    q: "Who's the intended audience for the blog?",
    a: (
      <>
        <p>It's dependent on the subject matter for the blog, but I intentionally write in the same style as I think and talk.</p>
        <p>I want it to be almost conversational, and for it to be a leisurely read for the most part. <strong>Light, not taking itself too seriously and entertaining as well as informative.</strong></p>
        <p>Let me know if I hit the mark!</p>
      </>
    ),
  },
  {
    q: "Is there any way to support you?",
    a: (
      <>
        <p>If you asked yourself this before I prompted it, thanks! I really appreciate that.</p>
        <p>The only support I need is a comment or note if you enjoyed what you read, agree/disagree, or just any type of reaction.</p>
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <main className="w-full px-6 md:px-20 pt-32 pb-24 bg-white relative z-20 flex-grow">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="flex items-center gap-6 md:gap-12">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
              frequently<br />
              asked
            </h1>
            <OrbitalIcon />
          </div>
          <p className="font-mono text-sm md:text-base hidden md:block text-right text-neutral-500 pb-2 max-w-sm">
            Questions about this blog, its purpose, and the thoughts behind it.
          </p>
        </div>

        <FAQ items={faqItems} />

        {/* Footer Note */}
        <div className="mt-20 pt-12 border-t border-black/10">
          <p className="font-mono text-sm text-neutral-500">
            Still have questions? <a href="/contact" className="text-black hover:underline underline-offset-4">Get in touch</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

