import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { PostRow } from "@/components/blog/PostRow";
import { ComingSoonQueue } from "@/components/blog/ComingSoonQueue";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";
import { HeroCTA } from "@/components/home/HeroCTA";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "A production-grade personal site featuring a monochromatic, engineering-focused design system.",
};

export default async function Home() {
  // Show the latest 3 posts regardless of category
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    const allPosts = await getAllPosts();
    posts = allPosts.slice(0, 3);
  } catch (error) {
    console.error("Error loading posts on home page:", error);
    // Continue with empty posts array if loading fails
  }

  return (
    <>
      {/* 1. Hero / Work Visual */}
      <section className="relative z-10 w-full pt-32 sm:pt-36 pb-16 sm:pb-24 md:py-32 flex flex-col items-center border-b border-black/10 bg-white px-4 sm:px-6">
        <div className="absolute top-24 sm:top-32 left-4 sm:left-6 md:top-32 md:left-20">
          <div className="font-mono text-xs uppercase text-neutral-500 tracking-wider flex flex-col">
            <span>Hey.</span>
            <span>I'm Rushi and I like writing.</span>
            <span>I'd love if you read it.</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full max-w-2xl mt-12 sm:mt-16 md:mt-0">
          <HeroCTA />
        </div>

        {/* Floating UI Element: Bottom Left (Status) */}
        <div className="relative md:absolute mt-6 sm:mt-8 md:mt-0 md:bottom-20 md:left-20 w-full max-w-xs sm:max-w-sm md:w-48 lg:w-56 border border-black/10 bg-white/50 backdrop-blur-sm p-4 rounded-none group hover:border-black transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs uppercase text-neutral-500 tracking-wider">
              Status
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-tight break-words">
              Deciding on traveling for the holidays
            </span>
            <span className="font-mono text-xs text-neutral-500 mt-1">
              Chicago, IL
            </span>
          </div>
        </div>

        {/* Floating UI Element: Bottom Right (Socials) */}
        <div className="relative md:absolute mt-6 sm:mt-8 md:mt-0 md:bottom-20 md:right-20 flex flex-wrap md:flex-col gap-3 md:gap-2 items-center md:items-end justify-center md:justify-end w-full md:w-auto">
          <a
            href="https://www.shadowsolutions.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-sm font-medium tracking-tight hover:text-neutral-500 transition-colors flex items-center gap-2 group px-4 py-3 md:px-0 md:py-0 touch-manipulation"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              Shadow Solutions
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="https://caleoai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-sm font-medium tracking-tight hover:text-neutral-500 transition-colors flex items-center gap-2 group px-4 py-3 md:px-0 md:py-0 touch-manipulation"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              Caleo
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="https://getverity.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-sm font-medium tracking-tight hover:text-neutral-500 transition-colors flex items-center gap-2 group px-4 py-3 md:px-0 md:py-0 touch-manipulation"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              Verity
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
          <a
            href="https://www.linkedin.com/in/rushi-patel-uiuc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-sm font-medium tracking-tight hover:text-neutral-500 transition-colors flex items-center gap-2 group px-4 py-3 md:px-0 md:py-0 touch-manipulation"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              LinkedIn
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      </section>

      {/* 2. Blog Preview / Brain Dump */}
      <section id="blog-preview" className="w-full px-4 sm:px-6 md:px-20 py-16 sm:py-20 md:py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Area with Animation */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
                latest<br />
                notes
              </h2>
              <OrbitalIcon />
            </div>

            <span className="font-mono text-sm md:text-base hidden md:block text-right text-neutral-500 pb-2">
              thoughts on life,<br />
              engineering, and entropy.
            </span>
          </div>

          {/* Blog List */}
          <div className="flex flex-col">
            {posts.map((post) => (
              <React.Fragment key={post.slug}>
                <PostRow
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                />
              </React.Fragment>
            ))}
            
            {/* Coming Soon Queue */}
            <ComingSoonQueue />
            
            <div className="border-t border-black/20 pt-10 mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-sm hover:underline underline-offset-4">
                 VIEW FULL ARCHIVE <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
