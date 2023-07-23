import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaQuoteLeft, FaQuoteRight, FaTrash } from "react-icons/fa";
import TimeAgo from "timeago-react";
import Loader from "~/components/layout/Loader";
import CommentBar from "~/components/open-capsule/CommentBar";
import { api } from "~/utils/api";

export default function OpenCapsulePage() {
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const { query, back } = useRouter();
  const { data: sessionData } = useSession();
  const { data, status, refetch } = api.capsule.getOne.useQuery({
    id: query.id as string,
  });
  const deleteCapsule = api.capsule.delete.useMutation({
    onSuccess: async () => {
      await refetch();
      console.log("success");
    },
    onMutate: (capsule) => {
      setLoadingMessage(capsule.id);
    },
  });

  if (status === "loading") return <Loader />;
  if (status === "error" || !data) return <div>Ops. something went wrong!</div>;
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90% pb-10">
      <button
        className="btn-ghost btn-xs btn ml-3 mt-10 border border-stone-300 md:ml-10"
        onClick={() => back()}
      >
        <BiArrowBack />
        Back
      </button>
      <div className="relative mx-auto max-w-[800px]">
        <div className="card glass m-2 mt-10 self-center">
          <div className="card-body">
            {sessionData?.user?.id === data.userId && (
              <div className="card-actions absolute right-4 top-4">
                <button
                  onClick={() => deleteCapsule.mutate({ id: data.id })}
                  className="btn-secondary btn-square btn-sm btn"
                >
                  <FaTrash />
                </button>
              </div>
            )}

            <h2 className="card-title font-bold md:text-2xl">{data.subject}</h2>
            <p className="-mt-3 text-sm text-base-200">
              Closed - <TimeAgo datetime={data.createdAt} />
            </p>
            <p className="float-right mt-10 flex max-h-[160px] overflow-hidden whitespace-pre-line text-lg italic">
              <q>{data.message}</q>
            </p>

            <div className="card-actions mt-10">
              <CommentBar id={data.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
