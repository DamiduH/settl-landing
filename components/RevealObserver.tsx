"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(.2,.8,.2,1)";

/**
 * Fades `.rv` elements up as they scroll into view. Uses IntersectionObserver
 * and the Web Animations API (on the `translate` property) so it never fights
 * with an element's own transform-based hover effects.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (reduce) {
      document.querySelector<SVGSVGElement>("svg:has(#sgA)")?.pauseAnimations();
    }

    if (reduce || touch || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    root.classList.add("rv-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add("in");
          el.animate(
            [
              { opacity: 0, translate: "0 28px" },
              { opacity: 1, translate: "0 0" },
            ],
            { duration: 900, easing: EASE },
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    items.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove("rv-ready");
    };
  }, []);

  return null;
}
