import { BrandDefs } from "@/components/BrandDefs";
import { ModalProvider } from "@/components/ModalProvider";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <ModalProvider>
      <div className="page">
        <BrandDefs />
        <Hero />
      </div>
    </ModalProvider>
  );
}
