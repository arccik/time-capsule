import { useState } from "react";
import { AiFillCalendar, AiFillCloseCircle } from "react-icons/ai";
import Calendar from "react-calendar";
import Card from "../layout/Card";
import type { FormProps } from "~/types/useFormProps";
import "react-calendar/dist/Calendar.css";

export default function DeliveryIn({
  setValue,
  errors,
  clearErrors,
  unregister,
}: Pick<FormProps, "setValue" | "errors" | "clearErrors" | "unregister">) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);

  const MIN_DATE = new Date(new Date().setMonth(new Date().getMonth() + 5));
  const MAX_DATE = new Date(new Date().setMonth(new Date().getMonth() + 121));

  const handleDateChange = (value: Date) => {
    setDate(value);
    setValue("dateTime", value);
    clearErrors("dateTime");
  };
  const handleButtonClick = (value: number) => {
    const date = new Date();
    const newDate = new Date(date.setMonth(date.getMonth() + value));
    handleDateChange(newDate);
    clearErrors("dateTime");
  };

  return (
    <Card
      title="Deliver By"
      subtitle=" Select the period when you want to receive the message"
      errors={errors}
      actions={
        date ? (
          <AiFillCloseCircle
            size={30}
            onClick={() => {
              setDate(null);
              unregister("dateTime");
            }}
            className="cursor-pointer hover:text-red-500"
          />
        ) : (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">Calendar</span>
              <AiFillCalendar
                className="text-2xl"
                onClick={() => setShowCalendar((prev) => !prev)}
              />
            </label>
            {showCalendar && (
              <Calendar
                className="absolute right-10 top-32 z-10"
                minDate={MIN_DATE}
                maxDate={MAX_DATE}
                value={date}
                onChange={(e) => {
                  if (e instanceof Date) {
                    setDate(e);
                    handleDateChange(e);
                  }
                }}
              />
            )}
          </div>
        )
      }
    >
      {date ? (
        <p className="text-center text-2xl font-bold">{date.toDateString()}</p>
      ) : (
        <div className="mt-2 flex  justify-between">
          <button
            type="button"
            className="btn-primary btn-xs btn"
            onClick={() => handleButtonClick(6)}
          >
            6 months
          </button>
          <button
            type="button"
            className="btn-primary btn-xs btn "
            onClick={() => handleButtonClick(12)}
          >
            1 year
          </button>
          <button
            type="button"
            className="btn-primary btn-xs btn "
            onClick={() => handleButtonClick(36)}
          >
            3 years
          </button>
          <button
            type="button"
            className="btn-primary btn-xs btn "
            onClick={() => handleButtonClick(60)}
          >
            5 years
          </button>
          <button
            type="button"
            className="btn-primary btn-xs btn"
            onClick={() => handleButtonClick(120)}
          >
            10 years
          </button>
        </div>
      )}
    </Card>
  );
}
