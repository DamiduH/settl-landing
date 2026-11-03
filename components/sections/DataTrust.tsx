const trust = [
  {
    t: "You choose what to connect.",
    d: "Nothing is pulled without your sign-in.",
    icon: "M9 12l2 2 4-4M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z",
  },
  {
    t: "Lenders see a score, not your statements.",
    d: "Your transactions stay with Settl.",
    icon: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    t: "You decide who sees it.",
    d: "Only a lender you give your Settl ID to can check your score.",
    icon: "M15 7a3 3 0 11-6 0 3 3 0 016 0zM5 21v-2a5 5 0 0110 0v2M17 11l2 2 4-4",
  },
  {
    t: "Free for you.",
    d: "Freelancers never pay for a Settl Score.",
    icon: "M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7S10 2 7.5 3.5 9 7 12 7zm0 0s2-5 4.5-3.5S15 7 12 7z",
  },
];

export function DataTrust() {
  return (
    <section className="trust container">
      <h2 className="section-title trust__title rv">Your data stays yours.</h2>
      <div className="trust__grid">
        {trust.map((t) => (
          <div className="trust__card rv lift" key={t.t}>
            <div className="trust__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2" aria-hidden="true">
                <path d={t.icon} />
              </svg>
            </div>
            <h3 className="trust__heading">{t.t}</h3>
            <p className="trust__text">{t.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
