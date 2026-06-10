import "./linkButton.css";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  label: string;
  color: string;
  size: string;
  href: string;
};

export default function LinkButton({
  label,
  color,
  size,
  href,
}: LinkButtonProps) {
  return (
    <Link className={`link-button ${color} ${size}`} to={href}>
      {label}
    </Link>
  );
}
