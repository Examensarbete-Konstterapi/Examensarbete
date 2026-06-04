import "./miniHeroSection.css";

type MiniHeroSectionProps = {
  title: string;
  subtitle: string;
};

export function MiniHeroSection({ title, subtitle }: MiniHeroSectionProps) {
  return (
    <section className="mini-hero-section">
      <img src="/hero.jpg" alt="Hero Image" className="mini-hero-image" />
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
