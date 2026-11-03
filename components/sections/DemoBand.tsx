import { DemoButton } from "../CtaButtons";

export function DemoBand() {
  return (
    <section className="demoband container">
      <div className="band rv live">
        <div className="band__dots" aria-hidden="true" />
        <div className="band__copy">
          <h2 className="band__title">See Settl working.</h2>
          <p className="band__text">
            Book a 15-minute walkthrough, from sign-up to score.
          </p>
        </div>
        <DemoButton className="band__cta" />
      </div>
    </section>
  );
}
