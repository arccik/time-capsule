import { api } from "~/utils/api";
import Loader from "../layout/Loader";

import TimeAgo from "timeago-react";
import LikeButton from "./LikeButton";
import CommentBar from "./CommentBar";
import Pagination from "../layout/Pagination";
import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";

export default function OpenCapsules() {
  const [page, setPage] = useState(1);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const { data: sessionData } = useSession();

  const {
    data: capsuleData,
    status,
    refetch,
  } = api.capsule.getOpenCapsules.useQuery({
    page,
  });
  const deleteCapsule = api.capsule.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onMutate: (capsule) => {
      setLoadingMessage(capsule.id);
    },
  });
  if (status !== "success") return <Loader />;
  if (!capsuleData?.length) return null;

  return (
    <div className="-inner grid grid-flow-row gap-4">
      <h1 className="mb-10 mt-10 text-center text-5xl font-bold">
        Public Messages
      </h1>
      {capsuleData[0].map((capsule) => (
        <Fragment key={capsule.id}>
          {loadingMessage === capsule.id && <Loader />}
          <div className="card glass">
            <div className="card-body">
              {sessionData?.user?.id === capsule.userId && (
                <div className="card-actions absolute right-4 top-4">
                  <button
                    onClick={() => deleteCapsule.mutate({ id: capsule.id })}
                    className="btn-secondary btn-square btn-sm btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              <h2 className="card-title font-bold">{capsule.subject}</h2>
              <p className="-mt-3 text-xs text-secondary">
                Closed - <TimeAgo datetime={capsule.createdAt} />
              </p>
              <p className="max-h-[160px] overflow-hidden whitespace-pre-line text-lg">
                {capsule.message}
              </p>
              <div className="card-actions">
                <CommentBar id={capsule.id} />
                <LikeButton id={capsule.id} />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
      <Pagination
        currentPage={page}
        totalPages={capsuleData[1] / 5}
        setCurrentPage={setPage}
      />
    </div>
  );
}