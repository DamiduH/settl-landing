"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "../icons";

const awards = [
  { tag: "Ideasprint 2026", title: "1st runners-up", line: "Where Settl was first pitched." },
  { tag: "SLIIT Codefest", title: "Finalist", line: "[One line about Codefest]" },
  { tag: "Intelicon 2026", title: "Finalist", line: "[One line about Intelicon]" },
];

const INTERVAL = 5000;

export function Recognition() {
  const [slide, setSlide] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setSlide((s) => (s + 1) % awards.length), INTERVAL);
  }, []);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const go = (i: number) => {
    setSlide((i + awards.length) % awards.length);
    start();
  };

  return (
    <section className="recog container" aria-roledescription="carousel" aria-label="Recognition">
      <div className="recog__head">
        <h2 className="recog__title rv">Recognised by Sri Lanka&apos;s startup community</h2>
        <div className="recog__nav">
          <button type="button" className="recog__arrow" onClick={() => go(slide - 1)} aria-label="Previous">
            <ArrowLeft />
          </button>
          <button type="button" className="recog__arrow recog__arrow--next live" onClick={() => go(slide + 1)} aria-label="Next">
            <ArrowRight color="#fff" />
          </button>
        </div>
      </div>

      <div className="recog__frame">
        <div className="slides" style={{ transform: `translateX(${-slide * 100}%)` }} aria-live="polite">
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
