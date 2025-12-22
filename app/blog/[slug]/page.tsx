import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, Post } from "@/lib/posts";
import { getBaseUrl, SITE_NAME, SITE_AUTHOR } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { getWordCount, getReadingTimeMinutes, formatWordCount } from "@/lib/readingTime";
import { ScrollProgressBar } from "@/components/blog/ScrollProgressBar";
import { Breadcrumbs, getPostBreadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PostSubscribeCTA } from "@/components/blog/PostSubscribeCTA";
import { ViewCount } from "@/components/blog/ViewCount";
// import { AdSlot } from "@/components/visuals/AdSlot"; // DISABLED during AdSense review - uncomment when approved

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
  const ogImage = `${baseUrl}/og/${post.slug}`;

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
  const ogImage = `${baseUrl}/og/${post.slug}`;

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

/**
 * Generate JSON-LD BreadcrumbList structured data
 */
function getBreadcrumbJsonLd(breadcrumbs: Array<{ label: string; href: string }>) {
  const baseUrl = getBaseUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${baseUrl}${crumb.href}` : undefined,
    })),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time and word count
  const wordCount = getWordCount(post.contentHtml);
  const readingTime = getReadingTimeMinutes(wordCount);
  const formattedWordCount = formatWordCount(wordCount);

  // Generate breadcrumbs
  const breadcrumbs = getPostBreadcrumbs(post.category, post.title);

  return (
    <article className="w-full pt-32 pb-24 px-6 md:px-20 bg-white relative z-20 flex-grow">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPostJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Navigation Back */}
        <Link href={`/${post.category}`} className="inline-flex items-center gap-2 text-neutral-500 hover:text-black mb-12 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">BACK TO {post.category.toUpperCase()}</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
             <span className="font-mono text-sm text-neutral-500 uppercase tracking-wide">
               {formatDate(post.date)}
             </span>
             <span className="font-mono text-sm text-neutral-500">
               {readingTime} min read • {formattedWordCount} words
             </span>
             <ViewCount slug={post.slug} trackView={true} />
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-tight text-black break-words">
            {post.title}
          </h1>
        </header>

        {/* Ad Placement - DISABLED during AdSense review */}
        {/* TODO: Uncomment below when AdSense is approved to show ads */}
        {/* <AdSlot className="mb-12" /> */}

        {/* Content */}
        <div 
          className="prose prose-sm sm:prose-base md:prose-lg prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-neutral-600 prose-a:text-black prose-a:underline-offset-4 hover:prose-a:text-neutral-500 prose-headings:break-words prose-p:break-words"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Subscribe CTA */}
        <PostSubscribeCTA />

        {/* Footer of Article */}
        <div className="mt-12 pt-10 border-t border-black/10">
          <p className="font-mono text-sm text-neutral-500">
            Thanks for reading.
          </p>
        </div>
      </div>
    </article>
  );
}
