import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../ui/Loader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommentBar({ id }: { id: string }) {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showCommentBar, setShowCommentBar] = useState<boolean>(false);
  const router = useRouter();
  const { status, data: session } = useSession();
  const isAuth = status === "authenticated";
  const {
    data: capsuleComment,
    status: commentStatus,
    refetch,
  } = api.comment.getByCapsuleId.useQuery({ capsuleId: id });
  const saveComment = api.comment.create.useMutation({
    onSuccess: async () => {
      setLoading(false);
      await refetch();
    },
    onMutate: () => setLoading(true),
  });

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: async () => {
      setLoading(false);
      await refetch();
    },
    onMutate: () => setLoading(true),
    onError: (error) =>
      console.error("Could not delete your comment, try again", error),
  });

  // if (commentStatus === "loading") return <Loader />;
  if (commentStatus === "error") return <div>Error...</div>;
  if (!isAuth)
    return (
      <button
        className="btn-ghost btn-sm btn text-sm text-white"
        onClick={() => void signIn(undefined, { callbackUrl: router.asPath })}
      >
        Login to comment
      </button>
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveComment.mutate({ capsuleId: id, body: comment });
    setComment("");
  };

  return (
    <section className="mx-auto w-full rounded-md">
      <div className="mx-auto">
        <div className=" flex items-center justify-between">
          <h2
            className="text-md mb-5  ml-0 cursor-pointer rounded-md font-bold hover:text-slate-800"
            onClick={() => setShowCommentBar(!showCommentBar)}
          >
            Leave a comment
          </h2>
        </div>
        {isAuth && showCommentBar && (
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-4 rounded-lg rounded-t-lg border border-slate-700 px-4 py-2">
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full bg-transparent  px-0 text-sm text-gray-900 placeholder-slate-700 focus:outline-none focus:ring-0"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-outline btn-sm btn border-stone-700 text-stone-700"
            >
              Post comment
            </button>
          </form>
        )}
        {loading && <Loader />}
        {capsuleComment?.map((comment) => (
          <article className=" card glass mb-6 p-6 " key={comment.id}>
            <footer className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-3 inline-flex items-center text-sm text-gray-900">
                  {comment.user.image && (
                    <Image
                      width={60}
                      height={60}
                      className="mr-2 h-6 w-6 rounded-full"
                      src={comment.user.image}
                      alt="Michael Gough"
                    />
                  )}
                  {comment.user?.name}
                </p>
                <p className="text-sm text-gray-900">
                  <time title="February 8th, 2022">
                    {comment.createdAt.toDateString()}
                  </time>
                </p>
              </div>
              {isAuth && comment.user.id === session?.user.id && (
                <button
                  className="absolute right-1 top-1 inline-flex items-center rounded-lg bg-transparent text-center text-sm font-medium text-red-400 hover:bg-red-700  hover:text-white  focus:outline-none focus:ring-4"
                  type="button"
                  onClick={() => deleteComment.mutate({ id: comment.id })}
                >
                  <RiDeleteBin6Line size={22} />
                </button>
              )}
            </footer>
            <p>{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
