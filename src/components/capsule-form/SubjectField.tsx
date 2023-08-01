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
        className="input-bordered w-full select-all rounded-lg bg-transparent p-2 pl-0 font-bold text-base-200  placeholder-base-300 dark:text-slate-50 dark:placeholder-slate-50 md:text-xl"
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
