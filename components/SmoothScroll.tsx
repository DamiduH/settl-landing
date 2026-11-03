"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Eased wheel scrolling and anchor links. Off for reduced motion and touch. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: { offset: -16 },
      prevent: (node) => node.closest(".modal") !== null,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
