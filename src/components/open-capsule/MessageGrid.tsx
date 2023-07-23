import React, { useState } from "react";
import MessageCard from "./MessageCard";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import Pagination from "../layout/Pagination";

export default function MessageGrid() {
  const [page, setPage] = useState(1);
  const { data, status, refetch } = api.capsule.getOpenCapsules.useQuery({
    page,
  });

  if (status !== "success") return <Loader />;
  if (!data?.length) return null;
  return (
    <section className="items-center p-2 md:p-10">
      <h1 className="mb-10 mt-10 text-center text-5xl font-bold">
        Public Messages
      </h1>
      <p className="-mt-10 text-center text-base-300">
        Here is going to be some nice slogan
      </p>
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        {data[0]?.map((capsule) => (
          <MessageCard
            totalLikes={capsule.likes.length}
            id={capsule.id}
            key={capsule.id}
            message={capsule.message}
            subject={capsule.subject}
            createdAt={capsule.createdAt}
            totalComments={capsule.comments.length}
            // refetch={refetch}
          />
        ))}
      </ul>
      <Pagination currentPage={page} setCurrentPage={setPage} totalPages={10} />
    </section>
  );
}
