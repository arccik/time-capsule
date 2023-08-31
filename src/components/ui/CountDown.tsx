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

    const remainingYears = Math.floor(
      remainingMilliseconds / (365 * 24 * 60 * 60 * 1000)
    );
    const remainingMonths = Math.floor(
      (remainingMilliseconds % (365 * 24 * 60 * 60 * 1000)) /
        (30 * 24 * 60 * 60 * 1000)
    );
    const remainingDays = Math.floor(
      (remainingMilliseconds % (30 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    return {
      remainingYears,
      remainingMonths,
      remainingDays,
    };
  };

  const renderer = ({ hours, minutes, seconds }: CountdownRenderProps) => {
    const { remainingYears, remainingMonths, remainingDays } =
      calculateRemainingTime();

    return (
      <div className="grid auto-cols-max grid-flow-col text-center md:gap-5">
        {remainingYears > 0 && (
          <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
            <span className="countdown font-mono md:md:text-5xl">
              <span
                style={{ "--value": remainingYears } as CSSProperties}
              ></span>
            </span>
            Years
          </div>
        )}
        <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
          <span className="countdown font-mono md:md:text-5xl">
            <span
              style={{ "--value": remainingMonths } as CSSProperties}
            ></span>
          </span>
          months
        </div>
        <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
          <span className="countdown font-mono md:md:text-5xl">
            <span style={{ "--value": remainingDays } as CSSProperties}></span>
          </span>
          days
        </div>
        <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
          <span className="countdown font-mono md:text-5xl">
            <span style={{ "--value": hours } as CSSProperties}></span>
          </span>
          hours
        </div>
        <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
          <span className="countdown font-mono md:text-5xl">
            <span style={{ "--value": minutes } as CSSProperties}></span>
          </span>
          min
        </div>
        <div className="rounded-box flex flex-col p-2 text-neutral-content md:bg-primary">
          <span className="countdown font-mono md:text-5xl">
            <span style={{ "--value": seconds } as CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
    );
  };
  if (!data) return null;
  return <Countdown date={data.dateTime} renderer={renderer} />;
}

export default YearCountdown;
