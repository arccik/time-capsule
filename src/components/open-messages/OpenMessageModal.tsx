import { Fragment, useEffect, useRef } from "react";
import type { Capsule } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";
import CommentBar from "./CommentBar";
import { AiFillCloseCircle } from "react-icons/ai";
import SocialShareButtons from "./SocialShareButtons";
import Image from "next/image";

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
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      dialogRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, [activeCard]);

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
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" ref={dialogRef}>
          <div className="flex min-h-full items-center justify-center p-2 text-center  md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-100 p-4 text-left align-middle shadow-xl transition-all md:p-6">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  {activeCard?.subject}
                </Dialog.Title>
                {activeCard?.image && (
                  <Image
                    width={400}
                    height={200}
                    src="/images/bg-time-capsule-found.jpeg"
                    alt={activeCard.subject}
                  />
                )}

                <div className="mt-2">
                  <p className="text-md whitespace-break-spaces">
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
                <SocialShareButtons
                  message={activeCard?.message}
                  id={activeCard.id}
                />
                {activeCard.message.length > 300 && (
                  <span className="cursor-pointer" onClick={closeModal}>
                    Close
                  </span>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
