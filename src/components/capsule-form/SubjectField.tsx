import type { UseFormRegisterReturn } from "react-hook-form";
// import type { Capsule } from "~/types/capsule";

import { GrEdit } from "react-icons/gr";

type Props = {
  register: UseFormRegisterReturn<"subject">;
  // errors: FieldErrors<Capsule>;
};

export default function SubjectField({ register }: Props) {
  return (
    <>
      <input
        {...register}
        placeholder="Subject"
        className="input-bordered -mb-10 w-full select-all rounded-lg bg-transparent p-2 pl-0 font-bold text-base-200  placeholder-base-100 md:text-xl"
        id="subject"
      />
      <label
        className="text-md absolute right-5  top-1  hover:cursor-text"
        htmlFor="subject"
      >
        <GrEdit />
      </label>
    </>
  );
}
