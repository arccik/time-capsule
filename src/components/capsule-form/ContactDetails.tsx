import React, {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import type { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { type Capsule } from "~/types/capsule";

type ContactMethods = {
  [key: string]: boolean;
};

export default function ContactDetails({
  register,
  unregister,
}: {
  register: UseFormRegister<Capsule>;
  unregister: UseFormUnregister<Capsule>;
}) {
  const [state, setState] = useState<ContactMethods>({
    email: false,
    sms: false,
    whatsapp: false,
    phone: false,
  });

  const { data: sendingMethods, status } =
    api.capsule.getAllSendingMethods.useQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    if (!e.target.checked) {
      unregister(e.target.name as keyof Capsule);
    }
  };

  const contactMethodsSelected = Object.keys(state).filter(
    (key) => state[key] === true
  );

  if (status !== "success") return <Loader />;

  return (
    <>
      <div className="border-3 w-full rounded-lg bg-slate-100 p-6 pt-4 shadow-lg">
        <p className="font-bold">Deliver by</p>
        <span className="text-xs text-primary">
          Select the method to recieve your time capsule
        </span>

        <div className="mt-4 flex  justify-between">
          {sendingMethods &&
            sendingMethods.map((method) => (
              <div className="flex items-center" key={method.id}>
                <p className="text-sm">{method.name}</p>
                <label className="swap-rotate swap ">
                  {/* <!-- this hidden checkbox controls the state --> */}
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    name={method.name}
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
                className="form-control w-full max-w-lg"
                key={method}
              >
                <label className="label">
                  <span className="label-text">{method.toUpperCase()}</span>
                  <span className="label-text-alt">
                    Your message will be delivered by {method}
                  </span>
                </label>
                <input
                  {...register(
                    method as
                      | "email"
                      | "post"
                      | "phone"
                      | "sms"
                      | "whatsapp"
                      | "call"
                      | "address"
                  )}
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
