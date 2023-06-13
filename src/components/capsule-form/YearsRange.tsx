import type { UseFormRegisterReturn } from "react-hook-form/dist/types";

export default function AgeRange({
  rest,
}: {
  rest: UseFormRegisterReturn<"dateTime">;
}) {
  return (
    <section className="mt-5">
      <div>
        <input
          type="range"
          min="1"
          max="48"
          {...rest}
          className="range range-primary"
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <span className="block text-center text-sm font-bold text-primary-focus">
          (Years)
        </span>
      </div>
    </section>
  );
}
