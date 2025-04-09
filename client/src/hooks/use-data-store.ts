import { ScheduleType } from "@/lib/validation";
import { create } from "zustand";

type ModalType = "appointmentModal";

type DataType = { id: string; data: ScheduleType };

type Store = {
    isOpen: boolean;
    type: ModalType | null;
    data: DataType | null;
    onOpen: (type: ModalType, data: DataType, onSubmit?: () => void) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export const useDataStore = create<Store>((set) => ({
    isOpen: false,
    type: null,
    data: null,
    onSubmit: () => {},
    onOpen: (type, data, onSubmit) =>
        set({ type, isOpen: true, data, onSubmit: onSubmit }),
    onClose: () =>
        set({ isOpen: false, type: null, data: null, onSubmit: () => {} }),
}));
