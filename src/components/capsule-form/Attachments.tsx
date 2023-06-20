import React from "react";
import Recorder from "./Recoder";
import Upload from "./Upload";

export default function Attachments() {
  return (
    <div className="space-y-4">
      <Recorder />
      <Upload />
    </div>
  );
}
