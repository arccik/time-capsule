import { AnimatePresence, motion } from "framer-motion";
import CommentList from "../comment/CommentList";

export default function CommentBar({ id }: { id: string }) {
  return (
    //<AnimatePresence>
    //  <motion.div
    //   initial={{ y: -50, opacity: 0 }}
    // animate={{ y: 0, opacity: 1 }}
    // exit={{ y: -50, opacity: 0 }}
    // transition={{ duration: 0.5 }}
    // className="w-full"
    // >
    <CommentList id={id} />
    //   </motion.div>
    // </AnimatePresence>
  );
}
