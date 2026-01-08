# Blog Post Formatting Guidelines

## CRITICAL: Do NOT Include H1 Title in Markdown Content

**The page component automatically renders the title from frontmatter.**

When creating or formatting blog posts:

1. ✅ **DO** include the title in the YAML frontmatter: `title: "Your Title Here"`
2. ❌ **DO NOT** include an H1 (`# Title`) in the markdown content itself
3. ✅ **DO** start the content directly with the first paragraph

### Why?

The blog post page component (`app/blog/[slug]/page.tsx`) automatically displays the title from the frontmatter metadata. If you also include an H1 in the markdown, the title will appear **twice** on the rendered page.

### Example

**❌ WRONG:**
```markdown
---
title: "My Article Title"
---

# My Article Title

This is the first paragraph...
```

**✅ CORRECT:**
```markdown
---
title: "My Article Title"
---

This is the first paragraph...
```

### When to Use Headings

- Use H2 (`##`) for section headings within the article
- Use H3 (`###`) for subsections if needed
- **Never use H1** - the title is handled by the page component


