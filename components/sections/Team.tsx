const team = [
  { n: "Randesh Daluwatte", r: "Strategy and Governance" },
  { n: "Damidu Herath", r: "Business and Market Research" },
  { n: "Shehan Nimsara", r: "Technology and Product" },
];

export function Team() {
  return (
    <section id="team" className="team container">
      <div className="team__intro">
        <h2 className="section-title rv">The people behind Settl</h2>
        <p className="section-lead team__lead rv">
          Settl started with a problem one of us ran into: real freelance income that a bank couldn&apos;t see.
          We&apos;re building the score we wished existed.
        </p>
      </div>
      <div className="team__grid">
        {team.map((m) => (
          <div className="team__card rv" key={m.n}>
            <div className="ph team__photo">[Photo]</div>
            <div className="team__meta">
              <div>
                <h3 className="team__name">{m.n}</h3>
                <div className="team__role">{m.r}</div>
              </div>
              <a href="#" aria-label={`${m.n} on LinkedIn`} className="team__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#004FBC" aria-hidden="true">
                  <path d="M6.5 8.5h-3V20h3V8.5zM5 4a1.75 1.75 0 100 3.5A1.75 1.75 0 005 4zm15 9.6c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-2.9 1.6V8.5h-3V20h3v-6.2c0-1.6.8-2.4 2-2.4s1.7.8 1.7 2.4V20h3v-6.4z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
