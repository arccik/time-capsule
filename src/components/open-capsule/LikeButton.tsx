import React, { useState } from "react";
import { api } from "~/utils/api";

type Props = {
  id: string;
};

export default function LikeButton({ id }: Props) {
  const proccedLike = api.capsule.like.useMutation({
    onSuccess: () => setPressed(true),
  });
  console.log("LIKE BUTTON :)) ", id);
  const [pressed, setPressed] = useState(true);

  if (pressed)
    return <button className="btn-secondary btn-sm btn">Liked</button>;

  return (
    <button
      onClick={() => proccedLike.mutate({ id })}
      className="btn-primary btn-sm btn"
    >
      Like
    </button>
  );
}
