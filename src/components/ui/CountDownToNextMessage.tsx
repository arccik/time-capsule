import React, { CSSProperties, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Loader from "./Loader";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountDownToNextMessage() {
  const { data, status } = api.capsule.openNext.useQuery();
  const targetDate = data?.dateTime; // Replace with the actual date from Prisma

  const calculateTimeRemaining = (): CountdownValues => {
    const now = new Date();
    const timeDifference = Number(targetDate) - Number(now);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState<CountdownValues>(
    calculateTimeRemaining()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (status === "loading") return <Loader />;
  if (status === "error") return <div>Something went wrong..</div>;

  return (
    <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeRemaining.days } as CSSProperties}
          ></span>
        </span>
        days
      </div>
      <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeRemaining.hours } as CSSProperties}
          ></span>
        </span>
        hours
      </div>
      <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeRemaining.minutes } as CSSProperties}
          ></span>
        </span>
        min
      </div>
      <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": timeRemaining.seconds } as CSSProperties}
          ></span>
        </span>
        sec
      </div>
    </div>
  );
}
