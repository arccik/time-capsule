import { api } from "~/utils/api";
import Loader from "../layout/Loader";

import TimeAgo from "timeago-react";
import LikeButton from "./LikeButton";
import CommentBar from "./CommentBar";
import Pagination from "../layout/Pagination";
import { useState } from "react";

export default function OpenCapsules() {
  const [page, setPage] = useState(1);
  const { data: capsuleData, status } = api.capsule.getOpenCapsules.useQuery({
    page,
  });
  if (status !== "success") return <Loader />;
  if (!capsuleData?.length) return null;
  return (
    <div className="-inner grid grid-flow-row gap-4">
      <h1 className="ml-10 self-center text-xl font-bold text-primary md:text-3xl">
        Public time capsules<b className="text-secondary"> from the past </b>
      </h1>
      {capsuleData[0].map((capsule) => (
        <div className="card glass" key={capsule.id}>
          <div className="card-body">
            <h2 className="card-title">{capsule.subject}</h2>
            <p className="-mt-3 text-xs text-success-content">
              Closed - <TimeAgo datetime={capsule.createdAt} />
            </p>
            <p className="font- max-h-[160px] overflow-hidden whitespace-pre-line text-sm">
              {capsule.message}
            </p>
            <div className="card-actions ">
              <LikeButton id={capsule.id} />
              <CommentBar id={capsule.id} />
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={page}
        totalPages={capsuleData[1]}
        setCurrentPage={setPage}
      />
    </div>
  );
}
