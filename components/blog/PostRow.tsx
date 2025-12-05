import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

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
        <div className="w-32 md:w-48 shrink-0">
          <span className="font-mono text-sm text-neutral-500">
            {formatDate(date)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-4xl font-medium tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
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