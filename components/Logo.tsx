type LogoProps = {
  height: number;
  light?: boolean;
  decorative?: boolean;
};

/** Animated Settl logo: bars build in, pulse, and flip on hover. */
export function Logo({ height, light = false, decorative = false }: LogoProps) {
  return (
    <svg
      className={light ? "slogo light" : "slogo"}
      viewBox="0 0 1166 499"
      style={{ height, width: "auto", display: "block" }}
      {...(decorative
        ? { "aria-hidden": true, focusable: false }
        : { role: "img", "aria-label": "Settl" })}
    >
      <polygon className="b b1" fill="url(#sgA)" points="0,123 73,140 73,365 0,378" />
      <polygon className="b b2" fill="url(#sgA)" points="123,68 227,106 227,398 123,438" />
      <polygon className="b b3" fill="url(#sgA)" points="277,0 413,104 413,398 277,498" />
      <use className="wm" href="#settl-wm" />
    </svg>
  );
}
