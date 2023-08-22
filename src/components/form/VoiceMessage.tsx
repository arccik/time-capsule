import React, { useState } from "react";
import Recorder from "./Recoder";
import Card from "../ui/FormCard";
import type { FormProps } from "~/types/formProps";


export default function VoiceMessage({
  setValue,
}: Pick<FormProps, "setValue" | "unregister">) {
  const [show, setShow] = useState(false);
  return (
    <Card
      title="Record voice message"
      subtitle=" At the scheduled time, you will receive a phone call with your own message"
      actions={
        <input
          type="checkbox"
          className="toggle-success toggle"
          onChange={() => {
            setShow((prev) => !prev);
          }}
          checked={show}
        />
      }
    >
      {show && <Recorder setValue={setValue} />}
    </Card>
  );
}
