import { NextRequest, NextResponse } from "next/server";

interface SubscribeRequestBody {
  email: string;
  source?: string;
  botField?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Read env vars
    const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

    if (!BUTTONDOWN_API_KEY) {
      console.error("BUTTONDOWN_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Newsletter not configured." },
        { status: 500 }
      );
    }

    // Parse request body
    let body: SubscribeRequestBody;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { email, botField } = body;

    // Honeypot check - if botField is non-empty, return success but don't call API
    if (botField && botField.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Call Buttondown API
    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
      }),
    });

    // Handle response
    if (response.status === 200 || response.status === 201) {
      return NextResponse.json({ success: true });
    }

    // Handle 4xx/5xx errors
    const responseText = await response.text();
    console.error(
      `Buttondown API error: ${response.status} - ${responseText}`
    );

    return NextResponse.json(
      { success: false, error: "Subscription failed. Please try again later." },
      { status: 500 }
    );
  } catch (err) {
    console.error("Error in /api/subscribe:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}


