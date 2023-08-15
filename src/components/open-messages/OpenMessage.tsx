import CommentBar from "~/components/open-messages/CommentBar";
import {
  AiOutlineFacebook,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import type { Capsule } from "@prisma/client";
import SocialShareButtons from "./SocialShareButtons";

export default function OpenMessage({ data }: { data: Capsule }) {
  return (
    <div className="relative mx-auto max-w-[800px]">
      <div className="card self-center">
        <div className="card-body">
          <h2 className="font-bol card-title  text-slate-200 md:text-xl">
            {data.subject}
          </h2>
          <div>
            <p className="-mt-3 text-sm text-slate-700 dark:text-slate-300">
              Opened - {data.openedAt?.toDateString()}
            </p>
          </div>
          <p className="float-right mt-10 flex max-h-[160px] overflow-hidden whitespace-pre-line text-lg font-semibold dark:text-white md:text-2xl">
            <q>{data.message}</q>
          </p>
          <SocialShareButtons message={data.message} title={data.subject} />

          <div className="card-actions mt-10">
            <CommentBar id={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
