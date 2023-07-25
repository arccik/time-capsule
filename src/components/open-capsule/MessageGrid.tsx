import React, { useState } from "react";
import MessageCard from "./MessageCard";
import Pagination from "../layout/Pagination";
import { Capsule } from "@prisma/client";

export default function MessageGrid({
  data,
  totalPages,
}: {
  data: Capsule[];
  totalPages: number;
}) {
  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
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
        {data?.map((capsule) => (
          <MessageCard
            totalLikes={10}
            id={capsule.id}
            key={capsule.id}
            message={capsule.message}
            subject={capsule.subject}
            createdAt={capsule.createdAt}
            totalComments={1}
          />
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </section>
  );
}
