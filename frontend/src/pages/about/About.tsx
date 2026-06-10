import "./about.css";
import Layout from "../../components/layout/Layout";
import { MiniHeroSection } from "../../components/miniHeroSection/MiniHeroSection";
import LinkButton from "../../components/buttons/linkButton/LinkButton";
import portratt from "../../assets/portratt.jpg"

export function About() {
  return (
    <>
      <MiniHeroSection
        title="Om mig"
        subtitle="Välkommen! Jag är Jessicka, konstterapeut med passion för kreativ läkning och personlig utveckling."
      />
      <Layout>
         <main className="about-page">
          <section className="about-intro">
            <div className="about-image">
              <img
                src={portratt}
                alt="Jessicka konstterapeut"
              />
            </div>

            <div className="about-content">
              <h2>Min resa</h2>

              <p>
                Min väg till konstterapi började med en livslång passion för
                konst och en djup fascination för människans inre landskap.
              </p>

              <p>
                Genom min utbildning i konstterapi har jag fått verktyg att
                hjälpa andra att utforska sina känslor och tankar genom
                skapande.
              </p>

              <p>
                Idag driver jag min egen praktik där jag arbetar med människor i
                olika livssituationer. Varje session anpassas efter individens
                behov.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2>Min filosofi</h2>

            <p>
              Jag tror på att varje människa har en inneboende kreativ förmåga
              som kan användas för läkning och utveckling.
            </p>

            <p>
              Konsten behöver inte vara perfekt. Det viktiga är processen och
              vad den väcker inom dig.
            </p>
          </section>

          <section className="about-section">
            <h2>Utbildning & erfarenhet</h2>

            <div className="about-cards">
              <article className="about-card-pink">
                <h3>Konstterapeut</h3>
                <p>Svenska Konstterapeutföreningen</p>
              </article>

              <article className="about-card-green">
                <h3>Psykologi</h3>
                <p>Fördjupade studier inom psykologi och samtalsmetodik.</p>
              </article>

              <article className="about-card-green">
                <h3>Traumamedvetet arbete</h3>
                <p>Fortbildning inom trauma och återhämtning.</p>
              </article>

              <article className="about-card-pink">
                <h3>Handledning</h3>
                <p>Kontinuerlig professionell utveckling och handledning.</p>
              </article>
            </div>
          </section>

          <section className="about-section">
            <h2>Mina värderingar</h2>

            <div className="about-cards">
              <article className="about-card-green">
                <h3>Respekt</h3>
                <p>Varje människa har sin egen berättelse.</p>
              </article>

              <article className="about-card-pink">
                <h3>Trygghet</h3>
                <p>En säker plats för reflektion och utveckling.</p>
              </article>

              <article className="about-card-pink">
                <h3>Kreativitet</h3>
                <p>Skapande kan öppna nya vägar till förståelse.</p>
              </article>

              <article className="about-card-green">
                <h3>Helhet</h3>
                <p>Jag ser till hela människan.</p>
              </article>
            </div>
          </section>

          <section className="about-cta">
            <h2>Låt oss börja din resa tillsammans</h2>
            <p>
              Boka ett kostnadsfritt första samtal så kan vi prata om hur
              konstterapi kan hjälpa dig.
            </p>
            <LinkButton
              href="/boka-tid"
              label="Boka tid"
              color="green"
              size="sm"
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
