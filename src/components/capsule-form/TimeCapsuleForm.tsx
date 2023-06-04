import React from "react";
import Image from "next/image";
import AgeRange from "~/components/capsule-form/AgeRange";
import { api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears } from "~/lib/addDays";
import AiCountdown from "./AICountDown";
import { createCapsuleSchema, type Capsule } from "~/types/capsule";
import FormErrors from "./FormErrors";
import { useRouter } from "next/router";
import ContactDetails from "./ContactDetails";
// import SendingMethodButtons from "./SendingMethodButtons";
import { motion } from "framer-motion";

export default function TimeCapsuleForm() {
  const router = useRouter();
  const saveCapsule = api.capsule.create.useMutation({
    onSuccess: async (data) => {
      console.log("Data Save !", data);
      // await router.push(`/dashboard`);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    unregister,
    formState: { errors },
  } = useForm<Capsule>({ resolver: zodResolver(createCapsuleSchema) });

  const formetter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const whenOpen = formetter.format(watch("dateTime"));

  const onSubmit: SubmitHandler<Capsule> = (data) => {
    console.log("Submit Data : ", createCapsuleSchema.safeParse(data));

    // const response = saveCapsule.mutate(data);
    // console.log("on submit data", data, response);
  };

  return (
    <div className="grid-flow-cols card glass grid grid-cols-1 gap-4 transition-all duration-150 md:grid-cols-2">
      <div className="self-center justify-self-center">
        <Image
          height={240}
          width={300}
          src="/images/locked_in_a_time.png"
          alt="time capsule"
        />
        <AiCountdown time={getValues("dateTime")} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-3 space-y-4">
        <AgeRange
          rest={register("dateTime", {
            setValueAs: (v: string) => {
              const today = new Date();
              return addYears(today, parseInt(v));
            },
          })}
        />
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="messageField">Write the message to future you</label>
          <textarea
            id="messageField"
            {...register("message")}
            placeholder="Message"
            rows={5}
            className={`textarea-bordered textarea textarea-lg w-full border-2  focus:border-blue-800 ${
              errors.message ? "textarea-secondary text-secondary " : ""
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-sx text-right leading-tight text-red-600">
              {errors.message?.message}
            </p>
          )}
        </motion.div>
        {/* <span className="-mb-0 block font-mono text-xs">
          Upload a image to be part of your time capsule
        </span>
        <input
          type="file"
          className="file-input-bordered file-input-secondary file-input w-full max-w-xs"
        /> */}
        <ContactDetails register={register} unregister={unregister} />
        {/* <SendingMethodButtons register={register} /> */}
        <FormErrors errors={errors} />

        <div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Make it visible to everyone when opened ?
              </span>
              <input
                type="checkbox"
                className="checkbox-primary checkbox"
                {...register("public")}
              />
            </label>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div>
            <button
              disabled={Object.keys(errors).length > 0}
              className="btn-primary btn w-full"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
