import TimeAgo from "timeago-react";

export default function CountDown({ date }: { date: Date }) {
  return (
    <div className=" flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden  bg-cover bg-top p-4">
      <div className="stats grid justify-items-center shadow drop-shadow-md">
        <div className="stat">
          <div className="stat-title">Message will be delivered</div>
          <div className="stat-value">{date?.toDateString()}</div>
          <div className="stat-desc">
            <TimeAgo datetime={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
