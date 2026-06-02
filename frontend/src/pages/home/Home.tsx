import "./home.css";
import { HeroSection } from "./heroSection/HeroSection";
import Layout from "../../components/layout/Layout";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Layout>
        <h2>Välkommen till min hemsida</h2>
      </Layout>
    </>
  );
}
