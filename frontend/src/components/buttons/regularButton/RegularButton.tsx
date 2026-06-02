import "./regularButton.css";

type RegularButtonProps = {
  onClick: () => void;
  label: string;
  color: string;
  size: string;
};

export default function RegularButton({
  onClick,
  label,
  color,
  size,
}: RegularButtonProps) {
  return (
    <button className={`regular-button ${color} ${size}`} onClick={onClick}>
      {label}
    </button>
  );
}
