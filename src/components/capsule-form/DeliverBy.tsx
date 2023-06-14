import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import type {
  FieldError,
  Merge,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  // UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { type Capsule } from "~/types/capsule";

type ContactMethods = {
  [key: string]: boolean;
};

export default function DeliverBy({
  register,
  unregister,
  setValue,
  getValue,
  selected,
  error,
}: // s
{
  register: UseFormRegister<Capsule>;
  unregister: UseFormUnregister<Capsule>;
  setValue: UseFormSetValue<Capsule>;
  getValue: UseFormGetValues<Capsule>;
  selected: string[] | undefined;
  error: Merge<FieldError, FieldError | undefined> | undefined;
}) {
  const [state, setState] = useState<ContactMethods>({
    email: !!selected?.includes("email"),
    sms: !!selected?.includes("sms"),
    whatsapp: !!selected?.includes("whatsapp"),
    phone: !!selected?.includes("phone"),
  });
  console.log("DELICERYYYY BYYY ", error);

  // console.log("delivery By ", { selected: selected?.includes("email"), state });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <div
        className={`border-3 w-full rounded-lg  p-6 pt-4 shadow-lg ${
          error?.message ? "bg-red-200" : "bg-slate-100"
        } `}
      >
        <p className="font-bold">Deliver by</p>
        <span className="text-xs text-primary">
          Select the method to recieve your time capsule
        </span>

        <div className="mt-4 flex  justify-between">
          {["email", "call", "sms", "whatsapp"].map((method) => (
            <div className="flex items-center" key={method}>
              <p className="text-sm">{method}</p>
              <label className="swap-rotate swap ">
                {/* <!-- this hidden checkbox controls the state --> */}
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name={method}
                  checked={state[method]}
                  defaultChecked={!!selected?.includes(method)}
                />
                {/* <!-- hamburger icon --> */}
                <MdCheckBox className="swap-on w-full text-5xl" />
                {/* <!-- close icon --> */}
                <MdCheckBoxOutlineBlank className="swap-off w-full text-5xl" />
              </label>
            </div>
          ))}
        </div>
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
