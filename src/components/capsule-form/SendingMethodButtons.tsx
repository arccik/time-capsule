import React, { useState } from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import { type UseFormRegister } from "react-hook-form";
import { type Capsule } from "~/types/capsule";
import { type SendingMethod } from "@prisma/client";

export default function SendingMethodButtons({
  register,
}: // setValue,
{
  register: UseFormRegister<Capsule>;
  // setValue: UseFormSetValue<Capsule>;
}) {
  const [selectedMethods, setSelectedMethods] = useState<
    { id: string; name: string }[] | []
  >([]);
  const { data: sendingMethods, status } =
    api.capsule.getAllSendingMethods.useQuery();

  // useEffect(() => {
  //   setValue("sendingMethod", selectedMethods);
  // }, [selectedMethods]);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedMethods([
        ...selectedMethods,
        { id: event.target.id, name: event.target.name },
      ]);
    } else {
      const updatedMethods = selectedMethods.filter(
        (v) => v.name !== event.target.name
      );
      setSelectedMethods(updatedMethods);
    }
  };

  const sendMethodNames = (name: string) => {
    if (selectedMethods.some((v) => v.name === name)) {
      switch (name) {
        case "phone":
          return (
            <input
              type="text"
              {...register("phone")}
              className="input-bordered input  focus:bg-primary "
              placeholder="Type here your phone number"
            />
          );
        case "email":
          return (
            <input
              type="text"
              {...register("email")}
              className="input-bordered input  focus:bg-primary "
              placeholder="Type here your email address"
            />
          );
        case "post":
          return (
            <input
              type="text"
              {...register("post")}
              className="input-bordered input  focus:bg-primary "
              placeholder={`Type here  full address`}
            />
          );
        case "sms":
          return (
            <input
              type="text"
              {...register("phone")}
              className="input-bordered input  focus:bg-primary "
              placeholder={`Type here  phone number`}
            />
          );
        case "whatsapp":
          return (
            <input
              type="text"
              {...register("phone")}
              className="input-bordered input  focus:bg-primary "
              placeholder="Type here your whatsapp number"
            />
          );
        default:
          break;
      }
    }
  };
  if (status !== "success") return <Loader />;
  return (
    <ul className="menu rounded-box bg-base-100">
      <div className="grid gap-4 md:grid-flow-col">
        {sendingMethods.map((sendMethod: SendingMethod) => (
          <li key={sendMethod.id}>
            <a className="cursor-auto">
              <input
                type="checkbox"
                name={sendMethod.name}
                id={sendMethod.id}
                checked={selectedMethods.some(
                  (v) => v.name === sendMethod.name
                )}
                className="group checkbox"
                onChange={handleClick}
              />
              <p>{sendMethod.name}</p>
            </a>
            {sendMethodNames(sendMethod.name)}
          </li>
        ))}
      </div>
    </ul>
  );
}
