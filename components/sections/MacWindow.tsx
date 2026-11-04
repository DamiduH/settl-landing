import Image from "next/image";
import heroApp from "@/public/images/hero-app.jpg";
import { Check } from "../icons";

function FloatNote({
  side,
  top,
  bobDelay,
  popDelay,
  icon,
  title,
  sub,
}: {
  side: "left" | "right";
  top: string;
  bobDelay: string;
  popDelay: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className="bob float"
      aria-hidden="true"
      style={{ [side]: -6, top, animationDelay: bobDelay }}
    >
      <div className="float__card" style={{ animationDelay: popDelay }}>
        <span className="float__icon">{icon}</span>
        <div>
          <div className="float__title">{title}</div>
          <div className="float__sub">{sub}</div>
        </div>
      </div>
    </div>
  );
}

export function MacWindow() {
  return (
    <div className="macwrap">
      <div className="mac">
        <div className="mac__bar">
          <span className="mac__light" style={{ background: "#FF5F57" }} />
          <span className="mac__light" style={{ background: "#FEBC2E" }} />
          <span className="mac__light" style={{ background: "#28C840" }} />
          <div className="mac__url">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6A7694" strokeWidth="2.4" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
            settl
          </div>
          <span style={{ width: 52 }} />
        </div>
        <Image
          src={heroApp}
          alt="The Settl app showing a Settl Score of 829, rated Excellent"
          priority
          placeholder="blur"
          sizes="(max-width: 1080px) 100vw, 1040px"
          className="mac__shot"
        />
      </div>

      <FloatNote
        side="left"
        top="30%"
        bobDelay=".6s"
        popDelay="2s"
        icon={<Check />}
        title="PayPal and Payoneer linked"
        sub="12 months of income read"
      />
      <FloatNote
        side="right"
        top="62%"
        bobDelay="2s"
        popDelay="2.3s"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004FBC" strokeWidth="2.2">
            <rect x="3" y="5" width="18" height="15" rx="3" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
        }
        title="Electricity bill paid"
        sub="On time, 14 months running"
      />
    </div>
  );
}
