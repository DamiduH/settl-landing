import Image from "next/image";
import { platforms } from "../platforms";

const bills = [
  { name: "Electricity", icon: "M13 2L4 14h7l-1 8 9-12h-7z" },
  { name: "Water", icon: "M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" },
  { name: "Phone and internet", icon: "M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0M12 19.5h.01" },
];

export function Reads() {
  return (
    <section id="reads" className="reads container">
      <div className="reads__intro">
        <h2 className="section-title rv">What Settl reads</h2>
        <p className="section-lead rv">
          Your income from the platforms you work on. Your reliability from the bills you pay.
        </p>
      </div>
      <div className="reads__row">
        <div className="reads__panel reads__panel--income rv">
          <div className="reads__label">Income platforms</div>
          <div className="reads__grid">
            {platforms.map((p) =>
              p.wordmark ? (
                <div className="src src--mark" key={p.name}>
                  <Image src={p.logo} alt={p.name} width={56} height={56} className="src__wordmark" />
                </div>
              ) : (
                <div className="src" key={p.name}>
                  <Image src={p.logo} alt="" width={30} height={30} className="src__logo" />
                  <span style={{ color: p.color }}>{p.name}</span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="reads__panel reads__panel--bills rv">
          <div className="reads__label">Bills</div>
          <div className="reads__stack">
            {bills.map((b) => (
              <div className="src src--bill" key={b.name}>
                <span className="src__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
                    <path d={b.icon} />
                  </svg>
                </span>
                {b.name}
              </div>
            ))}
          </div>
        </div>
        <div className="reads__panel reads__panel--score rv live">
          <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="flow"
              d="M0 10 C 80 10 100 30 200 30 M0 50 C 80 50 100 30 200 30"
              fill="none"
              stroke="#ABCFFF"
              strokeWidth="2"
            />
          </svg>
          <div>
            <div className="reads__together">Together they become</div>
            <div className="reads__score">One Settl Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}
