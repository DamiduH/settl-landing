import { Check, Cross } from "../icons";
import { SectionHead } from "../SectionHead";

const asks = ["A payslip", "An employer letter", "EPF records"];
const haves = [
  "Steady payments from clients abroad",
  "Repeat clients and strong reviews",
  "Years of bills paid on time",
];

export function Problem() {
  return (
    <section className="problem container">
      <SectionHead
        eyebrow="The problem"
        title="The loan form asks for a payslip. You don't have one."
        lead="Your income is real. It just doesn't fit the boxes."
      />
      <div className="problem__grid">
        <div className="problem__card rv">
          <div className="problem__label">The form asks for</div>
          <ul className="problem__list">
            {asks.map((q) => (
              <li key={q} className="problem__item problem__item--ask">
                <span className="problem__mark">
                  <Cross size={12} color="#9AA5BF" weight={3} />
                </span>
                <s>{q}</s>
              </li>
            ))}
          </ul>
        </div>
        <div className="problem__card problem__card--have rv live">
          <div className="problem__label">You actually have</div>
          <ul className="problem__list">
            {haves.map((h) => (
              <li key={h} className="problem__item problem__item--have">
                <span className="problem__mark">
                  <Check size={14} color="#fff" weight={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className="problem__foot">Settl reads what you actually have.</div>
        </div>
      </div>
    </section>
  );
}
