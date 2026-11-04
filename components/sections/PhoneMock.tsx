import { Logo } from "../Logo";

const BARS = 16;
const FILLED = 14;
const income = [52, 64, 58, 76, 70, 88];

/** The Settl app on a phone, drawn in code so it stays crisp at any size. */
export function PhoneMock() {
  return (
    <div className="phone rv" role="img" aria-label="The Settl app on a phone, showing a Settl Score of 829, rated Excellent">
      <div className="phone__screen" aria-hidden="true">
        <div className="phone__status">
          <span>9:41</span>
          <span className="phone__island" />
          <span className="phone__icons">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="phone__app">
          <div className="phone__top">
            <Logo height={18} decorative />
            <span className="phone__avatar">AR</span>
          </div>
          <div className="phone__title">Credit Score Insights</div>

          <div className="phone__score">
            <div className="phone__label">Your Settl Score</div>
            <div className="phone__scorerow">
              <span className="phone__number">829</span>
              <span className="phone__grade">Excellent</span>
            </div>
            <div className="phone__meter">
              {Array.from({ length: BARS }, (_, i) => (
                <span key={i} className={i < FILLED ? "on" : undefined} />
              ))}
            </div>
            <div className="phone__range">
              <span>350</span>
              <span>850</span>
            </div>
          </div>

          <div className="phone__card phone__id">
            <div>
              <div className="phone__small">Your Settl ID</div>
              <div className="phone__code">STL-2026-2F2CF0</div>
            </div>
            <span className="phone__copy">Copy</span>
          </div>

          <div className="phone__card phone__income">
            <div className="phone__cardhead">
              <span>Monthly income</span>
              <span className="phone__up">+18%</span>
            </div>
            <div className="phone__bars">
              {income.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
