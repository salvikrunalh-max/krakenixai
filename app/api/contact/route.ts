import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { FOUNDER_EMAIL } from "@/lib/brand";

const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

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
  const start = Date.now();

  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? FOUNDER_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const routedTo = FOUNDER_EMAIL;

    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
      const elapsedMs = Date.now() - start;

      console.info("[contact/demo]", {
        name: data.name,
        business: data.businessName,
        industry: data.industry,
        intent: data.intent,
        package: data.package,
        to: toEmail,
        routedTo,
        ip,
      });

      return NextResponse.json({
        success: true,
        simulated: true,
        elapsedMs,
        routedTo,
      });
    }

    const resend = new Resend(apiKey);

    const lines = [
      `Name: ${data.name}`,
      `Business: ${data.businessName}`,
      `Industry: ${data.industry}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.package ? `Package: ${data.package}` : null,
      data.intent ? `Intent: ${data.intent}` : null,
      data.slot ? `Preferred slot: ${data.slot}` : null,
      data.contactTargetLabel
        ? `Requested specialist: ${data.contactTargetLabel} (${data.contactTargetEmail ?? data.contactTarget})`
        : null,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `Krakenix Lead: ${data.businessName} (${data.industry})`,
      text: lines,
    });

    if (error) {
      console.error("[contact/resend]", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      simulated: false,
      elapsedMs: Date.now() - start,
      routedTo,
    });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
