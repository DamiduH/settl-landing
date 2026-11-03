import Image from "next/image";
import { platforms } from "../platforms";

export function PlatformStrip() {
  return (
    <div className="platforms">
      <div className="platforms__label rv">Scores income from the platforms you already use</div>
      <div className="platforms__row rv">
        {platforms.map((p) =>
          p.wordmark ? (
            <span className="lg" key={p.name}>
              <Image src={p.logo} alt={p.name} width={64} height={64} style={{ margin: "-17px 0" }} />
            </span>
          ) : (
            <span className="lg" key={p.name}>
              <Image src={p.logo} alt="" width={30} height={30} />
              <span style={{ color: p.color }}>{p.name}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
