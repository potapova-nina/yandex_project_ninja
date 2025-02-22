import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div>
       <ModalOverlay onClose={onClose} />
   
    <div className={styles.modal}>
     
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {title && <p className="text text_type_main-medium">{title} </p>}
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <div >
          {children}
          </div>
      </div>
    </div>
    </div>,
    modalRoot
  );
   
};

export default Modal;
