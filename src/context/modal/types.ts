import type { ModalType } from "../../components/common/Modals";

export type ModalKey = ModalType;

export interface ModalState {
  isOpen: boolean;
  data?: unknown;
}

export interface ModalContextType {
  modals: Record<ModalKey, ModalState>;
  openModal: (key: ModalKey, data?: unknown) => void;
  closeModal: (key: ModalKey) => () => void;
  isModalOpen: (key: ModalKey) => boolean;
  getModalData: (key: ModalKey) => unknown;
}
