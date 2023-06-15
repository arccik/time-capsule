import type { UseFormRegisterReturn } from "react-hook-form";

export default function MakePublicButton({
  register,
}: {
  register?: UseFormRegisterReturn<"public">;
}) {
  return (
    <div>
      <div className="border-3 form-control w-full rounded-lg bg-slate-100 p-1 shadow-lg">
        <label className="label cursor-pointer">
          <span className="label-text">
            Make your capsule visible when time comes ?
          </span>
          <input
            type="checkbox"
            className="checkbox-primary checkbox"
            {...register}
          />
        </label>
      </div>
    </div>
  );
}
