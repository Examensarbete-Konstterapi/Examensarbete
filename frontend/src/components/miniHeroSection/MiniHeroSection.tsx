import "./miniHeroSection.css";
import LinkButton from "../buttons/linkButton/LinkButton";

export function MiniHeroSection() {
  return (
    <section className="mini-hero-section">
      <img src="/hero.jpg" alt="Hero Image" className="mini-hero-image" />
      <div>
        <h1>Jessickas konstterapi</h1>
        {/* <p>Kreativitet som läkande kraft</p> */}
        <LinkButton
          href="/boka-tid"
          label="Boka en session"
          color="green"
          size="sm"
        />
      </div>
    </section>
  );
}
