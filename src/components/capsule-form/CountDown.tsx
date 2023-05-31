import React from "react";

export default function CountDown(props: any) {
  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-5 text-center">
      {["years", "months", "days", "hours", "minutes", "seconds"].map(
        (key, i) => (
          <div
            className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content"
            key={key}
          >
            <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
              <span style={{ "--value": 15 }}></span>
            </span>
            {key}
          </div>
        )
      )}
    </div>
  );
}
