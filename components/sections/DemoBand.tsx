import { DemoButton } from "../CtaButtons";

export function DemoBand() {
  return (
    <section className="demoband container">
      <div className="band rv live">
        <div className="band__dots" aria-hidden="true" />
        <div className="band__copy">
          <h2 className="band__title">See Settl working.</h2>
          <p className="band__text">
            Settl is live today. Book a 15-minute walkthrough and we&apos;ll take a profile from sign-up to score in
            front of you.
          </p>
        </div>
        <DemoButton className="band__cta" />
      </div>
    </section>
  );
}
