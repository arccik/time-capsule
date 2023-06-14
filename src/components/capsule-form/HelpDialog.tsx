import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function HelpDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>
        <BsQuestionCircle className="m-2 cursor-pointer text-xl font-bold hover:text-primary hover:drop-shadow-md" />
      </button>
      {open && (
        <div className="border-3 absolute right-2 top-8 z-10 mt-10  w-[90%] rounded-lg bg-slate-100 p-6 pt-4 shadow-lg md:w-3/5">
          <h1 className="m-2 mr-4 text-center text-xl font-bold text-primary">
            How it Works
          </h1>
          <p className=" font-bold">
            A Place where you can store your memories and thoughts for future
            generations. Whether you want to share your hopes and dreams for the
            future, or simply document your life today, The time capsule is an
            ideal way to preserve your legacy, goals and achievements{" "}
          </p>
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
