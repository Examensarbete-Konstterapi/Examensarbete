import "./artTherapy.css";
import Layout from "../../components/layout/Layout";
import { MiniHeroSection } from "../../components/miniHeroSection/MiniHeroSection";
// import LinkButton from "../../components/buttons/linkButton/LinkButton";
import { FAQSection } from "./faqSection/FaqSection";
import CTASection from "../../components/CTASection/CTASection";

export function ArtTherapy() {
  return (
    <>
      <MiniHeroSection
        title="Konstterapi"
        subtitle="En terapiform där kreativitet och självuttryck blir verktyg för läkning och utveckling"
      />
      <Layout>
        <main className="art-therapy-page">
          <section className="art-therapy-intro">
            <h2>Vad är konstterapi?</h2>

            <p>
              Konstterapi är en terapiform som använder kreativa processer för
              att främja läkning, självförståelse och personlig utveckling.
            </p>

            <p>
              Genom att skapa konst – måla, teckna, skulptera eller använda
              andra material – får du tillgång till känslor och tankar som kan
              vara svåra att sätta ord på.
            </p>

            <p>
              I en trygg och stödjande miljö får du utforska ditt inre landskap
              genom skapande. Konsten blir ett språk som kompletterar ord och
              öppnar nya vägar till insikt och förändring.
            </p>
          </section>

          <section className="therapy-process">
            <h2>Hur går en session till?</h2>

            <div className="therapy-process-cards">
              <article className="therapy-card">
                <div className="therapy-icon">🕒</div>
                <h3>Incheckning</h3>
                <p>
                  Vi börjar med att prata om hur du mår och vad som är aktuellt
                  för dig just nu.
                </p>
              </article>

              <article className="therapy-card">
                <div className="therapy-icon">🎨</div>
                <h3>Skapande</h3>
                <p>
                  Du arbetar med konst utifrån det som känns rätt för dig. Jag
                  finns här som stöd.
                </p>
              </article>

              <article className="therapy-card">
                <div className="therapy-icon">💭</div>
                <h3>Reflektion</h3>
                <p>
                  Tillsammans utforskar vi vad som uppstod under skapandet och
                  vad det kan betyda.
                </p>
              </article>
            </div>
          </section>

          <section className="therapy-target-group">
            <h2>Vem är konstterapi för?</h2>

            <div className="therapy-benefits-grid">
              <article className="benefit-card">
                <h3>Stress & Utmattning</h3>
                <p>
                  Hitta vägar till avslappning och återhämtning genom kreativt
                  uttryck.
                </p>
              </article>

              <article className="benefit-card">
                <h3>Ångest & Depression</h3>
                <p>
                  Utforska känslor och tankar på ett sätt som känns säkert och
                  stödjande.
                </p>
              </article>

              <article className="benefit-card">
                <h3>Livskriser & Förändringar</h3>
                <p>
                  Bearbeta förlust, separation eller stora livsförändringar.
                </p>
              </article>

              <article className="benefit-card">
                <h3>Självutveckling</h3>
                <p>
                  Fördjupa självkännedom och utforska din kreativa potential.
                </p>
              </article>

              <article className="benefit-card">
                <h3>Relationer</h3>
                <p>Utforska relationsmönster och kommunikation på nya sätt.</p>
              </article>

              <article className="benefit-card">
                <h3>Trauma</h3>
                <p>
                  Bearbeta svåra upplevelser i din egen takt med traumamedveten
                  terapi.
                </p>
              </article>
            </div>
          </section>

          <FAQSection />
          <CTASection
            title="Redo att utforska konstterapi?"
            text="Boka ett kostnadsfritt första samtal så kan vi prata om dina behov
              och förväntningar."
            btnLabel="Boka tid"
            href="/boka-tid"
          />
        </main>
      </Layout>
    </>
  );
}
