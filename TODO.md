# Project Roadmap & TODOs

## Immediate Refinements
- [ ] **SEO**: Add unique `metadata` exports to `work/page.tsx`, `life/page.tsx`, and `fun/page.tsx`.
- [ ] **Mobile Nav**: Fine-tune the mobile menu animation timing.
- [ ] **404 Page**: Create a custom `not-found.tsx` design that matches the "glitch/system failure" aesthetic.

## Feature Additions
- [ ] **Search**: Implement a client-side fuzzy search for blog posts in the Navbar.
- [ ] **Dark Mode**: (Optional) Consider an "Inverted" mode toggle.
- [ ] **Newsletter**: Connect the Subscribe component to a real API (ConvertKit/Substack).

## Architecture Migration (Post-Preview)
- [ ] **MDX Support**: Replace `lib/content.ts` string HTML with real `.mdx` file parsing using `fs`.
- [ ] **Image Optimization**: Replace standard `<img>` tags with `next/image` component.
- [ ] **RSS Feed**: Generate an RSS.xml feed in `app/feed.xml/route.ts`.
- [ ] **OG Images**: Use `@vercel/og` to generate dynamic open graph images for each post.
