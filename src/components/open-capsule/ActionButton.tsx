import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import clsx from "clsx";

type Props =
  | {
      type: "like";
      id: string;
      totalLikes: number;
      refetch: () => void;
    }
  | {
      type: "comment";
      id: string;
      totalComments: number;
    };

export default function ActionButton(props: Props) {
  const { type } = props;
  const { status } = useSession();
  const router = useRouter();
  const totalCount =
    type === "comment" ? props.totalComments : props.totalLikes;

  const { data: likedByUser, refetch: refetchLiked } =
    api.like.checkIfLiked.useQuery(
      {
        id: props.id,
      },
      { enabled: status === "authenticated" }
    );

  const proccedLike = api.capsule.like.useMutation({
    onSuccess: async () => {
      console.log("Page Liked");
    },
  });

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
    if (type === "like") {
      proccedLike.mutate({ id: props.id });
      props.refetch();
      refetchLiked();
    }
    if (type === "comment") {
      router.push(`/message/${props.id}`);
    }
  };

  return (
    <div className="mt-1 text-sm">
      <div className="flex items-center text-slate-500">
        <span
          className={clsx("cursor-pointer hover:text-slate-900", {
            "text-red-700 hover:text-red-400": type === "like" && likedByUser,
          })}
          onClick={handleClick}
        >
          {type === "comment" ? "💬 Comment" : "♡  Like"}
        </span>
        <span className="ml-1 h-5 w-10 rounded-md bg-slate-100 bg-opacity-30 text-center drop-shadow-md">
          {totalCount}
        </span>
      </div>
    </div>
  );
}
