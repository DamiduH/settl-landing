"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "../icons";

const awards = [
  { tag: "Ideasprint 2026", title: "1st runners-up", line: "Where Settl was first pitched." },
  { tag: "SLIIT Codefest", title: "Finalist", line: "[One line about Codefest]" },
  { tag: "Intelicon 2026", title: "Finalist", line: "[One line about Intelicon]" },
];

const INTERVAL = 6000;
const SWIPE = 40;

export function Recognition() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchX = useRef<number | null>(null);

  const start = useCallback(() => {
    clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setSlide((s) => (s + 1) % awards.length), INTERVAL);
  }, []);

  useEffect(() => {
    if (paused) {
      clearInterval(timer.current);
      return;
    }
    start();
    return () => clearInterval(timer.current);
  }, [start, paused]);

  const go = (i: number) => {
    setSlide((i + awards.length) % awards.length);
    if (!paused) start();
  };

  return (
    <section className="recog container" aria-roledescription="carousel" aria-label="Recognition">
      <div className="recog__head">
        <div className="shead shead--left">
          <h2 className="shead__title rv">
            <span className="shead__line">Recognised by Sri Lanka&apos;s</span>
            <span className="shead__line grad">startup community</span>
          </h2>
        </div>
        <div className="recog__nav">
          <button type="button" className="recog__arrow" onClick={() => go(slide - 1)} aria-label="Previous award">
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="recog__arrow recog__arrow--next live"
            onClick={() => go(slide + 1)}
            aria-label="Next award"
          >
            <ArrowRight color="#fff" />
          </button>
        </div>
      </div>

      <div
        className="recog__frame rv"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > SWIPE) go(slide + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="slides" style={{ transform: `translateX(${-slide * 100}%)` }} aria-live={paused ? "polite" : "off"}>
          {awards.map((a, i) => (
            <div
              className="slide"
              key={a.tag}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${awards.length}`}
              aria-hidden={i !== slide}
            >
              <div className="ph awph">[Event photo]</div>
              <div className="awtext">
                <div className="awtext__meta">
                  <span className="awtext__title">{a.title}</span>
                  <span className="awtext__date">[Date]</span>
                </div>
                <h3 className="awtext__tag">{a.tag}</h3>
                <p className="awtext__line">{a.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recog__dots">
        {awards.map((a, i) => (
          <button
            type="button"
            key={a.tag}
            onClick={() => go(i)}
            aria-label={`Show ${a.tag}`}
            aria-current={i === slide}
            className="recog__dot"
          >
            <span className={i === slide ? "on" : undefined} />
          </button>
        ))}
      </div>
    </section>
  );
}
