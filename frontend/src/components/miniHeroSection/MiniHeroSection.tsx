import "./miniHeroSection.css";

export function MiniHeroSection() {
  return (
    <section className="mini-hero-section">
      <img src="/hero.jpg" alt="Hero Image" className="mini-hero-image" />
      <div>
        <h1>Mina sidor</h1>
        <p>Välkommen, Andréa Stålstierna!</p>
      </div>
    </section>
  );
}
