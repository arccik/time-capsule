import { BsQuestionCircle } from "react-icons/bs";

export default function HelpDialog() {
  return (
    <div className="group">
      <BsQuestionCircle className="group m-2 cursor-pointer text-xl  font-bold hover:text-primary  hover:drop-shadow-md  " />
      <div className="border-3 group group invisible absolute right-2 top-8 z-10 mt-10 rounded-lg bg-slate-100 p-6  pt-4 shadow-lg group-hover:visible">
        <ol className="list-inside list-disc text-sm">
          <li>
            <b className=" font-bold">Craft your message:</b> Write a heartfelt
            or meaningfol message.
          </li>
          <li>
            <b className=" font-bold"> Select date & delivery:</b> Choose a
            future date and delivery method for your message.
          </li>
          <li>
            <b className=" font-bold">Enter contact details:</b> Provide the
            recipient&apos;s contact information.
          </li>
          <li>
            <b className=" font-bold">Submit:</b> Send your message to the
            future and wait for it to come.
          </li>
          <li>
            <b className=" font-bold">Credit Card Required:</b> Tiny investment
            to keep server running.
          </li>
        </ol>
      </div>
    </div>
  );
}
