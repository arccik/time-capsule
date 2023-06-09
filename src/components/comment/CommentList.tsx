import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

type Props = {
  id: string;
};

export default function CommentList({ id }: Props) {
  const [comment, setComment] = React.useState<string>("");
  const [dropDown, setDropDown] = React.useState<boolean>(false);
  const {
    data: capsuleComment,
    status: commentStatus,
    refetch,
  } = api.comment.getByCapsuleId.useQuery({ capsuleId: id });
  const saveComment = api.comment.create.useMutation({
    onSuccess: () => refetch(),
  });
  if (commentStatus === "loading") return <div>Loading...</div>;
  if (commentStatus === "error") return <div>Error...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("BEBBIII ", comment);
    saveComment.mutate({ capsuleId: id, body: comment });
  };

  return (
    <section className="mx-auto  rounded-md  border border-zinc-600 bg-white py-8 lg:py-6">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-secondary lg:text-2xl">
            Discussion ({capsuleComment?.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-100">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-100  dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-primary focus:ring-4"
          >
            Post comment
          </button>
        </form>
        {capsuleComment?.map((comment) => (
          <article
            className="mb-6 rounded-lg bg-white p-6 text-base dark:bg-gray-900"
            key={comment.id}
          >
            <footer className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-secondary">
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
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
                onClick={() => setDropDown((prev) => !prev)}
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              <div className="reative">
                <div
                  id="dropdownComment1"
                  className={`absolute right-0 z-10 mt-2 ${
                    dropDown ? "block" : "hidden"
                  } w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-secondary"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-secondary"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-secondary"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
