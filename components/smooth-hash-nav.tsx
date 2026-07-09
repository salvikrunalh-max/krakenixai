"use client";

import { useEffect } from "react";
import { getHashTargetId } from "@/lib/url-params";

function scrollToHashTarget() {
  const id = getHashTargetId();
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SmoothHashNav() {
  useEffect(() => {
    scrollToHashTarget();

    const onHashChange = () => scrollToHashTarget();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
