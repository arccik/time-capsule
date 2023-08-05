import MessageCard from "./MessageGridCard";
import { api } from "~/utils/api";
import Hero from "./Hero";
import Loader from "../ui/Loader";

export default function MessageGrid() {
  const { data, status, fetchNextPage, isFetchingNextPage } =
    api.capsule.getInfinityMessages.useInfiniteQuery(
      {
        limit: 12,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  const dataByPage = data?.pages.map((page) => page.items);

  const toShow = dataByPage?.reduce((a, b) => a.concat(b), []);

  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
      <Hero />
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        {toShow?.map((message) => (
          <li key={message.id}>
            <MessageCard data={message} />
          </li>
        ))}
      </ul>
      {(status === "loading" || isFetchingNextPage) && <Loader />}
      <button
        className="btn-primary btn mt-10 w-full"
        disabled={!data?.pages?.at(-1)?.nextCursor}
        onClick={handleFetchNextPage}
      >
        Load more
      </button>
    </section>
  );
}
