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

export function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="faq__band">
        <div className="container">
          <SectionHead lines={[<>Questions, <span className="grad">answered.</span></>]} />
          <div className="faq__list">
            {faqs.map((f) => (
              <details className="faq__item rv" key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <span className="pl" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
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
