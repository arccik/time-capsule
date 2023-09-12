import {
  AiOutlineFacebook,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { GrShare } from "react-icons/gr";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { env } from "~/env.mjs";

export default function SocialShareButtons({
  message,
  id,
}: {
  message: string;
  id: string;
}) {
  const url = `${env.NEXT_PUBLIC_CLIENT_URL}/message/${id}`;
  const buttons = (
    <div className="card-actions absolute bottom-0  right-5 flex text-slate-600">
      <p className="self-center text-xs font-semibold">Share</p>
      <FacebookShareButton
        url={url}
        quote={message}
        hashtag={"messageTTF, Time Caspule"}
      >
        <AiOutlineFacebook
          className="cursor-pointer hover:text-sky-800"
          size={25}
        />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={""}>
        <AiOutlineWhatsApp
          className="cursor-pointer hover:text-sky-800"
          size={25}
        />
      </WhatsappShareButton>
      <TwitterShareButton
        url={url}
        hashtags={["messageTTF", "TimeCaspule", "fromThePast"]}
        title={message}
      >
        <AiOutlineTwitter
          className="cursor-pointer hover:text-sky-800"
          size={25}
        />
      </TwitterShareButton>
    </div>
  );
  return (
    <div className="dropdown dropdown-left dropdown-top absolute bottom-2 right-5">
      <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
        <AiOutlineShareAlt size="lg" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content rounded-box z-[1] w-64 bg-base-100 shadow"
      >
        {buttons}
      </div>
    </div>
  );
}
