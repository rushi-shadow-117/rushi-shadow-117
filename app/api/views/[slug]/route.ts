import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json");

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read views from file
function readViews(): Record<string, number> {
  ensureDataDir();
  if (!fs.existsSync(VIEWS_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(VIEWS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading views file:", error);
    return {};
  }
}

// Write views to file
function writeViews(views: Record<string, number>) {
  ensureDataDir();
  try {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing views file:", error);
  }
}

/**
 * GET /api/views/[slug] - Fetch view count for a post
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const views = readViews();
    const count = views[slug] || 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching view count:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

/**
 * POST /api/views/[slug] - Increment view count for a post
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const views = readViews();
    
    // Increment view count
    views[slug] = (views[slug] || 0) + 1;
    
    writeViews(views);

    return NextResponse.json({ count: views[slug], success: true });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track view" },
      { status: 500 }
    );
  }
}

