import { type StateCreator } from "zustand";

import { type Modal } from "types";

interface ModalSlice {
  modal: Modal;
  setModal: (modal: Modal) => void;
}

const modalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
  modal: {
    isOpen: false,
    bodyType: "",
    size: "",
    extraObject: null,
    title: "",
  },
  setModal: (modal: Modal) => {
    set((state) => ({
      ...state,
      modal,
    }));
  },
});

export { modalSlice, type ModalSlice };
