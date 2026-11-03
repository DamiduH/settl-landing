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
        <h1>
          <span className="herotext__lead u" style={{ animationDelay: ".3s" }}>
            Your work adds up.
          </span>
          <span className="herotext__main u" style={{ animationDelay: ".45s" }}>
            <span className="grad">Settl makes it count.</span>
          </span>
        </h1>
        <div className="herotext__ctas u" style={{ animationDelay: ".65s" }}>
          <WaitlistButton className="btn--lg" />
          <DemoButton className="btn--lg" />
        </div>
      </div>

      <PlatformStrip />
      <MacWindow />
    </HeroStage>
  );
}
