import Image from "next/image";
import { platforms } from "../platforms";
import { SectionHead } from "../SectionHead";

const bills = [
  { name: "Electricity", icon: "M13 2L4 14h7l-1 8 9-12h-7z" },
  { name: "Water", icon: "M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" },
  { name: "Phone and internet", icon: "M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0M12 19.5h.01" },
];

const BARS = 20;
const FILLED = 18;

export function Reads() {
  return (
    <section id="reads" className="reads container">
      <SectionHead lines={["Your income and your bills.", <span className="grad" key="g">One score.</span>]} />

      <div className="rflow">
        <div className="flow__inputs">
          <div className="flow__card rv">
            <div className="flow__head">
              <span className="flow__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
                  <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                </svg>
              </span>
              <div>
                <h3 className="flow__title">Income</h3>
                <p className="flow__sub">Where you get paid</p>
              </div>
            </div>
            <ul className="flow__logos">
              {platforms.map((p) => (
                <li key={p.name} className="flow__logo">
                  {p.wordmark ? (
                    <Image src={p.logo} alt={p.name} width={52} height={52} />
                  ) : (
                    <>
                      <Image src={p.logo} alt="" width={24} height={24} />
                      <span style={{ color: p.color }}>{p.name}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flow__plus" aria-hidden="true">
            +
          </div>

          <div className="flow__card rv">
            <div className="flow__head">
              <span className="flow__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <div>
                <h3 className="flow__title">Reliability</h3>
                <p className="flow__sub">Bills you pay on time</p>
              </div>
            </div>
            <ul className="flow__bills">
              {bills.map((b) => (
                <li key={b.name} className="flow__bill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
                    <path d={b.icon} />
                  </svg>
                  {b.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flow__link" aria-hidden="true">
          <svg className="flow__wide" viewBox="0 0 120 400" preserveAspectRatio="none">
            <path className="flow" d="M0 100 C 60 100 60 200 116 200 M0 300 C 60 300 60 200 116 200" fill="none" stroke="#3976D2" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="flow__narrow" width="24" height="40" viewBox="0 0 24 40">
            <path className="flow" d="M12 0 V 34" fill="none" stroke="#3976D2" strokeWidth="2" />
            <path d="M5 28l7 8 7-8" fill="none" stroke="#3976D2" strokeWidth="2" />
          </svg>
        </div>

        <div className="flow__score live rv">
          <div className="flow__scorelabel">Your Settl Score</div>
          <div className="flow__scorerow">
            <span className="flow__number">829</span>
            <span className="flow__pill">Excellent</span>
          </div>
          <div className="flow__meter" aria-hidden="true">
            {Array.from({ length: BARS }, (_, i) => (
              <span key={i} className={i < FILLED ? "on" : undefined} />
            ))}
          </div>
          <p className="flow__caption">One score a lender can read.</p>
        </div>
      </div>
    </section>
  );
}
