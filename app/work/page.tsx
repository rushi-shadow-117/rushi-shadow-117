
import React from "react";
import { getPostsByCategory } from "@/lib/content";
import { PostRow } from "@/components/blog/PostRow";
import { WorkOrbitalIcon } from "@/components/visuals/WorkOrbitalIcon";

export default function WorkPage() {
  const posts = getPostsByCategory("work");

  return (
    <main className="w-full px-6 md:px-20 pt-32 pb-24 bg-white relative z-20 flex-grow">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="flex items-center gap-6 md:gap-12">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
              work<br />
              log
            </h1>
            <WorkOrbitalIcon />
          </div>
          <p className="font-mono text-sm md:text-base hidden md:block text-right text-neutral-500 pb-2 max-w-sm">
            Projects, case studies, and engineering philosophy. How I build.
          </p>
        </div>

        <div className="flex flex-col min-h-[50vh]">
          {posts.length > 0 ? (
            posts.map((post) => (
              <React.Fragment key={post.slug}>
                <PostRow
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                />
              </React.Fragment>
            ))
          ) : (
             <div className="py-20 border-t border-black/20 text-neutral-400 font-mono">NO ENTRIES FOUND.</div>
          )}
          <div className="border-t border-black/20"></div>
        </div>
      </div>
    </main>
  );
}
