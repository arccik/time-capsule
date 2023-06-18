import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function LikeButton({ id }: { id: string }) {
  const { data: totalLikes, refetch: refetchTotal } =
    api.capsule.totalLikes.useQuery({ id });

  const { data: liked, refetch: refetchLiked } = api.like.checkIfLiked.useQuery(
    {
      id,
    }
  );

  const proccedLike = api.capsule.like.useMutation({
    onSuccess: async () => {
      await refetchTotal();
      await refetchLiked();
      setPressed(true);
    },
  });
  const { status: sessionStatus } = useSession();
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setPressed(!!liked);
  }, [liked]);

  // if (likesStatus === "loading" || checkStatus === "loading") return <Loader />;

  const handleLike = () => {
    if (sessionStatus === "unauthenticated") return;
    setPressed((prev) => !prev);
    proccedLike.mutate({ id });
  };

  if (pressed)
    return (
      <button
        onClick={handleLike}
        className="btn-secondary btn-xs btn  absolute right-0 top-0"
      >
        {totalLikes && totalLikes > 0 ? totalLikes : null}
        <FaThumbsDown className="ml-2 mr-2" size={18} color="#fff" />
        Liked
      </button>
    );

  return (
    <button
      onClick={handleLike}
      className="btn-ghost btn-xs btn  absolute right-2 top-2 text-white"
    >
      <FaThumbsUp className="ml-2 mr-2" size={18} color="#fff" />{" "}
      {totalLikes && totalLikes > 0 ? totalLikes.toString() + " Likes" : null}
    </button>
  );
}
