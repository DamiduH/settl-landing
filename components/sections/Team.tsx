import Image, { type StaticImageData } from "next/image";
import damidu from "@/public/images/team/damidu.jpg";
import randesh from "@/public/images/team/randesh.jpg";
import shehan from "@/public/images/team/shehan.jpg";
import { SectionHead } from "../SectionHead";

type Member = { n: string; r: string; photo: StaticImageData; linkedin: string };

const team: Member[] = [
  {
    n: "Damidu Herath",
    r: "Business and Market Research",
    photo: damidu,
    linkedin: "https://www.linkedin.com/in/damidu-herath-867106288/",
  },
  {
    n: "Randesh Daluwatte",
    r: "Strategy and Governance",
    photo: randesh,
    linkedin: "https://www.linkedin.com/in/randesh-daluwatte-7737972b1/",
  },
  {
    n: "Shehan Nimsara",
    r: "Technology and Product",
    photo: shehan,
    linkedin: "https://www.linkedin.com/in/shehan-nimsara-824753213/",
  },
];

export function Team() {
  return (
    <section id="team" className="team container">
      <SectionHead
        lines={[<>The people behind <span className="grad">Settl</span></>]}
        lead="We're building the score we wished existed."
      />
      <div className="team__grid">
        {team.map((m) => (
          <div className="team__card rv" key={m.n}>
            <Image
              src={m.photo}
              alt={`Portrait of ${m.n}`}
              placeholder="blur"
              sizes="(max-width: 640px) 72px, (max-width: 900px) 50vw, 380px"
              className="team__photo"
            />
            <div className="team__meta">
              <div>
                <h3 className="team__name">{m.n}</h3>
                <div className="team__role">{m.r}</div>
              </div>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.n} on LinkedIn (opens in a new tab)`}
                className="team__link"
              >
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
