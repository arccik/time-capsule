import TimeAgo from "timeago-react";

export default function CountDown({ date }: { date: Date }) {
  if (!date) return null;
  return (
    <div className=" flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden  bg-cover bg-top p-4">
      <div className="stats grid justify-items-center shadow drop-shadow-md">
        <div className="stat">
          <div className="stat-title text-primary">
            The message will be encapsulated till
          </div>
          <div className="stat-value">{date?.toDateString()}</div>
        </div>
      </div>
    </div>
  );
}
