import { MdDeleteForever, MdPayment } from "react-icons/md";
import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import { useState } from "react";
import useStripe from "~/hooks/useStripe";
import Modal from "../ui/Modal";

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
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Pending Capsules - awaiting payment</h2>

        <p className="text-xs font-bold text-primary">Total: {data.length}</p>
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
            <>
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
                    className="btn-outline btn-primary btn-xs btn text-xs"
                  >
                    Pay <MdPayment className="ml-1 text-xl" />
                  </button>
                  <button
                    onClick={() => setIsDeleteClicked(true)}
                    className="btn-outline btn-secondary btn-xs btn text-xs"
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
                        className="btn-outline btn"
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleDelete(capsule.id)}
                        className="btn-error btn"
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
            </>
          );
        })}
      </div>
    </div>
  );
}
