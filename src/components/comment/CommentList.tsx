import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../ui/Loader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommentList({ id }: { id: string }) {
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
            className="text-md cursor-pointer font-bold text-slate-400 hover:text-base-100 dark:text-slate-400 dark:hover:text-base-100"
            onClick={() => setShowCommentBar(!showCommentBar)}
          >
            Comments ({capsuleComment?.length})
          </h2>
        </div>
        {isAuth && showCommentBar && (
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-4 rounded-lg rounded-t-lg border border-base-300 px-4 py-2">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full bg-transparent  px-0 text-sm text-gray-900 placeholder-base-300 focus:outline-none  focus:ring-0 dark:border-white"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-outline btn-sm btn border-stone-300 text-stone-200"
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
                <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
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
                <p className="text-sm text-gray-900 dark:text-gray-400">
                  <time title="February 8th, 2022">
                    {comment.createdAt.toDateString()}
                  </time>
                </p>
              </div>
              {isAuth && comment.user.id === session?.user.id && (
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center rounded-lg bg-transparent bg-white p-2 text-center text-sm font-medium text-red-400 hover:bg-red-700  hover:text-white  focus:outline-none focus:ring-4 dark:focus:ring-gray-600"
                  type="button"
                  onClick={() => deleteComment.mutate({ id: comment.id })}
                >
                  <RiDeleteBin6Line />
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
