import React from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";

import TimeAgo from "timeago-react";
// import LikeButton from "./LikeButton";

export default function OpenCapsules() {
  const { data: capsuleData, status } = api.capsule.getOpenCapsules.useQuery();

  if (status !== "success") return <Loader />;
  if (!capsuleData?.length) return null;
  return (
    <div className="-inner grid grid-flow-row gap-4">
      <h1 className="ml-10 self-center text-3xl font-bold text-primary">
        Public time capsules<b className="text-secondary"> from the past </b>
      </h1>
      {capsuleData.map((capsule) => (
        <div className="card glass" key={capsule.id}>
          <div className="card-body">
            <h2 className="card-title">{capsule.subject}</h2>
            <p className="-mt-3 text-xs text-slate-400">
              Closed - <TimeAgo datetime={capsule.createdAt} />
            </p>
            <p className="font- max-h-[160px] overflow-hidden whitespace-pre-line text-sm">
              {capsule.message}
            </p>
            <div className="card-actions justify-between">
              <button className="btn-primary btn-sm btn">Like</button>
              <button className="btn-primary btn-sm btn">Comments</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
