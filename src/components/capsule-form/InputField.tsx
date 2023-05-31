import React from "react";

type Props = {
  label: string;
  placeholder: string;
};

export default function InputField({ label, placeholder, ...props }: Props) {
  return (
    <div className="form-control  max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        {...props}
        className="input-bordered input w-full"
      />
    </div>
  );
}
