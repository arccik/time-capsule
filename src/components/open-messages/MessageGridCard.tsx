import ActionButton from "./ActionButton";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { Drawer } from "vaul";
import OpenMessage from "./OpenMessage";
import { Capsule } from "@prisma/client";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function MessageCard({ data }: { data: Capsule }) {
  return (
    <>
      <Drawer.Root>
        <figure className="card glass relative rounded-xl p-6 shadow-xl shadow-slate-900/10 dark:shadow-slate-200/10 dark:drop-shadow-lg">
          <Drawer.Trigger asChild>
            <button className="text-left">
              <h1 className="text-sm text-slate-500  dark:text-slate-300">
                {data.subject}
              </h1>
              <blockquote className="relative">
                <p className="mb-5 line-clamp-3 text-lg tracking-tight text-slate-900 dark:text-white">
                  {data.message}
                </p>
              </blockquote>
            </button>
          </Drawer.Trigger>

          <figcaption className="relative mt-6  items-center justify-between border-t border-slate-300 pt-6">
            <div>
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
              <div className="flex items-center gap-2">
                <ActionButton type="like" id={data.id} totalLikes={0} />
                <ActionButton type="comment" id={data.id} totalComments={0} />
              </div>
            </div>
            <div className="overflow-hidden rounded-full bg-slate-50"></div>
          </figcaption>
        </figure>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="glass fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col content-center  justify-center rounded-t-[10px] dark:bg-gray-900">
            <OpenMessage data={data} />
            <Drawer.Close className="btn-error btn-outline btn-xs btn absolute right-5 top-12 rounded-full text-slate-300 md:right-24 md:top-12">
              X
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
