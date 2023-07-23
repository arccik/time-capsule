import Link from "next/link";
import ActionButton from "./ActionButton";
import TimeAgo from "timeago-react";

type Props = {
  id: string;
  subject: string;
  createdAt: Date;
  message: string;
  totalLikes: number;
  totalComments: number;
  refetch: () => void;
};

export default function MessageCard({
  id,
  subject,
  createdAt,
  message,
  totalLikes,
  totalComments,
  refetch,
}: Props) {
  return (
    <li>
      <figure className="glass relative rounded-2xl p-6 shadow-xl shadow-slate-900/10">
        <Link href={`/message/${id}`}>
          <h1>{subject}</h1>
          <blockquote className="relative">
            <p className="truncate text-lg tracking-tight text-slate-900">
              {message}
            </p>
          </blockquote>
        </Link>

        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-300 pt-6">
          <div>
            <div className="font-display text-base text-slate-300">
              Created - <TimeAgo datetime={createdAt} />
            </div>
            <div className="flex items-center gap-2">
              <ActionButton
                type="like"
                id={id}
                totalLikes={totalLikes}
                refetch={refetch}
              />
              <ActionButton
                type="comment"
                id={id}
                totalComments={totalComments}
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-full bg-slate-50"></div>
        </figcaption>
      </figure>
    </li>
  );
}