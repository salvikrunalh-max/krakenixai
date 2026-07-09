"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

const LAYERS = [
  { src: "/bg-pcb.png", start: 0, end: 0.14, position: "center top", animDelay: "0s", w: 472, h: 1024 },
  { src: "/bg-datastream.png", start: 0.1, end: 0.24, position: "center top", animDelay: "-4s", w: 682, h: 1024 },
  { src: "/bg-binary.png", start: 0.2, end: 0.34, position: "center", animDelay: "-8s", w: 585, h: 1024 },
  { src: "/bg-dna.png", start: 0.3, end: 0.44, position: "center", animDelay: "-12s", w: 574, h: 1024 },
  { src: "/bg-engine.png", start: 0.4, end: 0.54, position: "center", animDelay: "-6s", w: 512, h: 1024 },
  { src: "/bg-chain.png", start: 0.5, end: 0.64, position: "center", animDelay: "-10s", w: 576, h: 1024 },
  { src: "/bg-neural.png", start: 0.6, end: 1, position: "center bottom", animDelay: "-14s", w: 580, h: 1024 },
] as const;

const FADE = 0.07;

function layerOpacity(progress: number, start: number, end: number): number {
  if (progress < start - FADE) return 0;
  if (progress < start) return (progress - (start - FADE)) / FADE;
  if (progress <= end) return 1;
  if (progress < end + FADE) return 1 - (progress - end) / FADE;
  return 0;
}

export function FlowingBackground() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobileMq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMobile = () => setIsMobile(mobileMq.matches);
    const syncMotion = () => setReducedMotion(motionMq.matches);

    syncMobile();
    syncMotion();
    mobileMq.addEventListener("change", syncMobile);
    motionMq.addEventListener("change", syncMotion);

    return () => {
      mobileMq.removeEventListener("change", syncMobile);
      motionMq.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="flowing-bg-canvas flowing-bg-mobile-static" aria-hidden>
        <div className="flowing-bg-vignette" />
      </div>
    );
  }

  return (
    <div className="flowing-bg-canvas" aria-hidden>
      {LAYERS.map((layer, i) => {
        const opacity = layerOpacity(progress, layer.start, layer.end) * 0.28;
        if (opacity < 0.01) return null;

        return (
          <div
            key={layer.src}
            className="flowing-bg-layer"
            style={{ opacity, zIndex: i }}
          >
            <div className="flowing-bg-frame">
              <div
                className={`flowing-bg-kenburns ${reducedMotion ? "flowing-bg-static" : ""}`}
                style={{ animationDelay: layer.animDelay }}
              >
                <div className="flowing-bg-rotator">
                  <Image
                    src={layer.src}
                    alt=""
                    width={layer.w}
                    height={layer.h}
                    quality={85}
                    unoptimized
                    priority={i === 0}
                    className="flowing-bg-img"
                    style={{ objectPosition: layer.position }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flowing-bg-vignette" />
    </div>
  );
}
