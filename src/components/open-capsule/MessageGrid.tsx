import React from "react";
import MessageCard from "./MessageCard";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";

export default function MessageGrid() {
  const { data, status, refetch } = api.capsule.getOpenCapsules.useQuery({
    page: 1,
  });

  if (status !== "success") return <Loader />;
  if (!data?.length) return null;
  const [capsules, totalCapsule] = data;
  return (
    <section className="items-center p-2 md:p-10">
      <h1 className="mb-10 mt-10 text-center text-5xl font-bold">
        Public Messages
      </h1>
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        {capsules.map((capsule) => (
          <MessageCard
            totalLikes={capsule.likes.length}
            id={capsule.id}
            key={capsule.id}
            message={capsule.message}
            subject={capsule.subject}
            createdAt={capsule.createdAt}
            totalComments={capsule.comments.length}
            refetch={refetch}
          />
        ))}
      </ul>
    </section>
  );
}
