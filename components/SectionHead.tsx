type SectionHeadProps = {
  /** One sentence per line: pass each line as its own string or element. */
  lines: React.ReactNode[];
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

/** Section heading: one sentence per line, optional one-line lead. */
export function SectionHead({ lines, lead, align = "center", tone = "light" }: SectionHeadProps) {
  return (
    <div className={`shead shead--${align} shead--${tone}`}>
      <h2 className="shead__title rv">
        {lines.map((line, i) => (
          <span className="shead__line" key={i}>
            {line}
          </span>
        ))}
      </h2>
      {lead && <p className="shead__lead rv">{lead}</p>}
    </div>
  );
}
