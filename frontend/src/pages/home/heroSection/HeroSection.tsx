import "./heroSection.css";
import LinkButton from "../../../components/buttons/linkButton/LinkButton";

export function HeroSection() {
  return (
    <section className="hero-section">
      <img
        src="/public/hero.jpg"
        alt="Hero Image"
        className="hero-image"
      />
      <div>
        <h1>Jessickas konstterapi</h1>
        <p>
          Kreativitet som läkande kraft
        </p>
        <LinkButton
          href="/boka-tid"
          label="Boka en session"
          color="light"
          size="sm" />
      </div>
    </section>
  );
}
