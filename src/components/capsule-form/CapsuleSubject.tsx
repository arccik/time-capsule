import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
// import dateFormatter from "~/lib/dateFormatter";
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
        // defaultValue={`A letter from ${dateFormatter(new Date())}`}
        className="placeholder-base-dark input-bordered m-1 mb-0 rounded-lg bg-transparent p-2 text-xl font-bold  text-base-content "
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
