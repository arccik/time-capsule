import React from "react";
import clsx from "clsx";
import { api } from "~/utils/api";
import { FaThumbsUp } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function LikeButton({ id }: { id: string }) {
  const { status: sessionStatus } = useSession();
  const { data: totalLikes, refetch: refetchTotal } =
    api.capsule.totalLikes.useQuery({ id });

  const { data: liked, refetch: refetchLiked } = api.like.checkIfLiked.useQuery(
    {
      id,
    },
    { enabled: sessionStatus === "unauthenticated" }
  );

  const proccedLike = api.capsule.like.useMutation({
    onSuccess: async () => {
      await refetchTotal();
      await refetchLiked();
    },
  });

  const handleLike = () => {
    if (sessionStatus === "unauthenticated") return;
    proccedLike.mutate({ id });
  };

  return (
    <button
      disabled={sessionStatus === "unauthenticated"}
      onClick={handleLike}
      className={clsx({
        "btn btn-ghost btn-xs rounded-full border  text-xs text-white disabled:border disabled:border-white disabled:bg-transparent disabled:text-white":
          true,
        "border-red-200": liked,
      })}
    >
      {totalLikes}
      <FaThumbsUp className="ml-2" size={12} color="#fff" />
    </button>
  );
}
