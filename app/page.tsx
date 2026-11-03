import { BrandDefs } from "@/components/BrandDefs";
import { ModalProvider } from "@/components/ModalProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { DataTrust } from "@/components/sections/DataTrust";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { Reads } from "@/components/sections/Reads";
import { Recognition } from "@/components/sections/Recognition";

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
        <DataTrust />
      </div>
      <RevealObserver />
    </ModalProvider>
  );
}
