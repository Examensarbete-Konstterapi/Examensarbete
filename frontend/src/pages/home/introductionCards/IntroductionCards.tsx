import "./introductionCards.css";
import Card from "./Card";

export default function IntroductionCards() {
  return (
    <section className="introduction-cards">
      <Card
        title="Konst som uttryck"
        description="Ingen konstnärlig erfarenhet krävs. Konsten blir ett verktyg för att utforska och uttrycka det som ord inte räcker till."
      />
      <Card
        title="Trygg process"
        description="I en varm och icke-dömande miljö får du möjlighet att vara dig själv och utforska i din egen takt."
      />
      <Card
        title="Individuell utveckling"
        description="Varje session anpassas efter dina unika behov och mål. Din resa är din egen och jag är här för att stötta dig."
      />
    </section>
  );
}
