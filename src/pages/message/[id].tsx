import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import TimeAgo from "timeago-react";
import Loader from "~/components/ui/Loader";
import CommentBar from "~/components/open-capsule/CommentBar";
import { api } from "~/utils/api";

export default function OpenCapsulePage() {
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data, status, refetch } = api.capsule.getOne.useQuery({
    id: router.query.id as string,
  });
  const deleteCapsule = api.capsule.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onMutate: (capsule) => {
      setLoadingMessage(capsule.id);
    },
  });

  const handleBackClick = () => {
    router
      .push("/")
      .then((v) => v)
      .catch((e: Error) => console.log(e.message));
  };
  if (status === "error") return <div>Ops. something went wrong!</div>;
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90% pb-10">
      <button
        className="btn-ghost btn-xs btn ml-3 mt-10 text-white md:ml-10"
        onClick={handleBackClick}
      >
        <BiArrowBack />
        Back
      </button>
      {status === "success" && data ? (
        <div className="relative mx-auto max-w-[800px]">
          <div className="card glass m-2 mt-10 self-center">
            <div className="card-body">
              {sessionData?.user?.id === data.userId && (
                <div className="card-actions absolute right-4 top-4">
                  <button
                    onClick={() => deleteCapsule.mutate({ id: data.id })}
                    className="btn-secondary btn-sm btn-square btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              <h2 className="card-title font-bold md:text-2xl">
                {data.subject}
              </h2>
              <p className="-mt-3 text-sm text-base-200">
                Closed - <TimeAgo datetime={data.createdAt} />
              </p>
              <p className="float-right mt-10 flex max-h-[160px] overflow-hidden whitespace-pre-line text-lg font-semibold">
                <q>{data.message}</q>
              </p>

              <div className="card-actions mt-10">
                <CommentBar id={data.id} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
}
