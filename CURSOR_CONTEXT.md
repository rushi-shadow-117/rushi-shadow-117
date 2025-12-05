# Cursor Context & Technical Architecture

## 1. Project Overview
**Name:** RP | Digital Garden
**Type:** Personal Portfolio & Blog (Digital Garden)
**Vibe:** Monochromatic, Swiss-style engineering aesthetics, high-contrast, "sci-fi minimalism".
**Environment:** Client-side React application simulating a Next.js App Router structure.

## 2. Technical Constraint: Browser-Only Environment
**CRITICAL:** This project currently runs in a browser-based preview environment (like StackBlitz or Bolt) that does **NOT** support Node.js server-side runtimes or file system access (`fs`).

- **Entry Point:** `index.tsx` bootstraps the React app.
- **Router:** A custom client-side router implementation inside `index.tsx` mimics Next.js App Router routing.
- **File System:** We cannot use `fs.readFileSync`. All content is currently stored statically in `lib/content.ts`.
- **Next.js Features:** `<Link>`, `next/image`, and `metadata` exports are mocked or replaced with standard HTML/React equivalents where necessary to function in the preview.

## 3. Architecture & File Structure

### `/app` (Routes)
Follows Next.js 15 App Router conventions, though currently rendered client-side.
- `page.tsx`: Home landing page.
- `layout.tsx`: Root layout (Navbar, Footer, Background).
- `blog/page.tsx`: Full archive of posts.
- `blog/[slug]/page.tsx`: Individual blog post view.
- `work/`, `life/`, `fun/`: Category-specific filtered views.
- `about/`, `contact/`: Static informational pages.

### `/components`
Atomic design structure.
- **`/ui`**: primitive components (Buttons).
- **`/layout`**: Structural components (Navbar, Footer).
- **`/visuals`**: Purely aesthetic components (OrbitalIcon, BackgroundGrid, AdSlot).
- **`/blog`**: Domain-specific content components (PostRow).
- **`/interactions`**: Interactive complex islands (SubscribeModal).

### `/lib`
- `utils.ts`: Tailwind class merging (`cn`) and date formatting.
- `content.ts`: **The CMS.** Contains the static array of blog posts and helper functions (`getAllPosts`, `getPostBySlug`).

## 4. Key Implementation Details

### The "CMS" (`lib/content.ts`)
Since we cannot parse Markdown files at runtime in the browser:
1. Content is stored as a typed array `PostData[]`.
2. HTML content is stored as a string in `contentHtml`.
3. Frontmatter is mimicked as object properties (`slug`, `date`, `tags`, `category`).

### Navigation Logic
- **`Navbar.tsx`**: Uses `Link` components.
- **`index.tsx`**: Intercepts link clicks to prevent full page reloads and manages `window.history`.
- **Mobile Menu**: Fully responsive state-driven overlay in `Navbar.tsx`.

## 5. Coding Conventions

- **Styling**: Tailwind CSS exclusively. No CSS modules.
- **Icons**: `lucide-react`. Import individual icons.
- **Typography**:
  - `font-sans` (Inter) for body/headers.
  - `font-mono` (JetBrains Mono) for meta-data, dates, and "system" text.
- **Animations**:
  - Use `animate-spin-slow` for large decorative elements.
  - Use `animate-scroll` for the footer marquee.
  - Use `animate-rotate-orbit` for the logo.

## 6. Future Migration (to Real Next.js)
To move this to a real Vercel/Node deployment:
1. Restore `next.config.mjs`.
2. Move `lib/content.ts` data back to `content/posts/*.md`.
3. Implement `lib/markdown.ts` using `fs` and `gray-matter` to parse files.
4. Remove the custom router in `index.tsx`.
