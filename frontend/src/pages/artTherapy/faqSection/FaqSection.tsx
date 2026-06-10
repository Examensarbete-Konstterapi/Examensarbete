// import "./faqSection.css";
import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Behöver jag kunna måla eller rita?",
    answer:
      "Absolut inte! Konstterapi handlar inte om att skapa bra konst. Det är processen som är viktig.",
  },
  {
    question: "Hur lång är en session?",
    answer: "En session är vanligtvis 60–90 minuter lång beroende på upplägg.",
  },
  {
    question: "Vad händer med det jag skapar?",
    answer:
      "Allt du skapar är ditt. Du kan ta hem det eller lämna det om du önskar.",
  },
  {
    question: "Hur många sessioner behöver jag?",
    answer:
      "Det varierar från person till person. Vi utvärderar regelbundet tillsammans.",
  },
];

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <h2>Vanliga frågor</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <article key={index} className="faq-item">
            <button
              className="faq-button"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span>{openFaq === index ? "−" : "+"}</span>
            </button>

            {openFaq === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
