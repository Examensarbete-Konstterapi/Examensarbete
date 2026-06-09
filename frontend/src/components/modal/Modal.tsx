import { type ReactNode } from "react";
import "./modal.css";
import CloseButton from "../buttons/closeButton/CloseButton";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <div className="modal-body">
        {children}
        </div>
      </div>
    </div>
  );
}
