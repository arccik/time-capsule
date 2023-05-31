export default function CountDown() {
  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-5 text-center">
      {["years", "months", "days", "hours", "minutes", "seconds"].map((key) => (
        <div
          className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content"
          key={key}
        >
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 15 } as React.CSSProperties}></span>
          </span>
          {key}
        </div>
      ))}
    </div>
  );
}
