import React, { useState } from "react";
import Recorder from "./Recoder";
import Card from "../layout/Card";

export default function VoiceMessage() {
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
      {show && <Recorder />}
    </Card>
  );
}
