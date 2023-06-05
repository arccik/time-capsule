import React from "react";
// import Image from "next/image";
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
import { useSession } from "next-auth/react";

export default function TimeCapsuleForm() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const saveCapsule = api.capsule.create.useMutation<Capsule>({
    onSuccess: async (data) => {
      console.log("Data Save !", data);
      await router.push(`/dashboard`);
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    unregister,
    formState: { errors },
  } = useForm<Capsule>({ resolver: zodResolver(createCapsuleSchema) });

  const onSubmit: SubmitHandler<Capsule> = (data): void => {
    if (createCapsuleSchema.safeParse(data).success === false) {
      return;
    }
    const response = saveCapsule.mutate(data);
    console.log("on submit data", data, response);
  };

  return (
    <div className="grid-flow-cols card glass grid grid-cols-1 gap-4 transition-all duration-150 ">
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="m-3 space-y-4"
      >
        <div>
          <label htmlFor="messageField">Write the message to future you</label>
          <textarea
            id="messageField"
            {...register("message")}
            placeholder="Message"
            rows={5}
            className={`textarea-bordered textarea textarea-lg w-full   focus:border-blue-800 ${
              errors.message ? "textarea-secondary text-secondary " : ""
            }`}
          ></textarea>

          {errors.message && (
            <p className="text-sx text-right leading-tight text-red-600">
              {errors.message?.message}
            </p>
          )}
        </div>

        <AgeRange
          rest={register("dateTime", {
            setValueAs: (v: string) => {
              const today = new Date();
              return addYears(today, parseInt(v));
            },
          })}
        />
        <div className="m-5 self-center justify-self-center">
          <AiCountdown time={getValues("dateTime")} />
        </div>
        <ContactDetails register={register} unregister={unregister} />
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
          {sessionData?.user ? (
            <div>
              <button
                disabled={Object.keys(errors).length > 0}
                className="btn-secondary btn w-full"
                type="submit"
              >
                Send to the Future
              </button>
            </div>
          ) : (
            <button
              className="btn-secondary btn w-full"
              type="button"
              onClick={() => router.push("/api/auth/signin")}
            >
              Sign in to send the message
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
