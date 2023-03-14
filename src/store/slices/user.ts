import { type StateCreator } from "zustand";

import { type User } from "types";

interface UserSlice {
  user: User;
  //  remove the custom: prefix from each value
  setUserData: ({}: { user: User }) => void;
}

const userSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  setUserData: ({ user }: { user: User }) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
});

export { userSlice, type UserSlice };
