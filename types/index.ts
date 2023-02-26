import {
  type Path,
  type UseControllerProps,
  type UseFormRegister,
} from "react-hook-form";

export type User =
  | {
      isActive: string;
      possibleSupportRoles: string;
      pronouns: string;
      protestDegree: string;
      region: string;
      email: string;
      email_verified: boolean;
      family_name: string;
      given_name: string;
      phone_number: string;
      phone_number_verified: boolean;
      sub: string;
    }
  | null
  | "SIGNUP";

export type StepOneData = {
  email: string;
  password: string;
  phone_number: string;
};

export type StepTwoData = {
  given_name: string;
  family_name: string;
  region: string;
  pronouns: string;
};

export type StepThreeData = {
  protestDegree: string;
  possibleSupportRoles: string;
  isActive: string;
};

export type ConfirmData = {
  phone_number: string;
  code: string;
};

export type LoginData = {
  phone_number: string;
  password: string;
};

export type RegisterFormData = StepOneData &
  StepTwoData &
  StepThreeData &
  ConfirmData;

export type RegisterProps = {
  password: string;
  email: string;
  given_name: string;
  family_name: string;
  region: string;
  possibleSupportRoles: string;
  phone_number: string;
};

export interface RegisterFormValues {
  "Telefon Nummer": string;
  "E-Mail": string;
  Passwort: string;
}

export interface TextInputProps extends UseControllerProps {
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "tel"
    | "url"
    | "search"
    | "color"
    | undefined;
  label: Path<RegisterFormValues>;
  name: string;
  error: string;
  register: UseFormRegister<RegisterFormData>;
  containerStyle?: string;
  labelStyle?: string;
  placeholder?: string;
  validation?: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}
