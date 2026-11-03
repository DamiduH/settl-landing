import { DemoButton, WaitlistButton } from "../CtaButtons";
import { Logo } from "../Logo";

export function Closing() {
  return (
    <section className="closing">
      <div className="aurora closing__aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="dots closing__dots" aria-hidden="true" />
      <div className="closing__inner">
        <div className="closing__logo rv">
          <Logo height={48} />
        </div>
        <h2 className="closing__title rv">
          <span className="grad">Ready to make your work count?</span>
        </h2>
        <p className="closing__text rv">
          Join the waitlist and be first in line when lenders start accepting Settl scores.
        </p>
        <div className="closing__ctas rv">
          <WaitlistButton />
          <DemoButton />
        </div>
      </div>
      <footer className="footer">
        <div className="footer__bar">
          <span className="footer__brand">
            <Logo height={22} />
            by Division Zero
          </span>
          <a href="mailto:randeshdaluwatte@gmail.com">randeshdaluwatte@gmail.com</a>
          <span>© 2026 Division Zero</span>
          <span className="footer__note">Settl is a credit scoring service, not a lender.</span>
        </div>
      </footer>
    </section>
  );
}
