"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BRAND_LOGO_MARK, BRAND_NAME, BRAND_RELAY, BOOKING_HREF, BOOKING_SECTION_ID, IS_EXTERNAL_BOOKING, OPEN_CHAT_EVENT } from "@/lib/brand";
import { CHAT_BOT_OFFER } from "@/lib/lost-leads-calculator";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const GREETING: Message = {
  id: "greet",
  from: "bot",
  text: "Hi — I'm Krakenix Assistant (demo). Ask about 15-second response, chat bots, or try the live demo.",
};

const QUICK_ACTIONS = [
  { label: "Why 15 seconds?", key: "why" },
  { label: "Live demo", key: "demo" },
  { label: "Lost revenue calc", key: "lost" },
  { label: "Chat bot pricing", key: "chatbot" },
  { label: "Book a call", key: "book" },
] as const;

function botReply(key: string): string {
  switch (key) {
    case "why":
      return "78% of leads choose the first business to respond. Krakenix fires SMS, email, or voice in under 15 seconds — before your competitor finishes their coffee.";
    case "demo":
      return `Scroll to our Live Demo section or tap below — enter your number and we'll trigger a real call or text through ${BRAND_RELAY}.`;
    case "lost":
      return "Use our Lost Revenue Calculator (below Industries) — pick your business category and see what slow response costs you monthly.";
    case "chatbot":
      return `Website Chat Bot: ${CHAT_BOT_OFFER.description} Setup from $${CHAT_BOT_OFFER.setupFrom}, optional $${CHAT_BOT_OFFER.monthlyFrom}/mo hosting. Bundles with SMS engine.`;
    case "book":
      return `Book a free strategy call — we'll map your lead flow and show exactly what Krakenix would automate. Scroll to the booking section or use Book Call in the hero.`;
    default:
      return "I can explain our 15-sec engine, chat bots, pricing, or connect you to the live demo. Try a quick button above!";
  }
}

function matchUserInput(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("demo") || t.includes("test") || t.includes("live")) return botReply("demo");
  if (t.includes("chat") || t.includes("bot")) return botReply("chatbot");
  if (t.includes("price") || t.includes("cost") || t.includes("$")) return botReply("chatbot");
  if (t.includes("lost") || t.includes("revenue") || t.includes("calculat")) return botReply("lost");
  if (t.includes("15") || t.includes("second") || t.includes("fast") || t.includes("respond"))
    return botReply("why");
  if (t.includes("book") || t.includes("call") || t.includes("human")) return botReply("book");
  return botReply("default");
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const pushBot = useCallback((text: string) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-bot`, from: "bot", text },
      ]);
      setTyping(false);
    }, 600);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  function sendUser(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, from: "user", text: text.trim() },
    ]);
    setInput("");
    pushBot(matchUserInput(text));
  }

  function handleQuick(key: string) {
    const action = QUICK_ACTIONS.find((a) => a.key === key);
    if (!action) return;
    if (key === "book") {
      setOpen(false);
      if (IS_EXTERNAL_BOOKING) {
        window.open(BOOKING_HREF, "_blank", "noopener,noreferrer");
        return;
      }
      const el = document.getElementById(BOOKING_SECTION_ID);
      if (el) {
        if (window.location.hash !== `#${BOOKING_SECTION_ID}`) {
          window.history.pushState(null, "", `#${BOOKING_SECTION_ID}`);
        }
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    sendUser(action.label);
    if (key === "demo") setTimeout(() => setOpen(false), 800);
  }

  return (
    <div id="chat" className="fixed bottom-20 sm:bottom-6 right-4 z-[45] flex flex-col items-end gap-3">
      {open && (
        <div
          className="glass-card-emerald w-[min(100vw-2rem,22rem)] sm:w-96 flex flex-col overflow-hidden shadow-2xl"
          role="dialog"
          aria-label={`${BRAND_NAME} chat assistant`}
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-emerald/25 bg-emerald/5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/15 border border-emerald/30 text-sm font-bold text-emerald">
                {BRAND_LOGO_MARK}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Krakenix Assistant</p>
                <p className="text-xs text-emerald flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                  Demo · replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-lg p-1.5 text-muted-light hover:text-foreground hover:bg-white/5"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 max-h-72 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`text-sm leading-relaxed max-w-[90%] rounded-xl px-3 py-2 ${
                    m.from === "user"
                      ? "bg-cyan/20 text-foreground border border-cyan/25"
                      : "bg-black/25 text-muted-light border border-white/8"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <p className="text-xs text-muted-light animate-pulse">Krakenix is typing…</p>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => handleQuick(a.key)}
                className="text-xs rounded-full border border-emerald/30 bg-emerald/10 text-emerald px-2.5 py-1 hover:bg-emerald/20 transition-colors"
              >
                {a.label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 p-3 border-t border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              sendUser(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about benefits, demo…"
              className="flex-1 min-w-0 rounded-lg bg-surface border border-white/10 px-3 py-2 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-emerald/20 border border-emerald/35 text-emerald px-3 py-2 text-sm font-medium hover:bg-emerald/30"
            >
              Send
            </button>
          </form>

          <div className="px-3 pb-3 flex gap-2">
            <Link
              href="#live-test"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-xs font-semibold btn-live rounded-full py-2"
            >
              Test It Live
            </Link>
            <Link
              href="#contact?intent=chatbot"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-xs font-semibold btn-outline rounded-full py-2"
            >
              Get Chat Bot
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full glass-card-emerald card-compact !py-3 !px-4 shadow-lg hover:scale-105 transition-transform"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? (
          <svg className="w-6 h-6 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span className="hidden sm:inline text-sm font-semibold text-foreground">Chat</span>
          </>
        )}
      </button>
    </div>
  );
}
