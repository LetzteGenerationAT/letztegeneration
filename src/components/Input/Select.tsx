// import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";

import { type RegisterOptions, useFormContext } from "react-hook-form";

// import { Children, cloneElement, isValidElement } from 'react'
import ErrorText from "../Typography/ErrorText";

export type SelectProps = {
  label?: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"select">;

export default function Select({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  ...rest
}: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Add disabled and selected attribute to option, will be used if readonly
  // const readOnlyChildren = Children.map<React.ReactNode, React.ReactNode>(
  //   children,
  //   (child) => {
  //     if (isValidElement(child)) {
  //       return cloneElement(child, {
  //         disabled: child.props.value !== rest?.defaultValue,
  //         // selected: child.props.value === rest?.defaultValue,
  //       })
  //     }
  //   }
  // )

  return (
    <div className="inline-block w-full">
      {label && (
        <label className="label" htmlFor={id}>
          <div className="label-text">
            {label}
            {/* {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )} */}
          </div>
        </label>
      )}
      <div className="relative">
        <select
          className={`${
            readOnly ? "bg-gray-100" : ""
          }  select-bordered select w-full`}
          {...register(id, validation)}
          defaultValue=""
          {...rest}
          name={id}
          id={id}
          aria-describedby={id}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {/* {readOnly ? readOnlyChildren : children} */}
          {children}
        </select>
        {errors[id] && (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="text-xl text-red-500" />
            </div>
            <ErrorText helperText={helperText} errors={errors} id={id} />
          </>
        )}
      </div>
    </div>
  );
}
