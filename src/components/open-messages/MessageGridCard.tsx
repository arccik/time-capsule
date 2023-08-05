import ActionButton from "./ActionButton";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { Drawer } from "vaul";
import OpenMessage from "./OpenMessage";
import { Capsule } from "@prisma/client";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

export default function MessageCard({
  data,
  setActiveCard,
}: {
  data: Capsule;
  setActiveCard: (id: string) => void;
}) {
  return (
    <>
      <figure className="card glass relative rounded-xl p-6 shadow-xl shadow-slate-900/10 dark:shadow-slate-200/10 dark:drop-shadow-lg">
        <button className="text-left" onClick={() => setActiveCard(data.id)}>
          <h1 className=" mb-1 text-gray-300  dark:text-slate-300">
            {data.subject}
          </h1>
          <blockquote className="relative">
            <p className="mb-5 line-clamp-3 text-lg tracking-tight text-slate-900 dark:text-white">
              {data.message}
            </p>
          </blockquote>
        </button>
        <div className="font-display flex w-full flex-row justify-between text-sm text-slate-300 ">
          <p>
            {data.createdAt.toDateString()}
            <HiLockClosed className="float-left mr-2" />
          </p>
          <FaLongArrowAltRight />
          {data.openedAt && (
            <p>
              {data.openedAt.toDateString()}
              <HiLockOpen className="float-left mr-2" />
            </p>
          )}
        </div>

        <figcaption className="relative mt-6  items-center justify-between border-t border-slate-300 pt-6">
          <div>
            <div className="flex items-center gap-2">
              <ActionButton type="like" id={data.id} totalLikes={0} />
              <ActionButton type="comment" id={data.id} totalComments={0} />
            </div>
          </div>
          <div className="overflow-hidden rounded-full bg-slate-50"></div>
        </figcaption>
      </figure>
    </>
  );
}
