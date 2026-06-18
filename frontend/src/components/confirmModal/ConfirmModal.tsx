import RegularButton from "../buttons/regularButton/RegularButton";
import { type ReactNode } from "react";
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

  size?: "sm" | "md" | "lg";
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
  size,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className={`confirm-modal-content confirm-modal-${size}`}>
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
          {onCancel && (
            <RegularButton
            label={cancelText}
            color={`${colorCancel ?? "red"}`}
            size="sm"
            onClick={onCancel}
          />
          )}
        </div>
      </div>
    </div>
  );
}
