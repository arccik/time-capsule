import { Suspense, useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";

export default function MessageGrid() {
  const [page, setPage] = useState(1);
  const { data } = api.capsule.getOpenCapsules.useQuery({
    page,
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pageNumber = query.get("page");
    if (pageNumber) {
      setPage(parseInt(pageNumber));
    }
  }, []);

  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
      <h1 className="mb-10 mt-10 text-center text-5xl font-bold">
        Public Messages
      </h1>
      <p className="-mt-10 text-center text-base-300 dark:text-slate-500">
        Connecting Hearts, Inspiring Minds
      </p>
      <Suspense fallback={<Loader fullScreen={true} />}>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {data &&
            data[0]?.map((capsule) => (
              <MessageCard
                totalLikes={capsule.likes.length}
                id={capsule.id}
                key={capsule.id}
                message={capsule.message}
                subject={capsule.subject}
                createdAt={capsule.createdAt}
                totalComments={capsule.comments.length}
                image={capsule.image}
              />
            ))}
        </ul>
      </Suspense>
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={(data && Math.floor(data[1] / 12 + 1)) || 1}
      />
    </section>
  );
}
