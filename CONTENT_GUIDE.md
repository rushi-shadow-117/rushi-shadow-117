# Content Management Guide

Currently, the application uses a **Static Content Engine** located in `lib/content.ts`.

## Adding a New Post

1. Open `lib/content.ts`.
2. Locate the `posts` array.
3. Add a new object following the `PostData` interface:

```typescript
{
  slug: "my-new-post-slug", // URL friendly string
  title: "The Title of the Post",
  date: "2024-12-25", // YYYY-MM-DD
  description: "A short excerpt shown on the index page.",
  tags: ["tag1", "tag2"],
  category: "work", // Options: "work" | "life" | "fun"
  contentHtml: `
    <p>Your HTML content goes here.</p>
    <h2>Subheadings</h2>
    <p>More content...</p>
    <blockquote>Blockquotes look great too.</blockquote>
  `
}
```

## Categories
- **Work**: Engineering, Design Systems, Career, Tech Industry.
- **Life**: Philosophy, Productivity, Health, Personal Updates.
- **Fun**: Photography, Books, Travel, Hobbies.

## Formatting HTML Content
Since we are bypassing a Markdown parser for the preview environment, write raw HTML inside the `contentHtml` backticks.
- Use `<h2>` for section headers.
- Use `<p>` for paragraphs.
- Use `<blockquote>` for pull quotes.
- Use `<strong>` and `<em>` for emphasis.
- Tailwind's `@tailwindcss/typography` plugin (`prose` class) handles the styling automatically.
