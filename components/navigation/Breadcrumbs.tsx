import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-neutral-500 hover:text-black uppercase tracking-wide transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumb items for a blog post
 */
export function getPostBreadcrumbs(category: string, postTitle: string): BreadcrumbItem[] {
  const categoryMap: Record<string, string> = {
    work: "Work",
    life: "Life",
    fun: "Fun",
  };

  const categoryLabel = categoryMap[category] || category;

  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryLabel, href: `/${category}` },
    { label: postTitle, href: "" }, // Non-clickable, current page
  ];
}

/**
 * Generate breadcrumb items for a category page
 */
export function getCategoryBreadcrumbs(category: string): BreadcrumbItem[] {
  const categoryMap: Record<string, string> = {
    work: "Work",
    life: "Life",
    fun: "Fun",
  };

  const categoryLabel = categoryMap[category] || category;

  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryLabel, href: "" }, // Non-clickable, current page
  ];
}

