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
          <span className="u" style={{ display: "block", animationDelay: ".3s" }}>
            Your work adds up.
          </span>
          <span className="u" style={{ display: "block", animationDelay: ".5s", paddingBottom: ".08em" }}>
            <span className="grad">Settl makes it count.</span>
          </span>
        </h1>
        <p className="herotext__sub u" style={{ animationDelay: ".7s" }}>
          Settl turns your alternative income and the reliability you&apos;ve already shown into a credit
          score lenders can read. No payslip needed.
        </p>
        <div className="herotext__ctas u" style={{ animationDelay: ".85s" }}>
          <WaitlistButton />
          <DemoButton />
        </div>
        <p className="herotext__note u" style={{ animationDelay: "1s" }}>
          Free for freelancers. Settl is a credit score, not a lender.
        </p>
      </div>

      <MacWindow />
      <PlatformStrip />
    </HeroStage>
  );
}
