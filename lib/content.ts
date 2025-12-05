
export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  category?: "work" | "life" | "fun";
  contentHtml?: string;
}

const posts: PostData[] = [
  // WORK POSTS
  {
    slug: "why-web3-is-dead-again",
    title: "Why web3 is dead (again)",
    date: "2024-12-04",
    description: "The cycle repeats. We built infrastructure for infrastructure. Now we need to actually build products people want to use.",
    tags: ["crypto", "web3", "engineering"],
    category: "work",
    contentHtml: `
      <p>The cycle repeats. We spent the last four years building infrastructure for infrastructure. We built bridges to nowhere, L2s for L1s that nobody uses, and governance tokens for protocols that govern nothing.</p>
      <p>It is time to admit that <strong>shipping is the only metric</strong>.</p>
      <h2>The Infrastructure Trap</h2>
      <p>Engineers love building tools. It's safe. If you build a tool, you aren't responsible for the end-user experience. You just provide the shovel. But when everyone is selling shovels and nobody is digging for gold, the economy collapses.</p>
      <blockquote>Perfectionism is procrastination wrapped in vanity.</blockquote>
      <p>We need to stop optimizing for throughput and start optimizing for utility.</p>
    `
  },

  // LIFE POSTS
  {
    slug: "optimizing-for-serendipity",
    title: "Optimizing for serendipity",
    date: "2024-10-10",
    description: "How being loud on the internet leads to the best opportunities. Increased surface area for luck.",
    tags: ["career", "luck", "writing"],
    category: "life",
    contentHtml: `
      <p>Luck is not random. Luck is a function of your surface area.</p>
      <p>By writing, shipping, and sharing your work publicly, you increase the probability of a beneficial random event occurring. This is what it means to be "loud" on the internet.</p>
      <p>Don't build in silence.</p>
    `
  },

  // FUN POSTS
  {
    slug: "analog-photography",
    title: "Shooting Film in Tokyo",
    date: "2024-07-20",
    description: "A photo diary from Shinjuku and Shibuya. Why 35mm film captures the soul of a city better than any sensor.",
    tags: ["photography", "travel", "japan"],
    category: "fun",
    contentHtml: `
      <p>Tokyo is a city of neon and shadows. Digital sensors try to balance the dynamic range, making everything perfectly exposed. But perfection is boring.</p>
      <p>Film has grain. It has character. It forces you to slow down and compose. You only have 36 shots. Make them count.</p>
    `
  }
];

export function getAllPosts(): PostData[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: "work" | "life" | "fun"): PostData[] {
  return getAllPosts().filter(post => post.category === category);
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  return posts.find(p => p.slug === slug) || null;
}
