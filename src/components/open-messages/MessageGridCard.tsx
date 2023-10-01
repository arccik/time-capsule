import ActionButton from "./ActionButton";
import type { Capsule } from "@prisma/client";
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
        <div className="flex items-center">
          <div className="text-sm">
            <p className="leading-none text-slate-500 ">{data.user.name}</p>
          </div>
        </div>
        <ShowFromToDate from={data.createdAt} to={data.openedAt} />
        <h1
          className="cursor-pointer text-xl font-bold text-slate-700"
          onClick={() => setActiveCard(data.id)}
        >
          {data.subject}
        </h1>

        {data.voiceMessage && <AudioPlayer url={data.voiceMessage} />}
        <button className="text-left" onClick={() => setActiveCard(data.id)}>
          <blockquote className="relative">
            <p className="text-md mt-2 line-clamp-3 tracking-tight text-slate-900">
              {data.message}
            </p>
          </blockquote>
        </button>

        <figcaption className="relative mt-5 items-center justify-between border-t border-slate-300 pt-2">
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
