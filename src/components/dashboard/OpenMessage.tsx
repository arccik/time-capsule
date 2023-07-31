import { useState } from "react";
import { TiEdit, TiLockOpen, TiMessages, TiTimesOutline } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Modal from "../ui/Modal";
import dateFormatter from "~/lib/dateFormatter";
import { api } from "~/utils/api";

type Props = {
  opened: Date;
  subject: string;
  isPublic: boolean;
  message: string;
  closed: Date;
  deleteMessage: () => void;
  triggerPublic: () => void;
};

export default function OpenMessage({
  opened,
  isPublic,
  message,
  closed,
  subject,
  triggerPublic,
  deleteMessage,
}: Props) {
  const [expand, setExpand] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const handleDelete = () => {
    setIsDeleteClicked(false);
    deleteMessage();
  };
  return (
    <>
      <div
        className={clsx("alert m-2 flex w-[95%] flex-row shadow-lg", {
          "alert-success": isPublic,
        })}
      >
        <div>
          <TiLockOpen className="mr-2 text-2xl" />
          <span>
            <p className="text-sm font-bold">Opened: {dateFormatter(opened)}</p>
            <span className="text-xs text-secondary">
              {isPublic ? "Public" : "Private"}
            </span>
          </span>
        </div>
        <div className="flex-none">
          <button
            className="btn-green-200 btn"
            onClick={() => setExpand((prev) => !prev)}
          >
            <TiMessages className="text-2xl" />
          </button>
          <button
            className="btn-secondary btn"
            onClick={() => setIsDeleteClicked(true)}
          >
            <TiTimesOutline className="text-2xl" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border-red-20 h-[300px] w-full rounded-md border bg-base-200 p-10 drop-shadow-md"
          >
            <h1 className="mb-4 text-2xl font-bold">{subject}</h1>{" "}
            <p>{message}</p>
            <TiEdit
              size={24}
              className="cursor-pointer hover:text-primary-focus"
            />
            <div className="mt-4 w-full">
              <button
                onClick={triggerPublic}
                className="btn-ghost btn-xs btn absolute bottom-4 left-4"
              >
                {isPublic ? "Make Private" : "Make public"}
              </button>

              <p className="absolute bottom-4 right-4 font-sans text-xs text-secondary">
                Closed: {closed.toDateString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isDeleteClicked && (
        <Modal>
          <h3 className="text-lg font-bold">Delete this message?</h3>
          <p className="py-4">
            The message will be permanently deleted and cannot be recovered.
          </p>
          <div className="modal-action">
            <button
              onClick={() => setIsDeleteClicked(false)}
              className="btn-outline btn"
            >
              No
            </button>
            <button onClick={handleDelete} className="btn-warning btn">
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
