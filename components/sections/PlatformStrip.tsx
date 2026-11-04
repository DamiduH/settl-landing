import Image from "next/image";
import { platforms } from "../platforms";

/** Four passes per set so the loop stays full on wide screens. */
const PASSES = 4;

function Logos({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__set" aria-hidden={hidden || undefined}>
      {Array.from({ length: PASSES }).flatMap((_, pass) =>
        platforms.map((p) => {
          const announce = !hidden && pass === 0;
          return (
            <li className="plogo" key={`${pass}-${p.name}`}>
              {p.wordmark ? (
                <Image src={p.logo} alt={announce ? p.name : ""} width={64} height={64} className="plogo__word" />
              ) : (
                <>
                  <Image src={p.logo} alt="" width={26} height={26} />
                  <span style={{ color: p.color }} aria-hidden={!announce || undefined}>
                    {p.name}
                  </span>
                </>
              )}
            </li>
          );
        }),
      )}
    </ul>
  );
}

/** Endless logo marquee, just the marks with no tiles. Pauses on hover; static with reduced motion. */
export function PlatformStrip() {
  return (
    <div className="platforms u" style={{ animationDelay: ".7s" }}>
      <p className="platforms__label">Reads income from the platforms you already use</p>
      <div className="marquee">
        <div className="marquee__track">
          <Logos />
          <Logos hidden />
        </div>
      </div>
    </div>
  );
}
