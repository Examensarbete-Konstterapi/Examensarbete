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
          icon={
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6 12H18M18 12L13 7M18 12L13 17"
                  stroke="#597059"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          }
        />
      </div>
      <div className="about-me-img">
        <img src={portrait} alt="Porträtt" />
      </div>
    </section>
  );
}
