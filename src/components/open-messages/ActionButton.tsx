import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import clsx from "clsx";

type Props =
  | {
      type: "like";
      id: string;
      totalLikes?: number;
    }
  | {
      type: "comment";
      id: string;
      totalComments?: number;
    };

export default function ActionButton(props: Props) {
  const { type } = props;
  const [totalCount, setTotalCount] = useState(
    (type === "comment" ? props.totalComments : props.totalLikes) || 0
  );
  const { status } = useSession();
  const router = useRouter();
  // let totalCount = type === "comment" ? props.totalComments : props.totalLikes;

  const { data: likedByUser, refetch: refetchLiked } =
    api.like.checkIfLiked.useQuery(
      {
        id: props.id,
      },
      { enabled: status === "authenticated" }
    );

  const proccedLike = api.capsule.like.useMutation({
    onSuccess: async () => {
      await refetchLiked();
    },
  });

  const handleClick = () => {
    if (type === "comment") {
      void router.push(`/message/${props.id}?showCommentBar=true`);
      return;
    }
    if (status !== "authenticated" && type === "like") {
      void router.push("/auth/login");
      return;
    }
    if (type === "like") {
      proccedLike.mutate({ id: props.id });

      refetchLiked().then(console.log).catch(console.error);
    }
  };
  const buttonLabel =
    type === "comment" ? "💬 Comment" : likedByUser ? "♡ Liked" : "♡  Like";
  return (
    <div className="mt-1 text-sm">
      <div className="flex items-center text-slate-500">
        <span
          className={clsx("cursor-pointer hover:text-slate-900", {
            "text-red-700 hover:text-red-400": type === "like" && likedByUser,
          })}
          onClick={handleClick}
        >
          {buttonLabel}
        </span>
        <span className="ml-1 h-5 w-10 rounded-md bg-slate-100 bg-opacity-30 text-center drop-shadow-md">
          {totalCount + (likedByUser ? 1 : 0)}
        </span>
      </div>
    </div>
  );
}
