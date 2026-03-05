# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` - Start Next.js dev server (port 3000)
- `npm run build` - Production build
- `npm run lint` - ESLint
- Node version: 20 (see `.nvmrc`)

## Architecture

**Next.js 16 App Router** personal blog with Tailwind CSS, TypeScript, React 19. Deployed on Vercel.

### Dual Content Systems

The blog has two content systems that coexist:

1. **Markdown files** (`content/posts/*.md`) - The primary system. Parsed server-side by `lib/posts.ts` using `gray-matter` + `remark`/`remark-html`. Frontmatter fields: `title`, `date`, `description`, `category`, `tags`, `status` (draft/published). Slug derived from filename unless overridden in frontmatter.
2. **Static content array** (`lib/content.ts`) - Legacy system from when the project ran client-side only (StackBlitz/Bolt). Contains `PostData[]` with inline `contentHtml`. Some older posts may still live here.

The blog post page (`app/blog/[slug]/page.tsx`) imports from `lib/posts.ts` (the markdown system).

### Key Patterns

- **Do NOT include H1 in markdown post content** - the title renders from frontmatter automatically in the page component. Start content with the first paragraph, use H2+ for sections.
- **Categories**: `"work" | "life" | "fun"` - each has a dedicated route (`app/work/`, `app/life/`, `app/fun/`) that filters posts.
- **OG images**: Dynamic route at `app/og/[slug]/route.tsx`.
- **RSS**: Generated at `app/rss.xml/route.ts`.
- **Site config**: `lib/site.ts` holds `SITE_NAME`, `SITE_AUTHOR`, `getBaseUrl()`.
- **Utility**: `lib/utils.ts` has `cn()` (clsx + tailwind-merge) and `formatDate()`.

### Design System

Monochromatic, Swiss-style "sci-fi minimalism". Key rules:

- **Tailwind only** - no CSS modules
- **Icons**: `lucide-react` (import individual icons)
- **Fonts**: Inter (`font-sans`) for body/headers, JetBrains Mono (`font-mono`) for dates/tags/meta/nav labels
- **Colors**: Strictly monochromatic. `bg-white`/`bg-neutral-50`, `text-black`/`text-neutral-900`, `text-neutral-500` for muted. Only color accent is `bg-green-500` for status indicators.
- **No shadows** (except specific elevated cards), **no rounded corners > 2px** (except circles)
- Custom animations defined in `tailwind.config.ts`: `animate-scroll`, `animate-rotate-orbit`, `animate-spin-slow`, etc.
- Blog post content styled via `@tailwindcss/typography` prose classes.

### Components Structure

- `/components/ui` - Primitives (Button)
- `/components/layout` - Navbar, Footer
- `/components/visuals` - Decorative (OrbitalIcon, BackgroundGrid, AdSlot)
- `/components/blog` - PostRow, ScrollProgressBar, PostSubscribeCTA, ComingSoonQueue
- `/components/interactions` - SubscribeModal
- `/components/navigation` - Breadcrumbs
- `/components/faq` - FAQ
- `/components/home` - HeroCTA
