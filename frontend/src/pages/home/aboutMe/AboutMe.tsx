import LinkButton from "../../../components/buttons/linkButton/LinkButton";
import portrait from "../../../assets/portratt.jpg";
import "./aboutMe.css";

export default function AboutMe() {
  return (
    <section className="home-about-me-section">
      <div className="about-me-text">
        <h2>Om Jessicka</h2>
        <p>
          Som konstterapeut brinner jag för att hjälpa människor att hitta
          läkning och förståelse genom kreativt uttryck. Med en bakgrund inom
          både psykologi och konst kombinerar jag dessa världar för att skapa en
          unik terapeutisk upplevelse. Min filosofi bygger på övertygelsen att
          varje människa har en inneboende kreativ kraft som kan användas för
          personlig utveckling och förändring.
        </p>
        <LinkButton
          href="/om-mig"
          label="Läs mer om mig"
          color="transparent"
          size="xxs"
        />
      </div>
      <div className="about-me-img">
        <img src={portrait} alt="Porträtt" />
      </div>
    </section>
  );
}
