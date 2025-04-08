import { create } from "zustand";

type ModalType = "deleteModal";

type Store = {
    isOpen: boolean;
    type: ModalType | null;
    onOpen: (type: ModalType, onSubmit?: () => void) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export const useModalHook = create<Store>((set) => ({
    isOpen: false,
    type: null,
    onSubmit: () => {},
    onOpen: (type, onSubmit) => set({ type, isOpen: true, onSubmit: onSubmit }),
    onClose: () => set({ isOpen: false, type: null, onSubmit: () => {} }),
}));
