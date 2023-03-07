import { type FieldErrors, type FieldValues } from "react-hook-form";

export default function ErrorText({
  helperText,
  errors,
  id,
}: {
  helperText?: string;
  errors: FieldErrors<FieldValues>;
  id: string;
}) {
  return (
    <div className="mt-1">
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {errors[id] && (
        <span className="text-sm text-red-500">
          {String(errors[id]?.message)}
        </span>
      )}
    </div>
  );
}
