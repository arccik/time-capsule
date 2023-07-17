import type { FormProps } from "~/types/useFormProps";

export default function MessageArea({
  register,
  errors,
}: Pick<FormProps, "register" | "errors">) {
  return (
    <div className="relative h-full w-full">
      <textarea
        id="messageField"
        {...register("message")}
        placeholder="Write something emotional or what will make you smile"
        rows={7}
        className={`textarea-bordered textarea textarea-lg h-full w-full drop-shadow-lg  focus:border-blue-800  ${
          errors?.message ? "textarea-secondary text-secondary " : ""
        }`}
      />
      {errors?.message && (
        <p className="text-sx text-right leading-tight text-red-600">
          {errors?.message}
        </p>
      )}
    </div>
  );
}
