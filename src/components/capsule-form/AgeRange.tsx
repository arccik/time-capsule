import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

Dayjs.extend(relativeTime);
import {
  type Control,
  Controller,
  type UseFormRegister,
  type UseFormSetValue,
  type FieldError,
} from "react-hook-form";
import type { Capsule } from "~/types/capsule";
import { useState } from "react";

import { Calendar } from "antd";

type Props = {
  register: UseFormRegister<Capsule>;
  date: Date | undefined;
  setValue: UseFormSetValue<Capsule>;
  control: Control<Capsule>;
  errors: FieldError | undefined;
};

export default function AgeRange({
  // register,
  date,
  // setValue,
  control,
  errors,
}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <div
        className={`border-3 w-full  rounded-lg bg-slate-100 p-6 pt-4 shadow-lg ${
          errors?.message ? "border-2 border-red-500" : ""
        }`}
      >
        <div className="flex flex-row justify-between gap-4">
          <p className="font-bold">Deliver in </p>
          <div className="flex flex-row gap-4">
            <p className="font-bold text-primary">Calendar </p>
            <input
              type="checkbox"
              className="toggle-primary toggle"
              checked={showCalendar}
              onChange={() => setShowCalendar((prev) => !prev)}
            />
          </div>
        </div>

        {showCalendar ? (
          <Controller
            control={control}
            name="dateTime"
            render={({ field }) => (
              <div className="m-3 grid justify-center p-3">
                <Calendar
                  defaultValue={Dayjs().add(5, "month")}
                  disabledDate={(date) =>
                    Dayjs().add(6, "month") > date ||
                    Dayjs().add(10, "year") < date
                  }
                  fullscreen={false}
                  onChange={(data) => field.onChange(data)}
                />
              </div>
            )}
          />
        ) : (
          <Controller
            control={control}
            name="dateTime"
            render={({ field }) => (
              <section className="mt-5">
                <div>
                  <input
                    type="range"
                    min="6"
                    max="120"
                    onChange={(data) => {
                      field.onChange(
                        Dayjs().add(+data.target.value, "month").toDate()
                      );
                    }}
                    className={`range ${
                      errors?.message ? "range-secondary" : "range-primary"
                    }`}
                  />
                  <div className="flex w-full justify-between px-2 text-xs">
                    <span>6 months</span>
                    <span>3 years</span>
                    <span>5 years</span>
                    <span>6 years</span>
                    <span>8 years</span>
                    <span>10 years</span>
                  </div>
                  {/* <span className="block text-center text-sm font-bold text-primary-focus">
                  (Years)
                </span> */}
                </div>
              </section>
            )}
          />
        )}
        {date && (
          <div className="mt-2">
            {Dayjs(date).isBefore(Dayjs().add(5, "month")) ||
            Dayjs(date).isAfter(Dayjs().add(10, "year")) ? (
              <p className="font-bold text-red-500">
                This date outside of allowed range (6 months to 10 years)
              </p>
            ) : (
              <p className="font-bold text-secondary">
                Will be delivered {Dayjs(date).fromNow()}
              </p>
            )}
          </div>
        )}
        <p className="text-end text-xs text-red-500">{errors?.message}</p>
      </div>
    </>
  );
}
