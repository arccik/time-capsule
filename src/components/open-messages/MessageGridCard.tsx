import ActionButton from "./ActionButton";
import type { Capsule, User } from "@prisma/client";
import Image from "next/image";
import ShowFromToDate from "./ShowFromToDate";
import AudioPlayer from "./AudioPlayer";

type MessageCardType = {
  data: Capsule & {
    likes: { id: string }[];
    comments: { id: string }[];
    user: {
      image: string | null;
      name: string | null;
      email: string | null;
    };
  };
  setActiveCard: (id: string) => void;
};

export default function MessageCard({ data, setActiveCard }: MessageCardType) {
  return (
    <>
      <figure className="card glass relative rounded-xl p-4 shadow-slate-900/10 md:p-6">
        {/* author section */}

        <div className="mb-4 flex items-center">
          {/* {data?.user.image && (
            <img
              className="mr-2 h-5 w-5 rounded-full"
              src={data?.user.image}
              alt="avatar"
            />
          )} */}
          <div className="text-sm">
            <p className="leading-none text-slate-500 ">
              Author {data.user.name}
            </p>
          </div>
        </div>
        <h1
          className=" mb-4 cursor-pointer text-xl font-bold text-slate-700"
          onClick={() => setActiveCard(data.id)}
        >
          {data.subject}
        </h1>
        <ShowFromToDate from={data.createdAt} to={data.openedAt} />

        {data.voiceMessage && <AudioPlayer url={data.voiceMessage} />}
        <button className="text-left" onClick={() => setActiveCard(data.id)}>
          <blockquote className="relative">
            <p className="mt-5 line-clamp-3 text-lg tracking-tight text-slate-900">
              {data.message}
            </p>
          </blockquote>
        </button>

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
