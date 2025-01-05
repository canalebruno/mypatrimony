import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (b: boolean) => void;
  children: ReactNode;
}

export default function Modal({
  children,
  modalIsOpen,
  setModalIsOpen,
}: ModalProps) {
  return (
    <>
      {modalIsOpen && (
        <div className={styles.modalWrapper}>
          <div
            className={styles.modalBackground}
            onClick={() => setModalIsOpen(false)}
          />
          {children}
        </div>
      )}
    </>
  );
}
