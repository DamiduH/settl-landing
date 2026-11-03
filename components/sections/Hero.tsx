import { DemoButton, WaitlistButton } from "../CtaButtons";
import { HeroStage } from "../HeroStage";
import { Header } from "./Header";
import { MacWindow } from "./MacWindow";
import { PlatformStrip } from "./PlatformStrip";

export function Hero() {
  return (
    <HeroStage>
      <Header />

      <div className="herotext">
        <p className="eyebrow u" style={{ animationDelay: ".2s" }}>
          <span className="eyebrow__dot" aria-hidden="true" />
          The credit score for freelancers
        </p>
        <h1>
          <span className="u" style={{ display: "block", animationDelay: ".3s" }}>
            Your work adds up.
          </span>
          <span className="u" style={{ display: "block", animationDelay: ".45s" }}>
            <span className="grad">Settl makes it count.</span>
          </span>
        </h1>
        <div className="herotext__ctas u" style={{ animationDelay: ".65s" }}>
          <WaitlistButton className="btn--lg" />
          <DemoButton className="btn--lg" />
        </div>
      </div>

      <MacWindow />
      <PlatformStrip />
    </HeroStage>
  );
}
