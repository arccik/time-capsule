import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createCapsuleSchema, type Capsule } from "~/types/capsule";
import DeliverBy from "./DeliverTo";
import useLocalStorage from "~/lib/hooks/useLocalStorage";
import SendButton from "./SendButton";
import MakePublicButton from "./MakePublicButton";
import MessageArea from "./MessageArea";
import SubjectField from "./SubjectField";
import { api } from "~/utils/api";
import useStripe from "~/lib/hooks/useStripe";
import VoiceMessage from "./VoiceMessage";
import CountDown from "./CountDown";
import UploadFile from "./UploadFile";
import DeliveryIn from "~/components/capsule-form/DeliveryIn";
import ContactDetails from "./ContactDetails";

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
    setValue,
    getValues,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Capsule>({
    resolver: zodResolver(createCapsuleSchema),
    defaultValues: {
      subject: `Subject: A message from ${new Date().toDateString()}`,
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
  }, [storage]);

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
    <section>
      <div className="card m-2 md:glass md:ml-4 md:mr-4 md:p-4">
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
        >
          <div className="rounded-t-lg border-t p-2 pb-2 md:rounded-none md:border-none">
            <SubjectField register={register("subject")} />
          </div>
          <div className="gap-2 md:grid md:grid-flow-col md:grid-rows-3">
            <div className="col-span-8 row-span-3">
              <MessageArea errors={errors?.message} register={register} />
            </div>
            <div className="col-span-1 row-span-3">
              <div className="space-y-2">
                <DeliveryIn
                  setValue={setValue}
                  errors={errors?.dateTime}
                  clearErrors={clearErrors}
                  unregister={unregister}
                />
                <DeliverBy
                  unregister={unregister}
                  setValue={setValue}
                  getValue={getValues}
                  errors={errors?.sendingMethod}
                  clearErrors={clearErrors}
                />
                <UploadFile setValue={setValue} unregister={unregister} />

                <VoiceMessage />

                <ContactDetails
                  register={register}
                  errors={errors?.phone || errors?.email}
                />
                <MakePublicButton register={register("public")} />
              </div>
            </div>
          </div>
          {/* {JSON.stringify(watch())} */}
          <SendButton disabled={Object.keys(errors).length > 0} />
        </form>
      </div>
      {status === "authenticated" && <CountDown date={getValues("dateTime")} />}
    </section>
  );
}
