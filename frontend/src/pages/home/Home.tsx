import "./home.css";
import { HeroSection } from "./heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import IntroductionCards from "./introductionCards/IntroductionCards";
import AboutMe from "./aboutMe/AboutMe";
import CTASection from "../../components/CTASection/CTASection";
import HowItWorks from "./howItWorks/HowItWorks";
import GallerySection from "./gallerySection/GallerySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Layout>
        <IntroductionCards />
        <AboutMe />
        <HowItWorks />
        <GallerySection />
        <CTASection
          title="Redo att börja din kreativa resa?"
          text="Ta det första steget mot förändring och välbefinnande. Jag ser fram emot att möta dig."
          btnLabel="Boka tid"
          href="/boka-tid"
        />
      </Layout>
    </>
  );
}
