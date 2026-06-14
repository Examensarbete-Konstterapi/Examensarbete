import LinkButton from "../buttons/linkButton/LinkButton";
import "./ctaSection.css";

interface CTAProps {
  title: string;
  text: string;
  btnLabel: string;
  href: string;
}

export default function CTASection({ title, text, btnLabel, href }: CTAProps) {
  return (
    <section className="ctaSection">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <LinkButton label={btnLabel} color="green" size="sm" href={href} />
      </div>
    </section>
  );
}
