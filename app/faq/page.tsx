import React from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME}`,
  description: "Frequently asked questions about my work, process, and availability.",
};

const faqs = [
  {
    id: "01",
    question: "What do you build?",
    answer: "Full-stack products, design systems, and engineering infrastructure. Currently focused on AI-powered tools and creative workflows. I ship fast and iterate based on real user feedback."
  },
  {
    id: "02",
    question: "Are you available for freelance work?",
    answer: "Selectively. I take on projects that align with my interests in product engineering, design systems, and emerging tech. Reach out via the contact page with details about your project."
  },
  {
    id: "03",
    question: "What's your tech stack?",
    answer: "React, Next.js, TypeScript for frontend. Node.js, Python for backend. Postgres for data. Tailwind CSS for styling. I prefer tools that ship fast over perfect architecture."
  },
  {
    id: "04",
    question: "Do you write about your work?",
    answer: "Yes. I document learnings, failures, and insights on this blog. Categories: WORK (engineering, products), LIFE (philosophy, productivity), FUN (photography, books, hobbies)."
  },
  {
    id: "05",
    question: "How do you approach design systems?",
    answer: "Design systems are social contracts between designers and engineers. They're the agreed-upon physics of your digital world. I build them to reduce entropy, not to satisfy perfectionism."
  },
  {
    id: "06",
    question: "What's your philosophy on shipping?",
    answer: "Shipping is the only metric. If it's not live, it doesn't exist. Your V1 should be embarrassing. If you aren't embarrassed, you launched too late. The market doesn't care about your clean architecture."
  },
  {
    id: "07",
    question: "Where are you based?",
    answer: "Chicago, IL. Building lots of stuff. Always open to connecting with other builders, writers, and product people."
  },
  {
    id: "08",
    question: "How can I stay updated?",
    answer: "Subscribe to updates via the button in the header. I send occasional updates about new projects, blog posts, and thoughts on engineering and product development."
  }
];

export default function FAQ() {
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
            Common questions about my work,<br />
            process, and availability.
          </p>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-t border-black/10 py-8 md:py-12 first:border-t-0 group"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Question Number */}
                <div className="flex-shrink-0">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                    {faq.id}
                  </span>
                </div>

                {/* Question and Answer */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-4 group-hover:text-neutral-600 transition-colors">
                    {faq.question}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-700 font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

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

