import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { GrEdit } from "react-icons/gr";

export default function CapsuleSubject(
  register: UseFormRegisterReturn<"subject">
) {
  return (
    <>
      <input
        {...register}
        placeholder="Subject"
        id="subject"
        className="input-bordered m-1 mb-0 rounded-lg bg-transparent p-2 text-xl font-bold text-white  placeholder-white "
      />
      <label
        className="absolute right-5 top-4 text-2xl hover:cursor-text"
        htmlFor="subject"
      >
        <GrEdit />
      </label>
    </>
  );
}
