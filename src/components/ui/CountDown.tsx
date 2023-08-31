import React, { CSSProperties } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { api } from "~/utils/api";
import Loader from "./Loader";

function YearCountdown() {
  const { data, status } = api.capsule.openNext.useQuery();
  if (status === "loading") return <Loader />;
  if (status === "error") return <div>Something went wrong...</div>;
  if (!data) return null;

  const calculateRemainingTime = () => {
    const currentDate = new Date();
    const remainingMilliseconds =
      data.dateTime.getTime() - currentDate.getTime();

    const years = Math.floor(
      remainingMilliseconds / (365 * 24 * 60 * 60 * 1000)
    );
    const months = Math.floor(
      (remainingMilliseconds % (365 * 24 * 60 * 60 * 1000)) /
        (30 * 24 * 60 * 60 * 1000)
    );
    const days = Math.floor(
      (remainingMilliseconds % (30 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    return {
      years,
      months,
      days,
    };
  };

  const renderer = ({ hours, minutes, seconds }: CountdownRenderProps) => {
    const { years, months, days } = calculateRemainingTime();

    const filtredListOfboxesToShow = Object.entries({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    }).filter(([, value]) => value > 0);

    const toDisplay = filtredListOfboxesToShow.map(([key, value]) => (
      <div
        key={key}
        className="rounded-box flex flex-col bg-primary p-2 text-neutral-content drop-shadow-md"
      >
        <span className="countdown justify-center font-mono md:md:text-5xl">
          <span style={{ "--value": value } as CSSProperties}></span>
        </span>
        {key}
      </div>
    ));
    return (
      <div className="grid auto-cols-max grid-flow-col gap-2 text-center md:gap-5">
        {toDisplay}
      </div>
    );
  };
  if (!data) return null;
  return <Countdown date={data.dateTime} renderer={renderer} />;
}

export default YearCountdown;
