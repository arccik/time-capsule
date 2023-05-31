import { UseFormRegisterReturn } from "react-hook-form/dist/types";

export default function AgeRange({ rest }: { rest: UseFormRegisterReturn }) {
  return (
    <div>
      <p className="text-center text-sm">When to open time capsule ? (years)</p>
      <input
        type="range"
        min="1"
        max="50"
        {...rest}
        className="range range-primary"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>1</span>
        <span>13</span>
        <span>25</span>
        <span>37</span>
        <span>50</span>
      </div>
    </div>
  );
}
