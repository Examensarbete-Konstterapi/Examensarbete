import "./card.css";

type CardProps = {
  svg: React.ReactNode;
  title: string;
  description: string;
};

export default function Card({ title, description, svg }: CardProps) {
  return (
    <article className="introduction-card">
      <div className="icon">{svg}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
