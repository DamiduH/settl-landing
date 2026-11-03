"use client";

import { ArrowRight, Play } from "./icons";
import { useModal } from "./ModalProvider";

type CtaProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function WaitlistButton({ className = "", style, compact = false }: CtaProps & { compact?: boolean }) {
  const { open } = useModal();
  return (
    <button type="button" className={`btn ${className}`.trim()} style={style} onClick={() => open("waitlist")}>
      Join the waitlist
      <span className="ar" style={compact ? { width: 36, height: 36 } : undefined}>
        <ArrowRight size={compact ? 16 : 18} />
      </span>
    </button>
  );
}

export function DemoButton({ className = "", style }: CtaProps) {
  const { open } = useModal();
  return (
    <button type="button" className={`btn2 ${className}`.trim()} style={style} onClick={() => open("demo")}>
      <span className="pi">
        <Play />
      </span>
      Book a demo
    </button>
  );
}
