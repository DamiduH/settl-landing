import Image from "next/image";
import { platforms } from "../platforms";
import { SectionHead } from "../SectionHead";

/** Six months of income per platform, as relative bar heights (illustrative). */
const spark: Record<string, number[]> = {
  PayPal: [52, 64, 58, 76, 70, 88],
  Payoneer: [40, 46, 62, 58, 72, 80],
  Fiverr: [30, 44, 38, 50, 62, 58],
  Upwork: [60, 54, 70, 66, 78, 84],
  Wise: [34, 48, 44, 58, 54, 68],
};

const bills = [
  { name: "Electricity", icon: "M13 2L4 14h7l-1 8 9-12h-7z", late: [] as number[] },
  { name: "Water", icon: "M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z", late: [] },
  {
    name: "Phone and internet",
    icon: "M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0M12 19.5h.01",
    late: [3],
  },
];

const MONTHS = 12;
const BARS = 20;
const FILLED = 18;

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const onTime = bills.reduce((n, b) => n + MONTHS - b.late.length, 0);
const total = bills.length * MONTHS;

export function Reads() {
  return (
    <section id="reads" className="reads container">
      <SectionHead
        lines={["Your income and your bills.", <span className="grad" key="g">One score.</span>]}
        lead="Settl reads what you earn and how reliably you pay, then turns both into a single number a lender can trust."
      />

      <div className="rflow">
        <div className="flow__inputs">
          <div className="flow__card rv">
            <div className="flow__head">
              <span className="flow__icon">
                <Icon d="M3 17l6-6 4 4 8-8M15 7h6v6" size={20} />
              </span>
              <div>
                <h3 className="flow__title">Income</h3>
                <p className="flow__sub">Where you get paid</p>
              </div>
              <span className="flow__aside">Last 6 months</span>
            </div>
            <ul className="flow__rows">
              {platforms.map((p) => (
                <li key={p.name} className="frow">
                  <span className="frow__brand">
                    {p.wordmark ? (
                      <Image src={p.logo} alt={p.name} width={52} height={52} className="frow__word" />
                    ) : (
                      <>
                        <Image src={p.logo} alt="" width={22} height={22} />
                        <span style={{ color: p.color }}>{p.name}</span>
                      </>
                    )}
                  </span>
                  <span className="frow__spark" aria-hidden="true">
                    {spark[p.name].map((h, i) => (
                      <i key={i} style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.05}s` }} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flow__card rv">
            <div className="flow__head">
              <span className="flow__icon">
                <Icon d="M4 12l5 5L20 6" size={20} />
              </span>
              <div>
                <h3 className="flow__title">Reliability</h3>
                <p className="flow__sub">Bills you pay on time</p>
              </div>
              <span className="flow__aside">Last 12 months</span>
            </div>
            <ul className="flow__rows">
              {bills.map((b) => (
                <li key={b.name} className="frow">
                  <span className="frow__bill">
                    <Icon d={b.icon} />
                    {b.name}
                  </span>
                  <span className="frow__streak" aria-label={`${MONTHS - b.late.length} of ${MONTHS} paid on time`}>
                    {Array.from({ length: MONTHS }, (_, i) => (
                      <i key={i} className={b.late.includes(i) ? "late" : undefined} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flow__total">
              <span className="flow__totalnum">
                {onTime}/{total}
              </span>
              payments on time
            </div>
          </div>
        </div>

        {/* Both inputs flow down into the score */}
        <svg className="flow__merge flow__merge--wide" viewBox="0 0 1000 96" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="flow"
            d="M250 0 C 250 56 500 40 500 92 M750 0 C 750 56 500 40 500 92"
            fill="none"
            stroke="#3976D2"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg className="flow__merge flow__merge--narrow" width="24" height="44" viewBox="0 0 24 44" aria-hidden="true">
          <path className="flow" d="M12 0 V 38" fill="none" stroke="#3976D2" strokeWidth="2" />
          <path d="M5 32l7 8 7-8" fill="none" stroke="#3976D2" strokeWidth="2" />
        </svg>

        <div className="flow__score live rv">
          <div className="flow__scoremain">
            <div className="flow__scorelabel">Your Settl Score</div>
            <div className="flow__scorerow">
              <span className="flow__number">829</span>
              <span className="flow__pill">Excellent</span>
            </div>
          </div>
          <div className="flow__scoreside">
            <div className="flow__meter" aria-hidden="true">
              {Array.from({ length: BARS }, (_, i) => (
                <span key={i} className={i < FILLED ? "on" : undefined} />
              ))}
            </div>
            <div className="flow__range" aria-hidden="true">
              <span>350</span>
              <span>850</span>
            </div>
            <p className="flow__caption">Ready to share with any lender you choose.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
