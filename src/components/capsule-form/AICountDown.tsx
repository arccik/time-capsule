import React, { useState, useEffect } from "react";


const AiCountdown = ({ time }: { time: Date | undefined }) => {
  const [countdown, setCountdown] = useState({
    years: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!time) return;
    const calculateCountdown = () => {
      const currentDate = new Date().valueOf();
      const targetDate = new Date(time).valueOf();

      const totalSeconds = Math.floor((targetDate - currentDate) / 1000);

      const years = Math.floor(totalSeconds / (3600 * 24 * 365));
      //   const months = Math.floor(
      //     (totalSeconds % (3600 * 24 * 365)) / (3600 * 24 * 30)
      //   );
      // const days = Math.floor(
      //   ((totalSeconds % (3600 * 24 * 365)) % (3600 * 24 * 30)) / (3600 * 24)
      // );
      //   const hours = Math.floor(
      //     (((totalSeconds % (3600 * 24 * 365)) % (3600 * 24 * 30)) %
      //       (3600 * 24)) /
      //       3600
      //   );
      const minutes = Math.floor(
        ((((totalSeconds % (3600 * 24 * 365)) % (3600 * 24 * 30)) %
          (3600 * 24)) %
          3600) /
          60
      );
      const seconds = Math.floor(
        (((totalSeconds % (3600 * 24 * 365)) % (3600 * 24 * 30)) %
          (3600 * 24)) %
          60
      );

      setCountdown({ years, minutes, seconds });
    };

    const countdownInterval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [time]);

  return (
    <div className="relative  grid auto-cols-max grid-flow-col justify-center gap-5 text-center">
      {Object.entries(countdown).map(([key, value]) => (
        <div
          className="rounded-box  flex flex-col bg-primary p-2 text-neutral-content shadow-md"
          key={key}
        >
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": value } as React.CSSProperties}></span>
          </span>
          {key}
        </div>
      ))}
    </div>
  );
};

export default AiCountdown;
