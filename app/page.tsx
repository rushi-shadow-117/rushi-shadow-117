import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import { PostRow } from "@/components/blog/PostRow";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";
import { PortraitImage } from "@/components/visuals/PortraitImage";

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
      <section className="relative z-10 w-full pt-32 pb-24 md:py-32 flex flex-col items-center border-b border-black/10 bg-white">
        <div className="absolute top-28 left-6 md:top-32 md:left-20">
          <div className="font-mono text-xs uppercase text-neutral-500 tracking-wider flex flex-col">
            <span>Hey.</span>
            <span>I'm Rushi and I like writing.</span>
            <span>I'd love if you read it.</span>
          </div>
        </div>

        {/* Central Visual */}
        <div className="relative w-full max-w-xl aspect-[3/4] md:aspect-square flex items-center justify-center mt-8 md:mt-0 group">
          {/* Wireframe Halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[120%] h-[120%] border-[1px] border-dashed border-neutral-300 rounded-full animate-spin-slow group-hover:animate-spin-fast transition-all duration-500"></div>
            <div className="absolute w-[110%] h-[110%] border-[1px] border-neutral-200 rounded-full animate-spin-slow group-hover:animate-spin-faster transition-all duration-500"></div>
            {/* Third ring that appears on hover */}
            <div className="absolute w-[115%] h-[115%] border-[1px] border-dashed border-neutral-400 rounded-full opacity-0 group-hover:opacity-100 animate-spin-reverse-slower transition-opacity duration-500"></div>
          </div>

          {/* Grid Overlay - appears on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Image Container */}
          <div className="relative w-[80%] h-[80%] md:w-[500px] md:h-[600px] overflow-hidden contrast-110 shadow-2xl shadow-neutral-200 transition-transform duration-500 group-hover:scale-105">
            <PortraitImage />
            {/* Overlay Graphics - Always visible */}
            <svg
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[110%] h-[50%] opacity-40 pointer-events-none z-20"
              viewBox="0 0 200 100"
            >
              <line
                x1="100"
                y1="10"
                x2="100"
                y2="90"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="100"
                cy="50"
                r="30"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
            {/* Overlay Graphics - Animated (on hover) */}
            <svg
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[110%] h-[50%] opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
              viewBox="0 0 200 100"
            >
              <line
                x1="100"
                y1="10"
                x2="100"
                y2="90"
                stroke="white"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="y2"
                  values="10;90;10"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </line>
              <circle
                cx="100"
                cy="50"
                r="30"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              >
                <animate
                  attributeName="r"
                  values="30;40;30"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
            </svg>
          </div>
        </div>

        {/* Floating UI Element: Bottom Left (Status) */}
        <div className="relative md:absolute mt-8 md:mt-0 md:bottom-20 md:left-20 w-48 border border-black/10 bg-white/50 backdrop-blur-sm p-4 rounded-none group hover:border-black transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-xs uppercase text-neutral-500 tracking-wider">
              Status
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-tight">
              Preppin' for 2026
            </span>
            <span className="font-mono text-xs text-neutral-500 mt-1">
              Chicago, IL
            </span>
          </div>
        </div>

        {/* Floating UI Element: Bottom Right (Socials) */}
        <div className="relative md:absolute mt-8 md:mt-0 md:bottom-20 md:right-20 flex flex-wrap md:flex-col gap-3 md:gap-2 items-center md:items-end justify-center md:justify-end">
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
      <section id="blog-preview" className="w-full px-6 md:px-20 py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Area with Animation */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
            <div className="flex items-center gap-6 md:gap-12">
              <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
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
            
            <div className="border-t border-black/20 pt-10">
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
