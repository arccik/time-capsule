// import dateFormatter from "~/lib/dateFormatter";
import YearsRange from "./YearsRange";
import Calendar from "react-calendar";

import {
  type Control,
  Controller,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import type { Capsule } from "~/types/capsule";
import { addYears } from "~/lib/addDays";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

type Props = {
  register: UseFormRegister<Capsule>;
  date: Date | undefined;
  setValue: UseFormSetValue<Capsule>;
  control: Control<Capsule>;
};

export default function AgeRange({ register, date, setValue, control }: Props) {
  const [state, setState] = useState(true);
  console.log("Date Onn Rage ", date);
  return (
    <div className="border-3 w-full rounded-lg bg-slate-100 p-6 pt-4 shadow-lg">
      <div className="flex flex-row justify-between gap-4">
        <p className="font-bold">Deliver on </p>
        <div className="flex flex-row gap-4">
          <p className="font-bold text-primary">Calendar </p>
          <input
            type="checkbox"
            className="toggle-secondary toggle"
            checked={state}
            onChange={() => setState((prev) => !prev)}
          />
        </div>
      </div>

      {state ? (
        <Controller
          control={control}
          name="dateTime"
          render={({ field }) => (
            <div className="m-3 grid justify-center p-3">
              <Calendar
                maxDate={addYears(10)}
                minDate={addYears(1)}
                className="rounded-lg border-none"
                onChange={(date) => field.onChange(date)}
                value={new Date(field.value)}
              />
            </div>
          )}
        />
      ) : (
        <YearsRange
          rest={register("dateTime", {
            setValueAs: (v: string) => {
              const value = parseInt(v);
              setValue("openIn", value);
              return addYears(value);
            },
          })}
        />
      )}
      <p className="font-bold">Deliver on {date?.toDateString()}</p>
    </div>
  );
}
