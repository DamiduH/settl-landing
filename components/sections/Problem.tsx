import { Check, Cross } from "../icons";
import { SectionHead } from "../SectionHead";

const haves = [
  "Steady payments from clients abroad",
  "Repeat clients and strong reviews",
  "Years of bills paid on time",
];

/** Monthly income shape for the illustration (relative heights, not real data). */
const months = [
  { m: "May", h: 58 },
  { m: "Jun", h: 72 },
  { m: "Jul", h: 64 },
  { m: "Aug", h: 84 },
  { m: "Sep", h: 78 },
  { m: "Oct", h: 96 },
];

function Upload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
    </svg>
  );
}

export function Problem() {
  return (
    <section className="problem">
      <div className="problem__band">
        <div className="problem__dots" aria-hidden="true" />
        <div className="container problem__inner">
          <SectionHead
            tone="dark"
            lines={[
              <>
                The loan form asks for a <mark className="hl">payslip</mark>.
              </>,
              <span className="shead__soft" key="s">
                You don&apos;t have one.
              </span>,
            ]}
            lead="Your income is real. It just doesn't fit the boxes a bank expects."
          />

          <div className="problem__grid">
            {/* The bank's form: every box assumes an employer */}
            <div className="loanform rv" aria-label="A loan application asking for a payslip, an employer letter and EPF records">
              <div className="loanform__head">
                <span className="loanform__title">Loan application</span>
                <span className="loanform__step">Step 2 of 3</span>
              </div>

              <div className="loanform__field loanform__field--flag">
                <div className="loanform__label">
                  Payslip <span className="loanform__req">Required</span>
                </div>
                <div className="loanform__drop">
                  <Upload />
                  No payslip to upload
                </div>
              </div>

              <div className="loanform__field">
                <div className="loanform__label">
                  Employer letter <span className="loanform__req">Required</span>
                </div>
                <div className="loanform__input loanform__input--empty">
                  <Cross size={14} color="#D64545" weight={2.6} />
                  No employer
                </div>
              </div>

              <div className="loanform__field loanform__field--extra">
                <div className="loanform__label">
                  EPF records <span className="loanform__req">Required</span>
                </div>
                <div className="loanform__input loanform__input--empty">
                  <Cross size={14} color="#D64545" weight={2.6} />
                  Not on EPF
                </div>
              </div>

              <div className="loanform__status">
                <Cross size={16} color="#fff" weight={2.8} />
                Application can&apos;t continue
              </div>
            </div>

            {/* What the freelancer really has */}
            <div className="have rv">
              <div className="have__top">
                <div>
                  <div className="have__label">What you do have</div>
                  <div className="have__title">Income every month</div>
                </div>
                <span className="have__trend">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                  </svg>
                </span>
              </div>
              <div className="have__chart" aria-hidden="true">
                {months.map((x, i) => (
                  <div className="have__col" key={x.m}>
                    <span className="have__bar" style={{ height: `${x.h}%`, animationDelay: `${0.15 + i * 0.08}s` }} />
                    <span className="have__month">{x.m}</span>
                  </div>
                ))}
              </div>
              <ul className="have__list">
                {haves.map((h) => (
                  <li key={h}>
                    <span className="have__check">
                      <Check size={13} color="#004FBC" weight={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="have__foot">Settl scores this instead.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
