import RegularButton from "../buttons/regularButton/RegularButton";
import "./confirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  colorCancel?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  children,
  confirmText = "OK",
  cancelText = "Avbryt",
  onConfirm,
  onCancel,
  colorCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal-content">
        <h2>{title}</h2>
        {message && <p>{message}</p>}

        {children}

        <div className="confirm-modal-buttons">
          <RegularButton
            label={confirmText}
            color="green"
            size="sm"
            onClick={onConfirm}
          />
          <RegularButton
            label={cancelText}
            color={`${colorCancel ?? "red"}`}
            size="sm"
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  );
}
