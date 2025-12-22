import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ViewCount } from "@/components/blog/ViewCount";

interface PostRowProps {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export function PostRow({ slug, title, date, description }: PostRowProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group border-t border-black/20 py-10 flex flex-col md:flex-row md:items-baseline gap-4 cursor-pointer hover:bg-neutral-50 transition-colors">
        <div className="w-32 md:w-48 shrink-0 flex flex-col gap-1">
          <span className="font-mono text-sm text-neutral-500">
            {formatDate(date)}
          </span>
          <ViewCount slug={slug} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300 break-words">
            {title}
          </h3>
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed break-words">
            {description}
          </p>
        </div>
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-8 h-8" />
        </div>
      </article>
    </Link>
  );
}