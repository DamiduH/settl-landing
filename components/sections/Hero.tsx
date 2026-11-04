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
          <span className="herotext__lead u" style={{ animationDelay: ".2s" }}>
            Your work adds up.
          </span>
          <span className="herotext__main u" style={{ animationDelay: ".32s" }}>
            <span className="grad">Settl makes it count.</span>
          </span>
        </h1>
        <p className="herotext__sub u" style={{ animationDelay: ".45s" }}>
          Settl turns your freelance income and the bills you pay on time into a credit score lenders can read. No
          payslip needed.
        </p>
        <div className="herotext__ctas u" style={{ animationDelay: ".58s" }}>
          <WaitlistButton className="btn--lg" />
          <DemoButton className="btn--lg herotext__demo" />
        </div>
      </div>

      <PlatformStrip />
      <MacWindow />
    </HeroStage>
  );
}
