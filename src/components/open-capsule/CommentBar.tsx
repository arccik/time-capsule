import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CommentList from "../comment/CommentList";

export default function CommentBar({ id }: { id: string }) {
  const [showComment, setShowComment] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowComment((prev) => !prev)}
        className="btn-primary btn-xs btn"
      >
        Comments
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
