import MessageCard from "./MessageGridCard";
import { api } from "~/utils/api";
import Hero from "./Hero";
import Loader from "../ui/Loader";
import { useState } from "react";
import type { Capsule } from "@prisma/client";
import OpenMessageModal from "./OpenMessageModal";

export default function MessageGrid() {
  const [activeCard, setActiveCard] = useState<null | Capsule>(null);
  const [openModal, setOpenModal] = useState(false);

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
    if (selectedCard) {
      setOpenModal(true);
      setActiveCard(selectedCard);
    } else {
      setOpenModal(false);
      setActiveCard(null);
    }
  };

  const toShow = data?.pages.map((page) => page.items).flat();


  return (
    <section className="items-center p-2 md:p-10" id="public-messages">
      <Hero />
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-flow-row-dense grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
      >
        {toShow?.map((message) => (
          <li key={message.id}>
            <MessageCard data={message} setActiveCard={handleCardClick} />
          </li>
        ))}
      </ul>
      {(status === "loading" || isFetchingNextPage) && <Loader />}

      <OpenMessageModal
        activeCard={activeCard}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />
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
