"use client";

import { useEffect, useRef } from "react";

const SPACING = 24;
const RADIUS = 170;
const BASE = [185, 207, 242];
const LIT = [47, 111, 224];

/**
 * Hero wrapper with a canvas dot field. The grid drifts and ripples slowly on
 * its own; a soft lit area eases toward the mouse, or wanders when idle.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const light = { x: 0, y: 0, ready: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      const s = t / 1000;

      // Where the light wants to be: the mouse, or a slow idle path.
      const target = pointer.current ?? {
        x: width * (0.5 + 0.32 * Math.sin(s * 0.21)),
        y: height * (0.3 + 0.14 * Math.sin(s * 0.33 + 1)),
      };
      if (!light.ready) {
        light.x = target.x;
        light.y = target.y;
        light.ready = true;
      }
      light.x += (target.x - light.x) * 0.045;
      light.y += (target.y - light.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      // Soft glow under the lit area.
      const glow = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, RADIUS * 1.6);
      glow.addColorStop(0, "rgba(57,118,210,0.12)");
      glow.addColorStop(1, "rgba(57,118,210,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // The whole grid drifts diagonally and ripples gently.
      const ox = (s * 5) % SPACING;
      const oy = (s * 3) % SPACING;
      const fadeStart = height * 0.5;
      const lit: [number, number, number, number][] = [];

      ctx.beginPath();
      for (let gy = -SPACING; gy < height + SPACING; gy += SPACING) {
        for (let gx = -SPACING; gx < width + SPACING; gx += SPACING) {
          const x = gx + ox + Math.sin(gy * 0.018 + s * 0.6) * 2.2;
          const y = gy + oy + Math.cos(gx * 0.016 + s * 0.5) * 2.2;
          if (y > height) continue;
          const fade = y < fadeStart ? 1 : Math.max(0, 1 - (y - fadeStart) / (height - fadeStart));
          if (fade <= 0) continue;

          const d = Math.hypot(x - light.x, y - light.y);
          if (d < RADIUS) {
            const k = (1 - d / RADIUS) ** 2;
            lit.push([x, y, k, fade]);
          } else {
            ctx.moveTo(x + 1.3, y);
            ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          }
        }
      }
      ctx.fillStyle = `rgba(${BASE.join(",")},0.9)`;
      ctx.fill();

      for (const [x, y, k, fade] of lit) {
        const r = Math.round(BASE[0] + (LIT[0] - BASE[0]) * k * 0.75);
        const g = Math.round(BASE[1] + (LIT[1] - BASE[1]) * k * 0.75);
        const b = Math.round(BASE[2] + (LIT[2] - BASE[2]) * k * 0.75);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.3 + k * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (!reduce && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    io.observe(section);

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section
      ref={sectionRef}
      className="hero"
      onPointerMove={move}
      onPointerLeave={() => {
        pointer.current = null;
      }}
    >
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <canvas ref={canvasRef} className="hero__field" aria-hidden="true" />
      {children}
    </section>
  );
}
