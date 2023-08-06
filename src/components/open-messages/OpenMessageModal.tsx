import { Fragment } from "react";
import type { Capsule } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";
import CommentBar from "./CommentBar";
import { AiFillCloseCircle } from "react-icons/ai";
import ShowFromToDate from "./ShowFromToDate";
type Props = {
  activeCard: Capsule | null;
  closeModal: () => void;
  isOpen: boolean;
};

export default function OpenMessageModal({
  activeCard,
  closeModal,
  isOpen,
}: Props) {
  if (!activeCard) return;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="glass w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800   dark:text-gray-200">
                <Dialog.Title
                  as="h3"
                  className="font-medium leading-6 text-gray-900 dark:text-gray-400 md:text-lg"
                >
                  {activeCard?.subject}
                </Dialog.Title>
                {/* <ShowFromToDate
                  from={activeCard.createdAt}
                  to={activeCard?.openedAt}
                /> */}
                <div className="mt-2">
                  <p className="text-md whitespace-break-spaces  dark:text-gray-200">
                    {activeCard?.message}
                  </p>
                </div>

                <AiFillCloseCircle
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={closeModal}
                />
                <div className="mt-4">
                  <CommentBar id={activeCard.id} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
