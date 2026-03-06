import { useState, type ReactNode } from "react";
import type { ModalKey, ModalState } from "./types";
import { ModalContext } from "./ModalContext";
import { Modals } from "../../components/common/Modals";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Record<ModalKey, ModalState>>({} as Record<ModalKey, ModalState>);

  const openModal = (key: ModalKey, data?: unknown) => {
    setModals((prev) => ({
      ...prev,
      [key]: { isOpen: true, data },
    }));
  };

  const closeModal = (key: ModalKey) => () => {
    setModals((prev) => ({
      ...prev,
      [key]: { isOpen: false },
    }));
  };

  const isModalOpen = (key: ModalKey) => !!modals[key]?.isOpen;
  const getModalData = (key: ModalKey) => modals[key]?.data;

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, isModalOpen, getModalData }}
    >
      <Modals />
      {children}
    </ModalContext.Provider>
  );
};
