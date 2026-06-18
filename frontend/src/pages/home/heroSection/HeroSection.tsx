import "./heroSection.css";
import LinkButton from "../../../components/buttons/linkButton/LinkButton";

export function HeroSection() {
  return (
    <section className="hero-section">
      <img src="/hero.jpg" alt="Hero Image" className="hero-image" />
      <div>
        <h1>Jessickas konstterapi</h1>
        <p className="hero-section-creativity-text">Kreativitet som läkande kraft</p>
        <p>Utforska dina känslor och tankar genom konstens uttryck. Tillsammans skapar vi en trygg plats för personlig utveckling och läkning.</p>
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
