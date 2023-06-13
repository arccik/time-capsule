import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import type { Capsule } from "~/types/capsule";

type Props = {
  register: UseFormRegisterReturn<"message">;
  errors: FieldErrors<Capsule>;
};

export default function MessageArea({ register, errors }: Props) {
  return (
    <>
      <textarea
        id="messageField"
        {...register}
        placeholder="Write something that will make you smile"
        rows={7}
        className={`textarea-bordered textarea textarea-lg w-full drop-shadow-lg  focus:border-blue-800  ${
          errors.message ? "textarea-secondary text-secondary " : ""
        }`}
      ></textarea>

      {errors.message && (
        <p className="text-sx text-right leading-tight text-red-600">
          {errors.message?.message}
        </p>
      )}
    </>
  );
}
