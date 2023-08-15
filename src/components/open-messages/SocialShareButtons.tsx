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

export default function SocialShareButtons({
  message,
  title,
}: {
  message: string;
  title?: string;
}) {
  return (
    <div className="card-actions absolute bottom-2 right-5 flex text-slate-600 dark:text-slate-500">
      <p className="self-center text-xs font-semibold">Share</p>
      <FacebookShareButton
        url={window.location.href}
        quote={message}
        hashtag={"messageTTF, Time Caspule"}
      >
        <AiOutlineFacebook
          className="cursor-pointer hover:text-sky-800"
          size={25}
        />
      </FacebookShareButton>
      <WhatsappShareButton url={window.location.href} title={""}>
        <AiOutlineWhatsApp
          className="cursor-pointer hover:text-sky-800"
          size={25}
        />
      </WhatsappShareButton>
      <TwitterShareButton
        url={window.location.href}
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
}
