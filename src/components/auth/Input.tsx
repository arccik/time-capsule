import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  label: string;
};

export default function Input({ register, error, label }: Props) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={
          label === "Password"
            ? "password"
            : label === "Email"
            ? "email"
            : "text"
        }
        {...register}
        className={
          `input-bordered input ` + (error ? "border border-red-500" : "")
        }
      />
      {error && (
        <label className="label-text-alt  text-red-500">{error.message}</label>
      )}
    </div>
  );
}
