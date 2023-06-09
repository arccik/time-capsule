import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loader from "../layout/Loader";
import { useSession } from "next-auth/react";

export default function LikeButton({ id }: { id: string }) {
  const {
    data: totalLikes,
    status: likesStatus,
    refetch: refetchTotal,
  } = api.capsule.totalLikes.useQuery({ id });

  const {
    data: liked,
    status: checkStatus,
    refetch: refetchLiked,
  } = api.like.checkIfLiked.useQuery({
    id,
  });

  const proccedLike = api.capsule.like.useMutation({
    onSuccess: async () => {
      await refetchTotal();
      await refetchLiked();
      setPressed(true);
    },
  });
  const { status } = useSession();
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setPressed(!!liked);
  }, [liked]);

  if (likesStatus === "loading" || checkStatus === "loading") return <Loader />;

  const handleLike = () => {
    setPressed((prev) => !prev);
    proccedLike.mutate({ id });
  };

  if (pressed)
    return (
      <button onClick={handleLike} className="btn-secondary btn-xs btn">
        {totalLikes}{" "}
        <AiFillHeart className="ml-2 mr-2" size={18} color="#fff" />
        Liked
      </button>
    );

  return (
    <button
      onClick={handleLike}
      className="btn-primary btn-xs btn"
      disabled={status === "unauthenticated"}
    >
      {totalLikes}{" "}
      <AiOutlineHeart className="ml-2 mr-2" size={18} color="#fff" /> Like
    </button>
  );
}
