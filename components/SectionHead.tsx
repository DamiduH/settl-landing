type SectionHeadProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
};

/** Eyebrow pill, heading and an optional one-line lead. */
export function SectionHead({ eyebrow, title, lead, align = "center" }: SectionHeadProps) {
  return (
    <div className={`shead shead--${align}`}>
      <p className="eyebrow rv">{eyebrow}</p>
      <h2 className="shead__title rv">{title}</h2>
      {lead && <p className="shead__lead rv">{lead}</p>}
    </div>
  );
}
