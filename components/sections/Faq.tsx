import { SectionHead } from "../SectionHead";

type Qa = { q: string; a: string };

const left: Qa[] = [
  {
    q: "Is Settl a lender?",
    a: "No. Settl gives you a credit score. We never lend money or approve loans. The lender makes its own decision.",
  },
  { q: "How much does it cost?", a: "Nothing. Freelancers never pay. Lenders pay when they check a score." },
  {
    q: "What do I need to join the waitlist?",
    a: "Just your name and contact details. We won't ask for any account access until you create your score.",
  },
];

const right: Qa[] = [
  {
    q: "Who can see my score?",
    a: "Only a lender you share your Settl ID with. They see the score, not your transactions.",
  },
  { q: "Does Settl replace CRIB?", a: "No. A lender can look at your Settl Score alongside your CRIB report." },
  {
    q: "When can I use my score with a lender?",
    a: "We're bringing on our first lending partners now. Join the waitlist and you'll be the first to know.",
  },
];

function Column({ items }: { items: Qa[] }) {
  return (
    <div className="faq__col">
      {items.map((f) => (
        <details className="faq__item rv" key={f.q}>
          <summary>
            <span>{f.q}</span>
            <span className="pl" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="faq__band">
        <div className="container">
          <SectionHead lines={[<>Questions, <span className="grad">answered.</span></>]} />
          <div className="faq__grid">
            <Column items={left} />
            <Column items={right} />
          </div>
        </div>
      </div>
    </section>
  );
}
