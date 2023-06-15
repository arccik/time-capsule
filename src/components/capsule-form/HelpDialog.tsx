import { useRef, useState, useEffect } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function HelpDialog() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>
        <BsQuestionCircle className="m-2 cursor-pointer text-xl font-bold hover:text-primary hover:drop-shadow-md" />
      </button>

      {open && (
        <div
          ref={ref}
          className="border-3 absolute right-2 top-8 z-10 mt-10  w-[90%] rounded-lg bg-slate-100 p-6 pt-4 shadow-lg md:w-3/5"
        >
          <ol className="list-inside list-disc text-sm">
            <li>
              <b className=" font-bold">Craft your message:</b> Write a
              heartfelt or meaningfol message.
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
              <b className=" font-bold">Submit & wait:</b> Send your request and
              await the specified date or delivery.
            </li>
          </ol>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="absolute right-0 top-0 m-2"
          >
            <AiOutlineCloseCircle className="text-2xl text-red-400 hover:text-red-800" />
          </button>
        </div>
      )}
    </>
  );
}
