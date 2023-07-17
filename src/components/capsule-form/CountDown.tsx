import TimeAgo from "timeago-react";

export default function CountDown({ date }: { date: Date }) {
  if (!date) return null;
  return (
    <div className="flex items-center justify-center p-4">
      <div className="stats grid justify-items-center shadow drop-shadow-md">
        <div className="stat">
          <div className="stat-title">Message will be delivered</div>
          <TimeAgo className="stat-value" datetime={date} />
          <div className="stat-desc">on {date?.toDateString()}</div>
        </div>
      </div>
    </div>
  );
}
