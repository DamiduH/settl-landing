import { BrandDefs } from "@/components/BrandDefs";
import { ModalProvider } from "@/components/ModalProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Recognition } from "@/components/sections/Recognition";

export default function Home() {
  return (
    <ModalProvider>
      <div className="page">
        <BrandDefs />
        <Hero />
        <Recognition />
      </div>
      <RevealObserver />
    </ModalProvider>
  );
}
