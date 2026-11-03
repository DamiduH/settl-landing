"use client";

import { useRef } from "react";

/**
 * Hero wrapper with an interactive dot field. The lit area follows the mouse;
 * when the pointer leaves (or on touch screens) it drifts on its own.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.classList.remove("idle");
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.classList.add("idle");
  };

  return (
    <section ref={ref} className="hero idle" onPointerMove={move} onPointerLeave={leave}>
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="dots" aria-hidden="true" />
      <div className="lit" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      {children}
    </section>
  );
}
