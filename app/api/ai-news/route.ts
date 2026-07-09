import { NextResponse } from "next/server";
import { AI_NEWS_FALLBACK, type AiHeadline } from "@/lib/ai-news-fallback";

export const revalidate = 3600;

const RSS_URL =
  "https://news.google.com/rss/search?q=artificial+intelligence+AI&hl=en-US&gl=US&ceid=US:en";

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"));
  if (cdata?.[1]) return decodeXml(cdata[1]);
  const plain = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return plain?.[1] ? decodeXml(plain[1]) : "";
}

function formatRelativeTime(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  const diffMs = Date.now() - parsed.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatNewsDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseRss(xml: string): AiHeadline[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  return items
    .slice(0, 8)
    .map((item) => {
      const title = extractTag(item, "title");
      const url = extractTag(item, "link") || extractTag(item, "guid");
      const pubDate = extractTag(item, "pubDate");
      const sourceRaw = extractTag(item, "source");
      const source = sourceRaw || title.split(" - ").pop() || "AI News";

      if (!title || !url) return null;

      return {
        title: title.replace(/\s+-\s+[^-]+$/, "").trim(),
        url,
        source,
        date: formatNewsDate(pubDate),
        time: formatRelativeTime(pubDate),
      };
    })
    .filter((h): h is AiHeadline => h !== null);
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "KrakenixAI/1.0" },
    });

    if (!res.ok) {
      return NextResponse.json({ headlines: AI_NEWS_FALLBACK, cached: false });
    }

    const xml = await res.text();
    const headlines = parseRss(xml);

    return NextResponse.json({
      headlines: headlines.length > 0 ? headlines : AI_NEWS_FALLBACK,
      cached: true,
    });
  } catch {
    return NextResponse.json({ headlines: AI_NEWS_FALLBACK, cached: false });
  }
}
