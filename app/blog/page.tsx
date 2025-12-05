import React from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { PostRow } from "@/components/blog/PostRow";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";

export const metadata: Metadata = {
  title: "Brain Dump | RP",
  description: "Archives of thoughts on life, engineering, and entropy.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="w-full px-6 md:px-20 pt-32 pb-24 bg-white relative z-20 flex-grow">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="flex items-center gap-6 md:gap-12">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
              full<br />
              archive
            </h1>
            <OrbitalIcon />
          </div>
        </div>

        <div className="flex flex-col min-h-[50vh]">
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
          <div className="border-t border-black/20"></div>
        </div>
      </div>
    </main>
  );
}