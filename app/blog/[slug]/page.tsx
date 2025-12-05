"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, PostData } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { AdSlot } from "@/components/visuals/AdSlot";

export default function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center font-mono text-sm">LOADING...</div>;
  if (!post) return <div className="w-full h-screen flex items-center justify-center font-mono text-sm">404 POST NOT FOUND</div>;

  return (
    <article className="w-full pt-32 pb-24 px-6 md:px-20 bg-white relative z-20 flex-grow">
      
      <div className="max-w-3xl mx-auto">
        {/* Navigation Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-black mb-12 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">BACK TO ARCHIVE</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
             <span className="font-mono text-sm text-neutral-500 uppercase tracking-wide">
               {formatDate(post.date)}
             </span>
             {post.tags && (
               <div className="flex gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded-sm text-neutral-600">
                     #{tag}
                   </span>
                 ))}
               </div>
             )}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight text-black">
            {post.title}
          </h1>
        </header>

        {/* Ad Placement */}
        <AdSlot className="mb-12" />

        {/* Content */}
        <div 
          className="prose prose-neutral prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-neutral-600 prose-a:text-black prose-a:underline-offset-4 hover:prose-a:text-neutral-500"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />

        {/* Footer of Article */}
        <div className="mt-20 pt-10 border-t border-black/10">
          <p className="font-mono text-sm text-neutral-500">
            Thanks for reading. <a href="https://twitter.com/yourhandle" className="text-black hover:underline">Discuss on X</a>.
          </p>
        </div>
      </div>
    </article>
  );
}