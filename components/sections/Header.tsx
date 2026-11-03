import { WaitlistButton } from "../CtaButtons";
import { Logo } from "../Logo";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__row u">
        <a href="#" aria-label="Settl home" className="site-header__home">
          <Logo height={32} decorative />
        </a>
        <nav className="navlinks" aria-label="Main">
          <a className="navl" href="#how">How it works</a>
          <a className="navl" href="#faq">FAQ</a>
          <a className="navl" href="#team">Team</a>
        </nav>
        <WaitlistButton className="navcta" compact />
      </div>
    </header>
  );
}
