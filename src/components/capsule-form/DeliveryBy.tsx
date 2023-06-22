import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import type {
  FieldError,
  Merge,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { type Capsule } from "~/types/capsule";
import useLocalStorage from "~/lib/hooks/useLocalStorage";

type ContactMethods = {
  [key: string]: boolean;
};

export default function DeliverBy({
  register,
  unregister,
  setValue,
  getValue,
  error,
  clearErrors,
}: {
  register: UseFormRegister<Capsule>;
  unregister: UseFormUnregister<Capsule>;
  setValue: UseFormSetValue<Capsule>;
  getValue: UseFormGetValues<Capsule>;
  error: Merge<FieldError, FieldError | undefined> | undefined;
  clearErrors: UseFormClearErrors<Capsule>;
}) {
  const [capsuleInStorage] = useLocalStorage("capsuleData");
  const [state, setState] = useState<ContactMethods>({
    email: false,
    sms: false,
    whatsapp: false,
    call: false,
  });

  useEffect(() => {
    if (capsuleInStorage) {
      setValue("sendingMethod", capsuleInStorage.sendingMethod);

      setState({
        email: !!capsuleInStorage?.sendingMethod?.includes("email"),
        sms: !!capsuleInStorage?.sendingMethod?.includes("sms"),
        whatsapp: !!capsuleInStorage?.sendingMethod?.includes("whatsapp"),
        call: !!capsuleInStorage?.sendingMethod?.includes("call"),
      });
    }
  }, [capsuleInStorage, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("sendingMethod");
    setState({ ...state, [e.target.name]: e.target.checked });
    const savedSendingMethods = getValue("sendingMethod") || [];
    if (!e.target.checked) {
      unregister(e.target.name as keyof Capsule);
      setValue(
        "sendingMethod",
        savedSendingMethods.filter((v) => v !== e.target.name)
      );
    } else {
      setValue("sendingMethod", [...savedSendingMethods, e.target.name]);
    }
  };

  const contactMethodsSelected = Object.keys(state).filter(
    (key) => state[key] === true
  );

  const buttons = Object.entries(state).map(([key, value]) => (
    <div className="flex items-center" key={key}>
      <p className="text-sm">{key}</p>
      <label className="swap-rotate swap ">
        <input
          type="checkbox"
          onChange={handleChange}
          name={key}
          checked={value}
        />
        <MdCheckBox className="swap-on w-full text-5xl" />
        <MdCheckBoxOutlineBlank className="swap-off w-full text-5xl" />
      </label>
    </div>
  ));

  return (
    <>
      <div
        className={`border-3 w-full rounded-lg  bg-slate-100 p-6 pt-4 shadow-lg ${
          error?.message ? "border-2 border-red-600 " : ""
        } `}
      >
        <p className="font-bold">Deliver by</p>
        <span className="text-xs text-primary">
          Select the method to recieve your time capsule
        </span>

        <div className="mt-4 flex  justify-between">{buttons}</div>
      </div>
      <AnimatePresence>
        {contactMethodsSelected.length > 0 && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border-3 w-full rounded-lg bg-slate-100 p-6 pt-4 shadow-lg"
          >
            {contactMethodsSelected.map((method) => (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                className="form-control w-full"
                key={method}
              >
                <label className="label">
                  <span className="label-text">{method.toUpperCase()}</span>
                  <span className="label-text-alt">
                    Your message will be delivered by {method}
                  </span>
                </label>
                <input
                  {...register(method as "email" | "sms" | "whatsapp" | "call")}
                  type="text"
                  placeholder={
                    method === "email"
                      ? "Enter email address"
                      : "Enter phone number"
                  }
                  className="input-bordered input w-full"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
