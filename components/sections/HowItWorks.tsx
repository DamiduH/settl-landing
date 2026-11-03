import Image from "next/image";
import { Check } from "../icons";
import { Logo } from "../Logo";
import { SectionHead } from "../SectionHead";

const sources = [
  { name: "PayPal", logo: "/logos/paypal.svg", kind: "Income" },
  { name: "Payoneer", logo: "/logos/payoneer.svg", kind: "Income" },
  { name: "Electricity", icon: "M13 2L4 14h7l-1 8 9-12h-7z", kind: "Bill" },
];

/** Six months of income, rising with normal ups and downs (illustrative). */
const points = [
  [0, 108],
  [60, 92],
  [120, 98],
  [180, 70],
  [240, 60],
  [300, 34],
];
const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const area = `${line} L300 140 L0 140 Z`;

function ConnectVisual() {
  return (
    <div className="vis vis--connect">
      {sources.map((s, i) => (
        <div className="vis__row" key={s.name} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
          <span className="vis__logo">
            {s.logo ? (
              <Image src={s.logo} alt="" width={22} height={22} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
                <path d={s.icon} />
              </svg>
            )}
          </span>
          <span className="vis__name">
            {s.name}
            <small>{s.kind}</small>
          </span>
          <span className="vis__ok">
            <Check size={14} color="#fff" weight={3} />
          </span>
        </div>
      ))}
    </div>
  );
}

function TrackVisual() {
  return (
    <div className="vis vis--track">
      <div className="vis__charthead">
        <span>Monthly income</span>
        <span className="vis__up">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
            <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
          </svg>
          Tracked
        </span>
      </div>
      <svg className="vis__chart" viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="howArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3976D2" stopOpacity=".35" />
            <stop offset="1" stopColor="#3976D2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[35, 70, 105].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#DCE7FA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path className="vis__area" d={area} fill="url(#howArea)" />
        <path className="vis__line" d={line} pathLength={1} fill="none" stroke="#004FC5" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div className="vis__months" aria-hidden="true">
        {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function ScoreVisual() {
  return (
    <div className="vis vis--score">
      <div className="vis__scorecard">
        <div className="vis__scorelabel">Settl Score</div>
        <div className="vis__scorerow">
          <span className="vis__number">829</span>
          <span className="vis__grade">Excellent</span>
        </div>
      </div>
      <div className="vis__id">
        <Logo height={14} decorative />
        <span className="vis__idcode">STL-2026-2F2CF0</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a1 1 0 011-1h10" />
        </svg>
      </div>
    </div>
  );
}

const steps = [
  { t: "Connect", d: "Link where you get paid and the bills you pay.", v: <ConnectVisual /> },
  { t: "Track", d: "Settl follows your income and payments month by month.", v: <TrackVisual /> },
  { t: "Score and share", d: "Get one Settl Score. Share your Settl ID with a lender.", v: <ScoreVisual /> },
];

export function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="how__band">
        <div className="container">
          <SectionHead lines={["Three steps.", <span className="grad" key="g">A few minutes.</span>]} />

          <ol className="how__grid">
            {steps.map((s, i) => (
              <li key={s.t} className="hstep rv">
                <div className="hstep__visual">{s.v}</div>
                <div className="hstep__body">
                  <div className="hstep__top">
                    <span className="hstep__num">{i + 1}</span>
                    <h3 className="hstep__title">{s.t}</h3>
                  </div>
                  <p className="hstep__desc">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
