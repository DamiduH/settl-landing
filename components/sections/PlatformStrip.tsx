import Image from "next/image";
import { platforms } from "../platforms";

function Tiles({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__set" aria-hidden={hidden || undefined}>
      {/* Two passes per set so the loop stays full on wide screens */}
      {[0, 1].flatMap((pass) =>
        platforms.map((p) => (
          <li className="mtile" key={`${pass}-${p.name}`}>
            {p.wordmark ? (
              <Image src={p.logo} alt={hidden || pass ? "" : p.name} width={60} height={60} className="mtile__mark" />
            ) : (
              <>
                <Image src={p.logo} alt="" width={28} height={28} />
                <span style={{ color: p.color }}>{p.name}</span>
              </>
            )}
          </li>
        )),
      )}
    </ul>
  );
}

/** Endless, seamless logo marquee. Pauses on hover; static with reduced motion. */
export function PlatformStrip() {
  return (
    <div className="platforms u" style={{ animationDelay: ".8s" }}>
      <p className="platforms__label">Scores income from the platforms you already use</p>
      <div className="marquee">
        <div className="marquee__track">
          <Tiles />
          <Tiles hidden />
        </div>
      </div>
    </div>
  );
}
