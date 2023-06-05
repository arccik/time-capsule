import type {
  UseFormRegisterReturn,
  // UseFormSetValue,
} from "react-hook-form/dist/types";
// import { type Capsule } from "~/types/capsule";

export default function AgeRange({
  rest,
}: // setValue,
{
  rest: UseFormRegisterReturn;
  // setValue: UseFormSetValue<Capsule>;
}) {
  return (
    <>
      <div>
        <p className="text-center text-sm">Deliver in</p>
        <input
          type="range"
          min="1"
          max="50"
          {...rest}
          className="range range-primary"
        />
      </div>
      <div className="flex w-full justify-between px-2 text-xs">
        <span>1 year</span>
        <span>13 years</span>
        <span>25 years</span>
        <span>37 years</span>
        <span>50 years</span>
      </div>
      <div className="btn-group m-1 mt-5 flex w-full content-center justify-center">
        <input
          type="radio"
          name="options"
          data-title="6 month"
          className="btn-primary glass btn-sm btn"
        />
        <input
          type="radio"
          name="options"
          data-title="1 Year"
          className="btn-primary glass btn-sm btn"
        />
        <input
          type="radio"
          name="options"
          data-title="2 Years"
          className="btn-primary glass btn-sm btn"
        />
        <input
          type="radio"
          name="options"
          data-title="5 Years"
          className="btn-primary glass btn-sm btn"
        />
        <input
          type="radio"
          name="options"
          data-title="10 Years"
          className="btn-primary glass btn-sm btn"
        />
      </div>
    </>
  );
}
