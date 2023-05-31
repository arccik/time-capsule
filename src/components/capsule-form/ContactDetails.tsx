import React, { useState } from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export default function ContactDetails() {
  const [state, setState] = useState({
    email: false,
    phone: false,
    sms: false,
    whatsapp: false,
    call: false,
  });
  const { data: sendingMethods, status } =
    api.capsule.getAllSendingMethods.useQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  if (status !== "success") return <Loader />;

  return (
    <div className="border-3 w-full rounded-lg bg-slate-100 p-6 pt-4 shadow-lg">
      <p className="font-bold">How you wonna open your time capsule ?</p>
      <span className="text-xs text-primary">
        Check how would you like to be notified
      </span>

      <div className="mt-4 flex">
        {sendingMethods &&
          sendingMethods.map((method) => (
            <div className="flex items-center justify-between" key={method.id}>
              <p className="p-2 text-sm">{method.name}</p>
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
  );
}
