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
          <div className="card-actions absolute bottom-2 right-5 flex text-slate-600 dark:text-slate-500">
            <p className="self-center text-xs font-semibold">Share</p>
            <FacebookShareButton
              url={window.location.href}
              quote={data.message.slice(0, 100)}
            >
              <AiOutlineFacebook
                className="cursor-pointer hover:text-sky-800"
                size={25}
              />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href}>
              <AiOutlineWhatsApp
                className="cursor-pointer hover:text-sky-800"
                size={25}
              />
            </WhatsappShareButton>
            <TwitterShareButton url={window.location.href}>
              <AiOutlineTwitter
                className="cursor-pointer hover:text-sky-800"
                size={25}
              />
            </TwitterShareButton>
          </div>

          <div className="card-actions mt-10">
            <CommentBar id={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
