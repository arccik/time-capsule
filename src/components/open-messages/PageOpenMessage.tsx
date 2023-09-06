import CommentBar from "~/components/open-messages/CommentBar";
import type { Capsule, User } from "@prisma/client";
import SocialShareButtons from "./SocialShareButtons";
import AudioPlayer from "./AudioPlayer";
import dateFormatter from "~/lib/dateFormatter";

export default function PageOpenMessage({
  data,
}: {
  data: Capsule & {
    user: {
      image: string | null;
      name: string | null;
      email: string | null;
    };
  };
}) {
  return (
    <div className="relative mx-auto max-w-[800px]">
      <div className="card self-center">
        <div className="card-body">
          <h2 className="font-bol card-title  text-slate-200 md:text-xl">
            {data.subject}
          </h2>
          <div>
            <p className="-mt-3 text-sm text-slate-700">By {data.user.name}</p>
          </div>
          {data.voiceMessage && <AudioPlayer url={data.voiceMessage} />}
          <p className="mt-10  text-lg font-semibold">
            <q>{data.message}</q>
          </p>
          {data.openedAt && (
            <p className="mt-10 text-sm text-slate-700">
              Opened - {dateFormatter(data.openedAt)}
            </p>
          )}

          <div className="card-actions mt-10">
            <CommentBar id={data.id} />
          </div>
          <SocialShareButtons message={data.message} id={data.id} />
        </div>
      </div>
    </div>
  );
}
