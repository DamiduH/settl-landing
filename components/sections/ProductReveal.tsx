"use client";

import { useEffect, useRef } from "react";
import { MacWindow } from "./MacWindow";
import { PhoneMock } from "./PhoneMock";

/** Where in the section's scroll the window starts and finishes flattening (0–1). */
const START = 0.08;
const END = 0.8;

/** Smooth in and out, so the window eases into the tilt change and settles gently. */
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Apple-style product reveal. On tablet and desktop the section pins while the
 * app window tilts up from the page, grows and settles flat, scrubbed by scroll.
 * Progress is written to one CSS variable (--e) and CSS does the rest.
 * Phones get a phone mock instead; reduced motion shows the final state.
 */
export function ProductReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pin = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!pin.matches || reduce.matches) {
        el.style.setProperty("--e", "1");
        return;
      }
      const rect = el.getBoundingClientRect();
      // 0 when the section's top reaches the bottom of the screen, 1 when its pinned scroll ends
      const p = (window.innerHeight - rect.top) / rect.height;
      const t = Math.min(1, Math.max(0, (p - START) / (END - START)));
      el.style.setProperty("--e", ease(t).toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    pin.addEventListener("change", request);
    reduce.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      pin.removeEventListener("change", request);
      reduce.removeEventListener("change", request);
    };
  }, []);

  return (
    <section ref={ref} className="reveal" aria-labelledby="reveal-title">
      <div className="reveal__sticky">
        <h2 id="reveal-title" className="reveal__title">
          See your score the way <span className="grad">lenders will.</span>
        </h2>
        <div className="reveal__mac">
          <MacWindow />
        </div>
        <div className="reveal__phone">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
