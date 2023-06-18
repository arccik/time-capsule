import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CommentList from "../comment/CommentList";
import { TfiCommentAlt } from "react-icons/tfi";

export default function CommentBar({ id }: { id: string }) {
  const [showComment, setShowComment] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowComment((prev) => !prev)}
        className="btn-ghost btn-xs btn rounded-full border border-gray-500"
      >
        <TfiCommentAlt className="mr-2" /> Comments
      </button>
      <AnimatePresence>
        {showComment && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <CommentList id={id} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
