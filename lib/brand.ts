export const BRAND_NAME = "Krakenix AI";
export const BRAND_SHORT = "Krakenix";
export const BRAND_RELAY = "Krakenix Relay";
export const BRAND_DOMAIN = "krakenix.ai";
export const BRAND_SITE_URL = "https://krakenix.ai";
export const BRAND_LOGO_MARK = "KX";
export const BRAND_LOGO_SRC = "/krakenix-ai-logo.png";
export const OPEN_CHAT_EVENT = "krakenix:open-chat";
/** Primary contact email — shown publicly for founder & sales lead */
export const FOUNDER_EMAIL = "architect@krakenixai.com";
export const FOUNDER_NAME = "Krunal H Salvi";
export const FOUNDER_TITLE = "Founder & Lead Architect";
export const FOUNDER_PHONE = "9188403501";
export const FOUNDER_PHONE_DISPLAY = "918-840-3501";
export const FOUNDER_SMS_HREF = "sms:9188403501";
export const FOUNDER_TEL_HREF = "tel:9188403501";

/** In-page booking section id (slot picker / Calendly placeholder). */
export const BOOKING_SECTION_ID = "booking";

/**
 * Strategy-call destination.
 * - Set NEXT_PUBLIC_CALENDLY_URL to a full https://calendly.com/... link for live booking.
 * - Otherwise scrolls to the on-page #booking placeholder (never loops back from contact).
 */
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";
export const BOOKING_HREF =
  calendlyUrl.startsWith("http://") || calendlyUrl.startsWith("https://")
    ? calendlyUrl
    : `#${BOOKING_SECTION_ID}`;

export const IS_EXTERNAL_BOOKING = BOOKING_HREF.startsWith("http");

export const DEMO_SMS_BODY =
  "Krakenix AI Demo • Lead captured. Reply 'YES' to book your free strategy call or get a custom estimate.";
