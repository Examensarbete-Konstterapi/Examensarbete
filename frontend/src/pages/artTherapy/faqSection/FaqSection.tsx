import "./faqSection.css";
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
              <h3>{faq.question}</h3>
              <svg
                className={`faq-arrow ${openFaq === index ? "open" : ""}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                  fill="currentColor"
                />
              </svg>
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
