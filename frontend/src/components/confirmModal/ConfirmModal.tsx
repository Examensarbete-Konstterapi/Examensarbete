import RegularButton from "../buttons/regularButton/RegularButton";
import "./confirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "OK",
  cancelText = "Avbryt",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="confirm-modal-buttons">
          <RegularButton
            label={confirmText}
            color="green"
            size="sm"
            onClick={onConfirm}
          />
          <RegularButton
            label={cancelText}
            color="red"
            size="sm"
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  );
}
