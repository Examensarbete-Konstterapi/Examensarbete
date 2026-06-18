import "./regularButton.css";

type RegularButtonProps = {
  onClick?: () => void;
  label: string;
  color: string;
  size: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function RegularButton({
  onClick,
  label,
  color,
  size,
  type,
  disabled,
}: RegularButtonProps) {
  return (
    <button
      className={`regular-button ${color} ${size} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
