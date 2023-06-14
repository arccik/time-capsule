import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AiCountdown from "./AICountDown";
import { createCapsuleSchema, type Capsule } from "~/types/capsule";
import FormErrors from "./FormErrors";
import { useRouter } from "next/router";
import DeliverBy from "./DeliverBy";
import dateFormatter from "~/lib/dateFormatter";
import useLocalStorage from "~/lib/hooks/useLocalStorage";
// import UploadFile from "./UploadFile";
import SendButton from "./SendButton";
import MakePublicButton from "./MakePublicButton";
import MessageArea from "./MessageArea";
import SubjectField from "./SubjectField";
import AgeRange from "./AgeRange";

export default function TimeCapsuleForm() {
  const [capsuleInStorage, setCapsuleInStorage] =
    useLocalStorage("capsuleData");
  const router = useRouter();
  // console.log("capsuleInStorage", capsuleInStorage);
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
    control,
    formState: { errors },
  } = useForm<Capsule>({
    resolver: zodResolver(createCapsuleSchema),
    defaultValues: {
      subject:
        capsuleInStorage?.subject ||
        `A Message from ${dateFormatter(new Date())}`,
    },
  });

  useEffect(() => {
    console.log("capsuleInStorage", capsuleInStorage);
    // check if localStorage has value and if so set the form values
    if (capsuleInStorage) {
      if (capsuleInStorage?.call) setValue("call", capsuleInStorage.call);
      if (capsuleInStorage?.sendingMethod)
        setValue("sendingMethod", capsuleInStorage.sendingMethod);
      if (capsuleInStorage?.subject)
        setValue("subject", capsuleInStorage.subject);
      if (capsuleInStorage?.dateTime)
        setValue("dateTime", capsuleInStorage.dateTime);
      if (capsuleInStorage?.message)
        setValue("message", capsuleInStorage.message);
      if (capsuleInStorage?.public) setValue("public", capsuleInStorage.public);
      if (capsuleInStorage?.sms) setValue("sms", capsuleInStorage.sms);
      if (capsuleInStorage?.whatsapp)
        setValue("whatsapp", capsuleInStorage.whatsapp);
      if (capsuleInStorage?.email) setValue("email", capsuleInStorage.email);
    }
  }, [capsuleInStorage, setCapsuleInStorage, setValue]);

  const onSubmit: SubmitHandler<Capsule> = (data): void => {
    if (createCapsuleSchema.safeParse(data).success === false) {
      return;
    }
    if (status !== "authenticated") {
      setCapsuleInStorage(data);
      void router.push("/api/auth/signin");
      return;
    }
    saveCapsule.mutate(data);
  };

  return (
    <>
      <div className="grid-flow-cols card glass mb-10 mt-5 grid w-full grid-cols-1 transition-all duration-150 md:w-[700px]">
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="m-2 space-y-4"
        >
          <SubjectField register={register("subject")} />

          <div>
            <MessageArea errors={errors} register={register("message")} />
            {/* <UploadFile /> */}
          </div>
          <AgeRange
            date={getValues("dateTime")}
            register={register}
            setValue={setValue}
            control={control}
            errors={errors?.dateTime}
          />
          <DeliverBy
            register={register}
            unregister={unregister}
            setValue={setValue}
            getValue={getValues}
            selected={capsuleInStorage?.sendingMethod}
            error={errors?.sendingMethod}
          />
          <FormErrors errors={errors} />
          <AiCountdown time={watch("dateTime")} />
          <MakePublicButton {...register("public")} />
          <SendButton disabled={Object.keys(errors).length > 0} />
        </form>
      </div>
    </>
  );
}
