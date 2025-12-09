import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

// Use Node.js runtime since we need to read files from filesystem
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Truncate title if too long
    const title = post.title.length > 60 
      ? post.title.substring(0, 57) + "..." 
      : post.title;

    // Category display name
    const categoryMap: Record<string, string> = {
      work: "WORK",
      life: "LIFE",
      fun: "FUN",
    };
    const categoryLabel = categoryMap[post.category] || post.category.toUpperCase();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            padding: "80px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {/* Top section: Category and Site Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontFamily: "monospace",
                color: "#737373",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {categoryLabel}
            </div>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "monospace",
                color: "#737373",
                letterSpacing: "0.05em",
              }}
            >
              {SITE_NAME}
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 600,
                lineHeight: "1.1",
                color: "#000000",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom accent line */}
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "#000000",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}

