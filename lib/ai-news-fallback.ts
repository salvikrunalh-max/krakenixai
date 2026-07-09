export type AiHeadline = {
  title: string;
  url: string;
  source: string;
  date: string;
  time: string;
};

export const AI_NEWS_FALLBACK: AiHeadline[] = [
  {
    title: "Enterprise AI agents move from pilots to production workflows",
    url: "https://news.google.com/search?q=enterprise+AI+agents",
    source: "Reuters",
    date: "Jul 6, 2026",
    time: "4h ago",
  },
  {
    title: "Voice AI adoption accelerates for local service businesses",
    url: "https://news.google.com/search?q=voice+AI+business",
    source: "TechCrunch",
    date: "Jul 6, 2026",
    time: "6h ago",
  },
  {
    title: "Automation platforms integrate LLMs for back-office systems",
    url: "https://news.google.com/search?q=AI+automation+back+office",
    source: "The Verge",
    date: "Jul 5, 2026",
    time: "1d ago",
  },
  {
    title: "15-second lead response becomes new local business benchmark",
    url: "https://news.google.com/search?q=AI+lead+response",
    source: "Forbes",
    date: "Jul 5, 2026",
    time: "1d ago",
  },
  {
    title: "Custom AI software demand rises among SMB operators",
    url: "https://news.google.com/search?q=custom+AI+software+SMB",
    source: "Bloomberg",
    date: "Jul 4, 2026",
    time: "2d ago",
  },
  {
    title: "n8n + Twilio stacks power real-time client automation",
    url: "https://news.google.com/search?q=n8n+twilio+automation",
    source: "Wired",
    date: "Jul 4, 2026",
    time: "2d ago",
  },
];
