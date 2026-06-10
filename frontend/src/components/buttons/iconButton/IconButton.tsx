import "./iconButton.css";

type IconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function IconButton({
  onClick,
  icon,
  label,
  active,
  type,
}: IconButtonProps) {
  return (
    <button
      className={`icon-button ${active ? "active" : ""}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      {label}
    </button>
  );
}
