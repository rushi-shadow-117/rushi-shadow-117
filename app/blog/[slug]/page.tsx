import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, Post } from "@/lib/posts";
import { getBaseUrl, SITE_NAME, SITE_AUTHOR } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { AdSlot } from "@/components/visuals/AdSlot";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for blog post pages
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Post not found | ${SITE_NAME}`,
    };
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${post.slug}`;
  const ogImage = `${baseUrl}/og/${post.slug}.png`; // Future enhancement: generate dynamic OG images

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      authors: [SITE_AUTHOR],
      tags: post.tags ?? [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/**
 * Generate JSON-LD structured data for blog posts
 */
function getPostJsonLd(post: Post) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${post.slug}`;
  const ogImage = `${baseUrl}/og/${post.slug}.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.svg`, // Using existing icon.svg as logo placeholder
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full pt-32 pb-24 px-6 md:px-20 bg-white relative z-20 flex-grow">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPostJsonLd(post)) }}
      />

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
             {post.tags && post.tags.length > 0 && (
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

        {/* Ad Placement - DISABLED during AdSense review */}
        {/* TODO: Uncomment below when AdSense is approved to show ads */}
        {/* <AdSlot className="mb-12" /> */}

        {/* Content */}
        <div 
          className="prose prose-neutral prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-neutral-600 prose-a:text-black prose-a:underline-offset-4 hover:prose-a:text-neutral-500"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
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
