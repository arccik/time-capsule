import clsx from "clsx";
import type { FormProps } from "~/types/formProps";

export default function MessageArea({
  register,
  errors,
}: Pick<FormProps, "register" | "errors">) {
  return (
    <div className="relative h-full w-full">
      <textarea
        id="messageField"
        {...register("message")}
        placeholder="Write something emotional to yourself, relatives or friends, what will make you smile when you read this message in the future"
        rows={7}
        className={clsx({
          "textarea-bordered textarea textarea-lg h-full w-full drop-shadow-lg  focus:border-blue-800 focus:placeholder-transparent":
            true,
          "textarea-error border-2": errors,
        })}
      />
      {errors?.message && (
        <p className="text-right text-xs text-red-600">{errors?.message}</p>
      )}
    </div>
  );
}
