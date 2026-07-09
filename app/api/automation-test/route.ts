import { NextResponse } from "next/server";
import { automationTestSchema } from "@/lib/automation-test-schema";

const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demo limit reached. Try again in an hour." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const parsed = automationTestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_AUTOMATION_TEST_WEBHOOK_URL;

    if (!webhookUrl) {
      const start = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));

      console.info("[automation-test/demo]", {
        phone: parsed.data.phone.slice(-4).padStart(parsed.data.phone.length, "*"),
        mode: parsed.data.mode,
        ip,
      });

      return NextResponse.json({
        success: true,
        simulated: true,
        elapsedMs: Date.now() - start,
        mode: parsed.data.mode,
      });
    }

    const start = Date.now();
    const secret = process.env.N8N_AUTOMATION_TEST_SECRET;

    const payload = {
      phone: parsed.data.phone,
      mode: parsed.data.mode,
      source: "krakenix-website-live-test",
      timestamp: new Date().toISOString(),
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (secret) {
      headers["x-webhook-secret"] = secret;
    }

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      return NextResponse.json(
        { error: "Failed to dispatch demo. Please try again." },
        { status: 502 }
      );
    }

    const elapsedMs = Date.now() - start;

    return NextResponse.json({
      success: true,
      elapsedMs,
      mode: parsed.data.mode,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to dispatch demo. Please try again." },
      { status: 500 }
    );
  }
}
