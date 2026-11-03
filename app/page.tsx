import { BrandDefs } from "@/components/BrandDefs";
import { Modal } from "@/components/Modal";
import { ModalProvider } from "@/components/ModalProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Closing } from "@/components/sections/Closing";
import { DemoBand } from "@/components/sections/DemoBand";
import { Faq } from "@/components/sections/Faq";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { Reads } from "@/components/sections/Reads";
import { Recognition } from "@/components/sections/Recognition";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <ModalProvider>
      <div className="page">
        <BrandDefs />
        <Hero />
        <Recognition />
        <Problem />
        <Reads />
        <HowItWorks />
        <DemoBand />
        <Faq />
        <Team />
        <Closing />
      </div>
      <Modal />
      <RevealObserver />
      <SmoothScroll />
    </ModalProvider>
  );
}
