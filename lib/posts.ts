import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

/**
 * Post category type
 */
export type PostCategory = "work" | "life" | "fun";

/**
 * Frontmatter interface for markdown posts
 */
export interface PostFrontmatter {
  title: string;
  slug?: string; // optional in frontmatter, fallback to filename
  date: string; // ISO date string: YYYY-MM-DD
  description: string;
  category: PostCategory;
  tags?: string[];
  status?: "draft" | "published";
}

/**
 * Complete Post interface with processed data
 */
export interface Post extends PostFrontmatter {
  slug: string; // always defined after processing
  content: string; // markdown content as string
  contentHtml: string; // rendered HTML for current implementation
}

/**
 * Directory where markdown posts are stored
 * Use process.cwd() which works in Next.js server components
 */
function getPostsDirectory(): string {
  try {
    return path.join(process.cwd(), "content", "posts");
  } catch (error) {
    console.error("Error getting posts directory:", error);
    // Fallback
    return path.resolve(process.cwd(), "content", "posts");
  }
}

/**
 * Get all markdown files from the posts directory
 */
function getPostFileNames(): string[] {
  try {
    const postsDirectory = getPostsDirectory();
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory does not exist: ${postsDirectory}`);
      return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

/**
 * Extract slug from filename (remove .md extension)
 */
function getSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

/**
 * Process a single markdown file into a Post object
 */
async function processPostFile(fileName: string): Promise<Post | null> {
  try {
    const postsDirectory = getPostsDirectory();
    const fullPath = path.join(postsDirectory, fileName);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post file not found: ${fullPath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

  // Validate required fields
  if (!data.title || !data.date || !data.description || !data.category) {
    console.warn(`Post ${fileName} is missing required frontmatter fields`);
    return null;
  }

  // Determine slug: use frontmatter slug if provided, else filename
  const slug = data.slug || getSlugFromFileName(fileName);

  // Filter out drafts (treat missing status as published)
  if (data.status === "draft") {
    return null;
  }

  // Validate category
  const validCategories: PostCategory[] = ["work", "life", "fun"];
  if (!validCategories.includes(data.category)) {
    console.warn(`Post ${fileName} has invalid category: ${data.category}`);
    return null;
  }

  // Process markdown to HTML
  let contentHtml: string;
  try {
    // remark-html v16 might need to be used differently
    // Try the standard usage first
    const processedContent = await remark()
      .use(remarkHtml as any)
      .process(content);
    contentHtml = String(processedContent);
  } catch (remarkError: any) {
    console.error(`Error processing markdown for ${fileName}:`, remarkError);
    console.error(`Error details:`, {
      message: remarkError?.message,
      stack: remarkError?.stack,
      name: remarkError?.name
    });
    // Fallback to simple HTML conversion if markdown processing fails
    contentHtml = content
      .split(/\n\n+/)
      .map(para => {
        const trimmed = para.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('## ')) {
          return `<h2>${trimmed.replace(/^## /, '').trim()}</h2>`;
        }
        if (trimmed.startsWith('> ')) {
          return `<blockquote>${trimmed.replace(/^> /, '').trim()}</blockquote>`;
        }
        return `<p>${trimmed.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
      })
      .filter(Boolean)
      .join('');
  }

  // Build Post object
  const post: Post = {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    category: data.category,
    tags: data.tags || [],
    status: data.status || "published",
    content: content.trim(),
    contentHtml,
  };

  return post;
  } catch (error) {
    console.error(`Error processing post file ${fileName}:`, error);
    return null;
  }
}

/**
 * Get all published posts, sorted by date descending
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = getPostFileNames();
    const posts = await Promise.all(
      fileNames.map((fileName) => processPostFile(fileName))
    );

    // Filter out nulls (drafts, invalid posts, errors)
    const validPosts = posts.filter((post): post is Post => post !== null);

    // Sort by date descending
    return validPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileNames = getPostFileNames();
  
  // Try to find by frontmatter slug first, then by filename
  for (const fileName of fileNames) {
    const post = await processPostFile(fileName);
    if (post && post.slug === slug) {
      return post;
    }
  }

  return null;
}

/**
 * Get all posts filtered by category, sorted by date descending
 */
export async function getPostsByCategory(
  category: PostCategory
): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * Get all posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

