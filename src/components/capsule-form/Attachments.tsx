import React from "react";
import Recorder from "./Recoder";

export default function Attachments() {
  return (
    <div className="border-3 w-full space-y-4  rounded-lg bg-slate-100 p-6 pt-4 shadow-lg">
      <h2 className="-mb-1 text-xl font-bold">Record your voice</h2>
      <p className="text-sm">
        At the scheduled time, you will receive a phone call where you can
        listen to your recorded audio message.
      </p>

      <Recorder />
    </div>
  );
}
