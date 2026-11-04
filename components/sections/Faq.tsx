"use client";

import { useId, useState } from "react";
import { SectionHead } from "../SectionHead";

type Qa = { q: string; a: string };

const faqs: Qa[] = [
  {
    q: "Is Settl a lender?",
    a: "No. Settl gives you a credit score. We never lend money or approve loans. The lender makes its own decision.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing for freelancers. Lenders pay when they check a score.",
  },
  {
    q: "Who can see my score?",
    a: "Only a lender you share your Settl ID with. They see your score, never your transactions.",
  },
  {
    q: "Does Settl replace CRIB?",
    a: "No, it works alongside it. A lender can read your Settl Score next to your CRIB report.",
  },
  {
    q: "What do I need to join the waitlist?",
    a: "Just your name and contact details. We won't ask for any account access until you create your score.",
  },
  {
    q: "When can I use my score with a lender?",
    a: "We're bringing on our first lending partners now. Join the waitlist and you'll hear the moment one goes live.",
  },
];

function FaqItem({ q, a }: Qa) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="faq__item rv" data-open={open}>
      <h3 className="faq__question">
        <button
          type="button"
          className="faq__trigger"
          id={`${id}-question`}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{q}</span>
          <span className="pl" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="faq__answer"
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        inert={!open}
      >
        <div className="faq__answer-inner"><p>{a}</p></div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="faq__band">
        <div className="container">
          <SectionHead lines={[<>Questions, <span className="grad">answered.</span></>]} />
          <div className="faq__list">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
          <p className="faq__more rv">
            Something else on your mind? Email us at{" "}
            <a href="mailto:randeshdaluwatte@gmail.com">randeshdaluwatte@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
