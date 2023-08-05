import { Suspense, useEffect, useState } from "react";
import MessageCard from "./MessageGridCard";
import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import Hero from "./Hero";
import { scrolltoHash } from "~/lib/scrollToHash";

export default function MessageGrid() {
  const [page, setPage] = useState(1);

  const { data, status, isInitialLoading } =
    api.capsule.getOpenCapsules.useQuery(
      {
        page,
      },
      {
        onSuccess() {
          if (page !== 1) {
            scrolltoHash("public-messages");
          }
        },
      }
    );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pageNumber = query.get("page");
    if (pageNumber) {
      setPage(parseInt(pageNumber));
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    scrolltoHash("public-messages");
    setPage(newPage);
  };

  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
      <Hero />
      {status === "loading" && <Loader />}
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        {data &&
          data[0]?.map((capsule) => (
            <li key={capsule.id}>
              <MessageCard data={capsule} />
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={page}
        setCurrentPage={(page) => handlePageChange(page as number)}
        totalPages={(data && Math.floor(data[1] / 12 + 1)) || 1}
      />
    </section>
  );
}
