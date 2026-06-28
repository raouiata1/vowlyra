import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AnnouncementBar from "@/components/AnnouncementBar";

const UGCCarousel = dynamic(() => import("@/components/UGCCarousel"));
const Demo = dynamic(() => import("@/components/Demo"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav wiggle />
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
