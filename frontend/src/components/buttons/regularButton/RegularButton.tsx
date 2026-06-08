import "./regularButton.css";

type RegularButtonProps = {
  onClick?: () => void;
  label: string;
  color: string;
  size: string;
  type?: "button" | "submit" | "reset";
};

export default function RegularButton({
  onClick,
  label,
  color,
  size,
  type,
}: RegularButtonProps) {
  return (
    <button
      className={`regular-button ${color} ${size}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
