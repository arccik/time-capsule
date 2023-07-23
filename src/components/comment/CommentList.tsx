import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../layout/Loader";
import { useSession } from "next-auth/react";

export default function CommentList({ id }: { id: string }) {
  const [comment, setComment] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
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
    onMutate: () => void setLoading(true),
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

  if (commentStatus === "loading") return <div>Loading...</div>;
  if (commentStatus === "error") return <div>Error...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveComment.mutate({ capsuleId: id, body: comment });
    setComment("");
  };

  return (
    <section className="mx-auto rounded-md">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-base-200 lg:text-2xl">
            Comments ({capsuleComment?.length})
          </h2>
        </div>
        {isAuth && (
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200  px-4 py-2">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                className="w-full border-0 bg-transparent px-0 text-sm text-gray-900  focus:outline-none focus:ring-0"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-ghost btn border border-stone-300"
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
