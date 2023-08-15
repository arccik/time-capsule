import ActionButton from "./ActionButton";
import type { Capsule } from "@prisma/client";
import Image from "next/image";
import ShowFromToDate from "./ShowFromToDate";
import { api } from "~/utils/api";

export default function MessageCard({
  data,
  setActiveCard,
}: {
  data: Capsule & { likes: { id: string }[]; comments: { id: string }[] };
  setActiveCard: (id: string) => void;
}) {
  return (
    <>
      <figure className="card glass relative rounded-xl p-6 shadow-slate-900/10 dark:shadow-slate-200/10 dark:drop-shadow-lg">
        <button className="text-left" onClick={() => setActiveCard(data.id)}>
          <h1 className=" mb-1 text-gray-300  dark:text-slate-300">
            {data.subject}
          </h1>
          {data.image && (
            <Image
              width={300}
              height={170}
              className="rounded-xl"
              src={data.image}
              alt={data.subject}
            />
          )}
          <blockquote className="relative">
            <p className="mb-5 line-clamp-3 text-lg tracking-tight text-slate-900 dark:text-white">
              {data.message}
            </p>
          </blockquote>
        </button>
        <ShowFromToDate from={data.createdAt} to={data.openedAt} />

        <figcaption className="relative mt-6  items-center justify-between border-t border-slate-300 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <ActionButton
                type="like"
                id={data.id}
                totalLikes={data.likes.length}
              />
              <ActionButton
                type="comment"
                id={data.id}
                totalComments={data.comments.length}
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-full bg-slate-50"></div>
        </figcaption>
      </figure>
    </>
  );
}
