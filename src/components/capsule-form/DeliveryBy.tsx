import React, { useEffect, useState } from "react";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import useLocalStorage from "~/lib/hooks/useLocalStorage";
import Card from "../layout/Card";
import type { FormProps } from "~/types/formProps";

type ContactMethods = {
  [key: string]: boolean;
};

export default function DeliverBy({
  unregister,
  setValue,
  getValue,
  errors,
  clearErrors,
}: Omit<FormProps, "register">) {
  const [capsuleInStorage] = useLocalStorage("capsuleData");
  const [state, setState] = useState<ContactMethods>({
    email: false,
    sms: false,
    whatsapp: false,
  });

  useEffect(() => {
    if (capsuleInStorage) {
      setValue("sendingMethod", capsuleInStorage.sendingMethod);

      setState({
        email: !!capsuleInStorage?.sendingMethod?.includes("email"),
        sms: !!capsuleInStorage?.sendingMethod?.includes("sms"),
        whatsapp: !!capsuleInStorage?.sendingMethod?.includes("whatsapp"),
      });
    }
  }, [capsuleInStorage, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("sendingMethod");
    setState({ ...state, [e.target.name]: e.target.checked });
    const savedSendingMethods = getValue("sendingMethod") || [];
    if (!e.target.checked) {
      unregister(e.target.name as "email" | "sms" | "whatsapp");
      setValue(
        "sendingMethod",
        savedSendingMethods.filter((v) => v !== e.target.name)
      );
    } else {
      setValue("sendingMethod", [...savedSendingMethods, e.target.name]);
    }
  };

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
    <Card
      title="Deliver to"
      subtitle="Select the method to recieve your time capsule"
      errors={errors}
    >
      <div className="mt-4 flex  justify-between">{buttons}</div>
    </Card>
  );
}
