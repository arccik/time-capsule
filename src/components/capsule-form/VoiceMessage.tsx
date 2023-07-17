import React from "react";
import Recorder from "./Recoder";

export default function VoiceMessage() {
  return (
    <div className="border-3 mt-4 w-full  space-y-4 rounded-lg bg-slate-100 p-6 pt-4 shadow-lg">
      <p className="font-bold">Record voice message</p>

      <span className="text-xs text-primary">
        At the scheduled time, you will receive a phone call with your own
        message
      </span>

      <Recorder />
    </div>
  );
}
