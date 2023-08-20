import type { UseFormRegisterReturn } from "react-hook-form";
// import type { Capsule } from "~/types/capsule";

import { GrEdit } from "react-icons/gr";

type Props = {
  register?: UseFormRegisterReturn<"subject">;
  // errors: FieldErrors<Capsule>;
};

export default function SubjectField({ register }: Props) {
  return (
    <div className="relative">
      <input
        {...register}
        placeholder="Subject"
        className="placeholder-slate-300md:text-xl input-bordered w-full select-all rounded-lg bg-transparent p-2 pl-0 font-bold text-slate-200"
        id="subject"
      />

      <label
        className="absolute right-2 top-3  hover:cursor-text"
        htmlFor="subject"
      >
        <GrEdit />
      </label>
    </div>
  );
}
