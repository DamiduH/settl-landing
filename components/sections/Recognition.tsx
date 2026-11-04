"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import ideasprintPhoto from "@/public/images/Ideasprint.jpeg";
import codefestPhoto from "@/public/images/codefest.png";
import hackxPhoto from "@/public/images/hackX.png";
import { ArrowLeft, ArrowRight } from "../icons";

const awards: { tag: string; title: string; line: string; photo?: StaticImageData }[] = [
  { tag: "Ideasprint 2026", title: "1st runners-up", line: "Where Settl was first pitched.", photo: ideasprintPhoto },
  { tag: "SLIIT Codefest", title: "Finalist", line: "Finalist at Cisco Technopreneur challenge", photo: codefestPhoto },
  { tag: "hackX 11.0", title: "Finalist", line: "Finalists at Sri Lanka's biggest hackathon.", photo: hackxPhoto },
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

  const move = (direction: number) => {
    setSlide((current) => (current + direction + awards.length) % awards.length);
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
          if (Math.abs(dx) > SWIPE) move(dx < 0 ? 1 : -1);
        }}
        onTouchCancel={() => { touchX.current = null; setPaused(false); }}
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
              <div className="ph awph">
                {a.photo ? (
                  <Image
                    src={a.photo}
                    alt={`The Settl team at ${a.tag}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 90vw, 580px"
                    placeholder="blur"
                    className="awph__image"
                  />
                ) : "[Event photo]"}
              </div>
              <div className="awtext">
                <div className="awtext__meta">
                  <span className="awtext__title">{a.title}</span>
                </div>
                <h3 className="awtext__tag">{a.tag}</h3>
                <p className="awtext__line">{a.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recog__nav">
        <button type="button" className="recog__arrow" onClick={() => move(-1)} aria-label="Previous award">
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="recog__arrow recog__arrow--next live"
          onClick={() => move(1)}
          aria-label="Next award"
        >
          <ArrowRight color="#fff" />
        </button>
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
