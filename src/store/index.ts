import { create, type StateCreator } from "zustand";

import {
  type StepOneData,
  type StepThreeData,
  type StepTwoData,
  type User,
} from "types";

type setRegisterDataType =
  | { step: "stepOne"; data: StepOneData }
  | { step: "stepTwo"; data: StepTwoData }
  | { step: "stepThree"; data: StepThreeData };

interface RegisterSlice {
  stepOne: StepOneData | null;
  stepTwo: StepTwoData | null;
  stepThree: StepThreeData | null;
  setRegisterData: ({ step, data }: setRegisterDataType) => void;
}

const createRegisterSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = (set) => ({
  stepOne: null,
  stepTwo: null,
  stepThree: null,
  setRegisterData: ({ step, data }: setRegisterDataType) => {
    set((state: RegisterSlice) => ({
      ...state,
      [step]: data,
    }));
  },
});

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

export const useBoundStore = create<RegisterSlice & UserSlice>()((...a) => ({
  ...createRegisterSlice(...a),
  ...userSlice(...a),
}));
