import "./home.css";
import { HeroSection } from "./heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import IntroductionCards from "./introductionCards/IntroductionCards";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Layout>
        <IntroductionCards />
      </Layout>
    </>
  );
}
