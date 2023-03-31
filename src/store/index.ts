import { create } from "zustand";
import { eventsSlice, type EventsSlice } from "~/store/slices/event";
import { modalSlice, type ModalSlice } from "~/store/slices/modal";
import { userSlice, type UserSlice } from "~/store/slices/user";
import { registerSlice, type RegisterSlice } from "~/store/slices/register";

export const useBoundStore = create<
  RegisterSlice & UserSlice & ModalSlice & EventsSlice
>()((...a) => ({
  ...registerSlice(...a),
  ...userSlice(...a),
  ...modalSlice(...a),
  ...eventsSlice(...a),
}));
