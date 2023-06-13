import type { UseFormRegisterReturn } from "react-hook-form";

export default function Calendar({
  register,
}: {
  register: UseFormRegisterReturn<"dateTime">;
}) {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    .toISOString()
    .split("T")[0];
  return (
    <div className="m-5 mr-0 flex self-center justify-self-center">
      <span className="text-xs text-primary">
        Pick the date when to receive the capsule
      </span>

      <input
        {...register}
        type="date"
        min={minDate}
        max={maxDate}
        className="w-full rounded-md p-2"
      />
    </div>
  );
}
