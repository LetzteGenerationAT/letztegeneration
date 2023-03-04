import { useFormContext, type RegisterOptions } from "react-hook-form";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";
import FunnelIcon from "@heroicons/react/24/solid/FunnelIcon";
import ErrorText from "~/components/Typography/ErrorText";

export type InputProps = {
  label?: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  buttonType: "submit" | "button";
  readOnly?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  placeholder = "",
  helperText,
  id,
  type = "text",
  buttonType,
  readOnly = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label" htmlFor={id}>
          <span className="label-text text-base-content">{label}</span>
        </label>
      )}
      <div className="input-group">
        <input
          className="input-bordered input w-full"
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-describedby={id}
        />
        <button className="btn-square btn" type={buttonType}>
          <FunnelIcon className="h-5 w-5" />
        </button>
      </div>
      {errors[id] && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="text-xl text-red-500" />
          </div>
          <ErrorText helperText={helperText} errors={errors} id={id} />
        </>
      )}
    </div>
  );
}
