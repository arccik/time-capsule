import React, { useEffect } from "react";
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
import DeliverBy from "./DeliverBy";
import { useSession } from "next-auth/react";
// import CapsuleSubject from "~/components/capsule-form/CapsuleSubject";
// import useLocalStorage from "~/lib/hooks/useLocalStorage";
import { useLocalStorage } from "usehooks-ts";
import dateFormatter from "~/lib/dateFormatter";
import { GrEdit } from "react-icons/gr";
// import { z } from "zod";

export default function TimeCapsuleForm() {
  const { data: sessionData, status } = useSession();
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
    unregister,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Capsule>({
    resolver: zodResolver(createCapsuleSchema),
    defaultValues: {
      subject: `Subject: A letter from ${dateFormatter(new Date())}`,
    },
  });
  const [capsuleInStorage, setCapsuleInStorage] =
    useLocalStorage<Capsule | null>("capsuleData", null);

  console.log("TIME CAPSULE FORM :)) ", errors, watch());
  useEffect(() => {
    if (capsuleInStorage && status === "authenticated") {
      for (const key of Object.keys(capsuleInStorage)) {
        switch (key) {
          case "subject":
            setValue(key, capsuleInStorage[key]);
            break;
          case "dateTime":
            setValue(key, capsuleInStorage[key]);
            break;
          case "message":
            setValue(key, capsuleInStorage[key]);
            break;
          case "public":
            setValue(key, capsuleInStorage[key]);
          case "sms":
            setValue(key, capsuleInStorage[key]);
          case "call":
            setValue(key, capsuleInStorage[key]);
          case "whatsapp":
            setValue(key, capsuleInStorage[key]);
          case "email":
            setValue(key, capsuleInStorage[key]);
          default:
            break;
        }
      }
      console.log("Data loaded from localstorage");
      setCapsuleInStorage(null);
    }
  }, [capsuleInStorage, setCapsuleInStorage, setValue, status]);

  const onSubmit: SubmitHandler<Capsule> = (data): void => {
    if (createCapsuleSchema.safeParse(data).success === false) {
      return;
    }
    if (status !== "authenticated") {
      setCapsuleInStorage(data);
      void router.push("/api/auth/signin");
      return;
    }

    const response = saveCapsule.mutate(data);
    console.log("on submit data", data, response);
  };

  return (
    <>
      <div className="w-[700px]grid-flow-cols card glass mt-10 grid grid-cols-1  transition-all duration-150">
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="m-3 space-y-4"
        >
          <input
            {...register("subject")}
            placeholder="Subject"
            className="placeholder-base-dark input-bordered w-full select-all rounded-lg bg-transparent p-2 pl-0 text-xl  font-bold text-base-200"
            id="subject"
          />
          <label
            className="absolute right-5 top-1  text-2xl hover:cursor-text"
            htmlFor="subject"
          >
            <GrEdit />
          </label>

          <div>
            <textarea
              id="messageField"
              {...register("message")}
              placeholder="Write something that will make you smile"
              rows={5}
              className={`textarea-bordered textarea textarea-lg w-full drop-shadow-lg  focus:border-blue-800 md:w-[600px] ${
                errors.message ? "textarea-secondary text-secondary " : ""
              }`}
            ></textarea>

            {errors.message && (
              <p className="text-sx text-right leading-tight text-red-600">
                {errors.message?.message}
              </p>
            )}

            <AgeRange
              date={watch("dateTime")}
              rest={register("dateTime", {
                setValueAs: (v: string) => {
                  const value = parseInt(v);
                  setValue("openIn", value);
                  return addYears(value);
                },
              })}
            />
          </div>

          <DeliverBy
            register={register}
            unregister={unregister}
            setValue={setValue}
            getValue={getValues}
          />
          <FormErrors errors={errors} />

          <div className="input-range m-5 self-center justify-self-center ">
            <AiCountdown time={watch("dateTime")} />
          </div>
          <div>
            <div className="border-3 form-control w-full rounded-lg bg-slate-100 p-1 shadow-lg">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Make your capsule visible when time comes ?
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
              <button className="btn-secondary btn w-full">
                Sign in to send the message
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
