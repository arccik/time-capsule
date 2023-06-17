import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AiCountdown from "./AICountDown";
import { createCapsuleSchema, type Capsule } from "~/types/capsule";
import FormErrors from "./FormErrors";
import { useRouter } from "next/router";
import DeliverBy from "./DeliveryBy";
import dateFormatter from "~/lib/dateFormatter";
import useLocalStorage from "~/lib/hooks/useLocalStorage";
// import UploadFile from "./UploadFile";
import SendButton from "./SendButton";
import MakePublicButton from "./MakePublicButton";
import MessageArea from "./MessageArea";
import SubjectField from "./SubjectField";
import AgeRange from "./AgeRange";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import useStripe from "~/lib/hooks/useStripe";

export default function TimeCapsuleForm() {
  const { status } = useSession();
  const [storage, setCapsuleInStorage, clear] = useLocalStorage("capsuleData");
  const createCheckout = api.payment.createCheckout.useMutation();
  const stripePromise = useStripe();
  const router = useRouter();
  const saveCapsule = api.capsule.create.useMutation<Capsule | null>({
    onSuccess: async () => {
      await router.push(`/dashboard`);
      setCapsuleInStorage(null);
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
    reset,
    formState: { errors },
  } = useForm<Capsule>({
    resolver: zodResolver(createCapsuleSchema),
    defaultValues: {
      subject: `A message from ${dateFormatter(new Date())}`,
    },
  });

  useEffect(() => {
    // check if localStorage has value and if so set the form values
    if (storage) {
      if (storage?.subject) setValue("subject", storage.subject);
      if (storage?.message) setValue("message", storage.message);
      if (storage?.call) setValue("call", storage.call);
      if (storage?.sms) setValue("sms", storage.sms);
      if (storage?.email) setValue("email", storage.email);
      if (storage?.public) setValue("public", storage.public);
      if (storage?.whatsapp) setValue("whatsapp", storage.whatsapp);
      if (storage?.dateTime) setValue("dateTime", new Date(storage.dateTime));
    }
  }, [storage, setValue]);

  const onSubmit: SubmitHandler<Capsule> = async (data): Promise<void> => {
    if (createCapsuleSchema.safeParse(data).success === false) {
      return;
    }
    if (status !== "authenticated") {
      setCapsuleInStorage(data);
      void router.push("/api/auth/signin");
      return;
    }
    const savedCapsule = await saveCapsule.mutateAsync(data);
    const response = await createCheckout.mutateAsync({
      capsuleId: savedCapsule?.id,
    });
    console.log("Handle Submit :))) ", { response });
    const stripe = await stripePromise;

    if (stripe !== null) {
      clear();
      reset();
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  };
  return (
    <>
      <div className="grid-flow-cols card glass mb-10 mt-5 grid w-full grid-cols-1 transition-all duration-150 md:w-[700px]">
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          className="m-2 space-y-4"
        >
          <SubjectField register={register("subject")} />

          <div>
            <MessageArea errors={errors} register={register("message")} />
            {/* <UploadFile /> */}
          </div>
          <AgeRange
            date={getValues("dateTime")}
            control={control}
            errors={errors?.dateTime}
          />
          <DeliverBy
            register={register}
            unregister={unregister}
            setValue={setValue}
            getValue={getValues}
            error={errors?.sendingMethod}
          />
          <FormErrors errors={errors} />
          <AiCountdown time={watch("dateTime")} />
          <MakePublicButton register={register("public")} />
          <SendButton disabled={Object.keys(errors).length > 0} />
          <button type="button" onClick={() => reset()}>
            clear form
          </button>
        </form>
      </div>
    </>
  );
}
