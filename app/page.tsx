import { BrandDefs } from "@/components/BrandDefs";
import { ModalProvider } from "@/components/ModalProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
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
      </div>
      <RevealObserver />
    </ModalProvider>
  );
}
