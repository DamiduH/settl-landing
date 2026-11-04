import { DemoButton } from "../CtaButtons";

export function DemoBand() {
  return (
    <section className="demoband container">
      <div className="band rv live">
        <div className="band__dots" aria-hidden="true" />
        <div className="band__copy">
          <h2 className="band__title">See a score built, start to finish.</h2>
          <p className="band__text">
            A 15-minute walkthrough for lenders and partners, from sign-up to Settl Score.
          </p>
        </div>
        <DemoButton className="band__cta" />
      </div>
    </section>
  );
}
