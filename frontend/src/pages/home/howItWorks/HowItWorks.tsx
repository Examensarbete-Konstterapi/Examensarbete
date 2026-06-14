import "./howItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <article className="steps">
        <div className="step">
          <p>1</p>
        </div>
        <h3>Boka ett första samtal</h3>
        <p>
          Vi börjar med ett kostnadsfritt samtal där vi diskuterar dina behov
          och förväntningar.
        </p>
      </article>
      <article className="steps">
        <div className="step">
          <p>2</p>
        </div>
        <h3>Utforska genom skapande</h3>
        <p>
          I sessionerna använder vi olika konstnärliga tekniker som passar just
          dig.
        </p>
      </article>
      <article className="steps">
        <div className="step">
          <p>3</p>
        </div>
        <h3>Reflektion och utveckling</h3>
        <p>
          Tillsammans reflekterar vi över ditt skapande och vad det säger om din
          inre värld.
        </p>
      </article>
    </section>
  );
}
