import { useState } from "react";
import { TiEdit, TiLockOpen, TiMessages } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import type { QueryObserverResult } from "@tanstack/react-query";

type Props = {
  opened: Date;
  subject: string;
  isPublic: boolean;
  message: string;
  closed: Date;
  id: string;
  triggerPublic: () => void;
  refetch: () => Promise<QueryObserverResult>;
};

export default function OpenMessage({
  opened,
  isPublic,
  message,
  closed,
  subject,
  triggerPublic,
  id,
  refetch,
}: Props) {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <DashboardCard
        isPublic={isPublic}
        date={opened}
        icon={<TiLockOpen />}
        id={id}
        refetch={refetch}
        actions={
          <button
            className="btn-green-200 btn"
            onClick={() => setExpand((prev) => !prev)}
          >
            <TiMessages className="text-2xl" />
          </button>
        }
      />

      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border-red-20 w-full rounded-md border bg-base-200 p-10 drop-shadow-md"
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
    </>
  );
}
