import { create, type StateCreator } from "zustand";
import { eventsSlice, type EventsSlice } from "~/store/slices/events";
import { modalSlice, type ModalSlice } from "~/store/slices/modal";
import { userSlice, type UserSlice } from "~/store/slices/user";
import {
  createRegisterSlice,
  type RegisterSlice,
} from "~/store/slices/register";

export const useBoundStore = create<
  RegisterSlice & UserSlice & ModalSlice & EventsSlice
>()((...a) => ({
  ...createRegisterSlice(...a),
  ...userSlice(...a),
  ...modalSlice(...a),
  ...eventsSlice(...a),
}));
