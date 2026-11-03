"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import cropId from "@/public/images/crop-id.jpg";
import cropScore from "@/public/images/crop-score.jpg";
import cropSources from "@/public/images/crop-sources.jpg";

type Step = { t: string; d: string; img: StaticImageData; alt: string; maxHeight?: number };

const steps: Step[] = [
  {
    t: "Connect where you earn.",
    d: "Link your income streams, then connect your expense streams to show your reliability.",
    img: cropSources,
    alt: "Connected income sources in the Settl app",
    maxHeight: 400,
  },
  {
    t: "Get your Settl Score.",
    d: "Your income and reliability become one score a lender can read.",
    img: cropScore,
    alt: "A Settl Score of 829 in the Settl app",
  },
  {
    t: "Share it when you apply.",
    d: "Give your Settl ID to a lender that accepts Settl scores. They see your score, never your transactions. The lender makes the decision.",
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
        <div className="how__intro">
          <div className="how__eyebrow rv">How it works</div>
          <h2 className="how__title rv">Three steps. A few minutes.</h2>
        </div>
        <div className="how__row">
          <div className="how__steps">
            {steps.map((s, i) => {
              const on = i === step;
              return (
                <button
                  type="button"
                  key={s.t}
                  className={on ? "step on" : "step"}
                  onClick={() => go(i)}
                  aria-expanded={on}
                >
                  <div className="step__row">
                    <span className="num">0{i + 1}</span>
                    <div className="step__body">
                      <div className="step__title">{s.t}</div>
                      {on && (
                        <>
                          <p className="step__desc">{s.d}</p>
                          <div className="step__track">
                            <div className="bar" key={step} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="how__visual">
            <div className="stack">
              {steps.map((s, i) => (
                <div className={i === step ? "crop on" : "crop"} key={s.t} aria-hidden={i !== step}>
                  <Image
                    src={s.img}
                    alt={s.alt}
                    sizes="(max-width: 900px) 90vw, 640px"
                    style={s.maxHeight ? { maxHeight: s.maxHeight } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
