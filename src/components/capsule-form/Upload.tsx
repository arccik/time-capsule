import React from "react";

export default function Upload() {
  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-center text-xl font-bold">
        Upload Memories in form of pictures
      </h2>
      <input
        type="file"
        className="file-input-bordered file-input-primary file-input  drop-shadow-md"
      />
    </div>
  );
}
