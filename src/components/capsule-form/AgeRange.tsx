import type { UseFormRegisterReturn } from "react-hook-form/dist/types";
import dateFormatter from "~/lib/dateFormatter";

export default function AgeRange({
  rest,
  date,
}: // setValue,
{
  date: Date | undefined;
  rest: UseFormRegisterReturn;
}) {
  return (
    <section className="mt-5 ">
      <div>
        <p className="text-center text-sm">Deliver on</p>
        {date && (
          <div className="flex justify-center gap-2 text-primary">
            {dateFormatter(date)}
          </div>
        )}
        <input
          type="range"
          min="1"
          max="10"
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
