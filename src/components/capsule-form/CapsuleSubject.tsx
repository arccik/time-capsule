import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import dateFormatter from "~/lib/dateFormatter";

export default function CapsuleSubject(
  register: UseFormRegisterReturn<"subject">
) {
  return (
    <input
      {...register}
      placeholder="Subject"
      defaultValue={`A letter from ${dateFormatter(new Date())}`}
      className="input-bordered m-1 mb-0 rounded-lg bg-transparent p-2 text-xl font-bold text-white placeholder-white focus:input-primary"
    />
  );
}
