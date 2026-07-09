/** Parse query params from ?search or from #section?query (hash-router style links). */
export function parseClientUrlParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();

  if (window.location.search.length > 1) {
    return new URLSearchParams(window.location.search);
  }

  const hash = window.location.hash.slice(1);
  const qIndex = hash.indexOf("?");
  if (qIndex >= 0) {
    return new URLSearchParams(hash.slice(qIndex + 1));
  }

  return new URLSearchParams();
}

/** Hash target id without query string, e.g. `#contact?intent=x` → `contact`. */
export function getHashTargetId(): string {
  if (typeof window === "undefined") return "";
  const hash = window.location.hash.slice(1);
  const qIndex = hash.indexOf("?");
  return qIndex >= 0 ? hash.slice(0, qIndex) : hash;
}

export function buildHashHref(
  sectionId: string,
  params?: Record<string, string | undefined>
): string {
  if (!params) return `#${sectionId}`;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `#${sectionId}?${qs}` : `#${sectionId}`;
}
