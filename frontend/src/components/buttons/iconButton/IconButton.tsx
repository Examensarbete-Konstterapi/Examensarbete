import "./iconButton.css";

type IconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

export default function IconButton({ onClick, icon, label, active }: IconButtonProps) {
  return (
    <button 
      className={`icon-button ${active ? "active" : ""}`}
      onClick={onClick}>
      {icon}
      {label}
    </button>
  )
};
