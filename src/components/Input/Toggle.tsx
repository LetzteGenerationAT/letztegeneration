import { useFormContext, type RegisterOptions } from "react-hook-form";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";
import ErrorText from "~/components/Typography/ErrorText";

export type CheckboxProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  defaultValue?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

export default function Checkbox({
  label,
  placeholder = "",
  helperText,
  id,
  readOnly = false,
  validation,
  defaultValue,
  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control w-full">
      <div className="flex items-center">
        <label className="label cursor-pointer" htmlFor={id}>
          <span className="label-text text-base-content">{label}</span>
        </label>
        <input
          className="toggle"
          {...register(id, validation)}
          {...rest}
          type="checkbox"
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-describedby={id}
          checked={defaultValue}
        />
      </div>
      {errors[id] && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon className="text-xl text-red-500" />
        </div>
      )}
      <ErrorText helperText={helperText} errors={errors} id={id} />
    </div>
  );
}
