import { useState } from "react";
import { AiFillCalendar, AiFillCloseCircle } from "react-icons/ai";
import Calendar from "react-calendar";
import Card from "../ui/Card";
import type { FormProps } from "~/types/formProps";
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

  const rangeButtons = ["6 months", "1 year", "3 years", "5 years", "10 years"];

  const handleDateChange = (value: Date) => {
    setDate(value);
    setValue("dateTime", value);
    clearErrors("dateTime");
  };
  const handleButtonClick = (index: number) => {
    const date = new Date();
    const monthsToAdd = !index
      ? 6
      : index === 1
      ? 12
      : index === 2
      ? 36
      : index === 3
      ? 60
      : index === 4
      ? 120
      : 0;

    const newDate = new Date(date.setMonth(date.getMonth() + monthsToAdd));
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
              {showCalendar ? (
                <AiFillCalendar
                  className="text-2xl"
                  onClick={() => setShowCalendar((prev) => !prev)}
                />
              ) : (
                <AiFillCalendar
                  className="text-2xl"
                  onClick={() => setShowCalendar((prev) => !prev)}
                />
              )}
            </label>
            {showCalendar && (
              <Calendar
                className="absolute right-10 top-32 z-10"
                minDate={MIN_DATE}
                maxDate={MAX_DATE}
                defaultActiveStartDate={MIN_DATE}
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
        <div className="mt-2  flex flex-wrap gap-4 md:justify-between">
          {rangeButtons.map((button, index) => (
            <button
              key={button}
              type="button"
              className="btn-primary btn-xs btn grow md:grow-0"
              onClick={() => handleButtonClick(index)}
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
