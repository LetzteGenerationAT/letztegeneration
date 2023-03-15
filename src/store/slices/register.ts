import { type StateCreator } from "zustand";

import { type StepOneData, type StepThreeData, type StepTwoData } from "types";

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

const registerSlice: StateCreator<RegisterSlice, [], [], RegisterSlice> = (
  set
) => ({
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

export { registerSlice, type RegisterSlice };
