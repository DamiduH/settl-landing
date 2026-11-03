type IconProps = { size?: number };

export function ArrowRight({ size = 18, color = "#004FBC" }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0F1B3D" strokeWidth="2.2" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Play({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#004FBC" aria-hidden="true">
      <path d="M7 4l13 8-13 8z" />
    </svg>
  );
}

export function Check({ size = 18, color = "#004FBC", weight = 2.4 }: IconProps & { color?: string; weight?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={weight} aria-hidden="true">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function Cross({ size = 18, color = "#0F1B3D", weight = 2.2 }: IconProps & { color?: string; weight?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={weight} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
