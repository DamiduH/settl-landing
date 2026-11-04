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
                <Image src="/logos/linkedin-svgrepo-com.svg" alt="" width={20} height={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
