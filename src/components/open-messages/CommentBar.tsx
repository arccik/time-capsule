import CommentList from "../comment/CommentList";

export default function CommentBar({ id }: { id: string }) {
  return <CommentList id={id} />;
}
