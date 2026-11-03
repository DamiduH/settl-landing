"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import cropId from "@/public/images/crop-id.jpg";
import cropScore from "@/public/images/crop-score.jpg";
import cropSources from "@/public/images/crop-sources.jpg";
import { SectionHead } from "../SectionHead";

type Step = { t: string; d: string; img: StaticImageData; alt: string };

const steps: Step[] = [
  {
    t: "Connect",
    d: "Link the platforms you get paid on and the bills you pay.",
    img: cropSources,
    alt: "Connected income sources in the Settl app",
  },
  {
    t: "Get your score",
    d: "Settl turns them into one Settl Score.",
    img: cropScore,
    alt: "A Settl Score of 829 in the Settl app",
  },
  {
    t: "Share your Settl ID",
    d: "The lender sees your score, never your transactions.",
    img: cropId,
    alt: "The Settl ID a freelancer gives to lenders",
  },
];

const INTERVAL = 6000;

export function HowItWorks() {
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setStep((s) => (s + 1) % steps.length), INTERVAL);
  }, []);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const go = (i: number) => {
    setStep(i);
    start();
  };

  return (
    <section id="how" className="how">
      <div className="container">
        <SectionHead eyebrow="How it works" title="Three steps. A few minutes." />

        <ol className="how__grid">
          {steps.map((s, i) => {
            const on = i === step;
            return (
              <li key={s.t} className={on ? "hstep on rv" : "hstep rv"} onMouseEnter={() => go(i)}>
                <button type="button" className="hstep__hit" onClick={() => go(i)} aria-pressed={on}>
                  <span className="sr-only">Show step {i + 1}</span>
                </button>
                <div className="hstep__shot">
                  <Image src={s.img} alt={s.alt} sizes="(max-width: 900px) 90vw, 380px" />
                </div>
                <div className="hstep__body">
                  <div className="hstep__top">
                    <span className="hstep__num">{i + 1}</span>
                    <h3 className="hstep__title">{s.t}</h3>
                  </div>
                  <p className="hstep__desc">{s.d}</p>
                  <div className="hstep__track" aria-hidden="true">
                    {on && <div className="bar" key={step} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
