import { MdDeleteForever, MdPayment } from "react-icons/md";
import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import { Fragment, useState } from "react";
import useStripe from "~/hooks/useStripe";
import Modal from "../ui/Modal";
import Link from "next/link";

export default function PendingCapsules() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const createCheckout = api.payment.createCheckout.useMutation({
    onMutate: (capsule) => setLoadingId(capsule.capsuleId),
  });
  const stripePromise = useStripe();

  const { data, status, refetch } = api.capsule.getUnpaidCapsules.useQuery();
  const deleteCapsule = api.capsule.delete.useMutation({
    onMutate: (capsule) => setLoadingId(capsule.id),
    onSuccess: async () => {
      setLoadingId(null);
      await refetch();
    },
  });

  if (status === "loading") return <Loader />;
  if (status === "error") return <div>Error...</div>;

  const handleDelete = (id: string) => {
    setIsDeleteClicked(false);
    deleteCapsule.mutate({ id });
  };

  const handlePayment = async (id: string) => {
    const response = await createCheckout.mutateAsync({
      capsuleId: id,
    });
    const stripe = await stripePromise;

    if (stripe !== null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  };
  return (
    <div className="card w-full">
      <div className="card-body">
        {data.length > 0 ? (
          <>
            <p className="text-3xl font-bold">
              <b className="text-secondary">Pending: </b> Messages awaiting
              payment
            </p>
            <p className="text-xs font-bold text-primary">
              Total: {data.length}
            </p>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-secondary">
              You do not have any messages yet.
            </p>
            <Link
              href="/"
              className="btn btn-sm mt-10 bg-[#88E0D0] md:btn-primary "
            >
              Create your first message
            </Link>
          </>
        )}
        {data?.map((capsule) => {
          if (loadingId === capsule.id)
            return (
              <div
                className="mb-3 flex w-full flex-row  items-center  border-b border-gray-200 p-5"
                key={capsule.id}
              >
                <Loader />
              </div>
            );
          return (
            <Fragment key={capsule.id}>
              <div
                key={capsule.id}
                className="mb-3 flex w-full flex-row  border-t border-gray-200 pb-5 pt-5"
              >
                <p className=" text-sm font-bold" key={capsule.id}>
                  {capsule.subject} <br />
                  <span className="left-0 text-xs text-secondary">
                    sent to {capsule.dateTime.toLocaleDateString()}
                  </span>
                </p>
                <div className="btn-group btn-group-horizontal">
                  <button
                    onClick={() => void handlePayment(capsule.id)}
                    className="btn btn-outline btn-xs bg-[#88E0D0] text-xs md:btn-primary"
                  >
                    Pay <MdPayment className="ml-1 text-xl" />
                  </button>
                  <button
                    onClick={() => setIsDeleteClicked(true)}
                    className="btn btn-secondary btn-outline btn-xs text-xs"
                  >
                    Delete <MdDeleteForever className="ml-1 text-xl" />
                  </button>
                </div>

                {isDeleteClicked && (
                  <Modal>
                    <h3 className="text-lg font-bold">Delete this message?</h3>
                    <p className="py-4">
                      The message will be permanently deleted and cannot be
                      recovered.
                    </p>
                    <div className="modal-action">
                      <button
                        onClick={() => setIsDeleteClicked(false)}
                        className="btn btn-outline"
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleDelete(capsule.id)}
                        className="btn btn-error"
                      >
                        Yes
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
              <p className="left-0 hidden text-xs md:block">
                Created: {capsule.createdAt.toDateString()}
              </p>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
