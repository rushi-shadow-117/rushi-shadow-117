import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getBaseUrl, SITE_NAME, SITE_AUTHOR } from '@/lib/site';

/**
 * Generate RSS 2.0 feed
 */
export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = getBaseUrl();

  const rssItems = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      
      // Escape HTML in content for XML
      const escapedContent = post.contentHtml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      ${post.tags?.map(tag => `<category>${tag}</category>`).join('\n      ') || ''}
      <content:encoded><![CDATA[${escapedContent}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <description><![CDATA[Archives of thoughts on life, engineering, and entropy.]]></description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${SITE_AUTHOR}</managingEditor>
    <webMaster>${SITE_AUTHOR}</webMaster>
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}



