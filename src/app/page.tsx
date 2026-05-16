import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UGCCarousel from "@/components/UGCCarousel";
import Demo from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <UGCCarousel />
        <Demo />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
