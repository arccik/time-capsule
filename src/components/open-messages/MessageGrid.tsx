import MessageCard from "./MessageGridCard";
import { api } from "~/utils/api";
import Hero from "./Hero";
import Loader from "../ui/Loader";
import { useState } from "react";
import { Capsule } from "@prisma/client";
import { Drawer } from "vaul";
import { AiFillCloseCircle } from "react-icons/ai";
import OpenMessage from "./OpenMessage";

export default function MessageGrid() {
  const [activeCard, setActiveCard] = useState<null | Capsule>(null);
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
    fetchNextPage().catch((e) => console.log(e));
  };

  const handleCardClick = (id: string) => {
    const selectedCard = toShow?.find((data) => data.id === id);
    if (selectedCard) setActiveCard(selectedCard);
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
            <MessageCard data={message} setActiveCard={handleCardClick} />
          </li>
        ))}
      </ul>
      {(status === "loading" || isFetchingNextPage) && <Loader />}

      <Drawer.Root open={!!activeCard} onOpenChange={() => setActiveCard(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="glass fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col content-center  justify-center rounded-t-[10px] dark:bg-gray-900">
            {activeCard && <OpenMessage data={activeCard} />}
            <Drawer.Close className=" absolute right-5 top-12 rounded-full text-slate-300 hover:btn-outline md:right-24 md:top-12">
              <AiFillCloseCircle size={22} />
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
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
