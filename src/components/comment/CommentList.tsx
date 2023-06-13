import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../layout/Loader";

export default function CommentList({ id }: { id: string }) {
  const [comment, setComment] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
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
    <section className="mx-auto rounded-md  bg-slate-400  pt-8  dark:shadow-xl lg:py-16">
      <div className="mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
            Discussion ({capsuleComment?.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
          >
            Post comment
          </button>
        </form>
        {loading && <Loader />}
        {capsuleComment?.map((comment) => (
          <article
            className="mb-6 rounded-lg bg-white p-6 text-base dark:bg-gray-900"
            key={comment.id}
          >
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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time title="February 8th, 2022">Feb. 8, 2022</time>
                </p>
              </div>
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-red-700 dark:focus:ring-gray-600"
                type="button"
                onClick={() => deleteComment.mutate({ id: comment.id })}
              >
                <RiDeleteBin6Line />
              </button>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
