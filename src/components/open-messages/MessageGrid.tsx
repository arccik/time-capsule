import { Suspense, useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import Hero from "./Hero";
import { set } from "zod";
import { scrolltoHash } from "~/lib/scrollToHash";

export default function MessageGrid() {
  const [page, setPage] = useState(1);
  const { data, status, isInitialLoading } =
    api.capsule.getOpenCapsules.useQuery({
      page,
    });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pageNumber = query.get("page");
    if (pageNumber) {
      setPage(parseInt(pageNumber));
    }
    if (status === "success" && page !== 1) {
      scrolltoHash("public-messages");
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
      <Hero />
      <Suspense fallback={<Loader />}>
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
