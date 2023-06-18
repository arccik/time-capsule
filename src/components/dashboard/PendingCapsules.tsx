import { MdDeleteForever, MdPayment } from "react-icons/md";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import { useEffect, useState } from "react";
import useStripe from "~/lib/hooks/useStripe";

export default function PendingCapsules({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
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
  useEffect(() => {
    if (status === "success" && !data?.length) {
      setActiveTab(2);
    }
  }, [data?.length, status]);

  if (status === "loading") return <Loader />;
  if (status === "error") return <div>Error...</div>;

  const handleDelete = (id: string) => {
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
            <div
              key={capsule.id}
              className="mb-3 flex w-full flex-row  border-b border-gray-200 p-5"
            >
              <p className=" text-sm font-bold" key={capsule.id}>
                {capsule.subject} <br />
                <span className="left-0 text-xs text-secondary">
                  sent to {capsule.dateTime.toLocaleDateString()}
                </span>
              </p>
              <p className="left-0 hidden text-xs md:block">
                Created: {capsule.createdAt.toDateString()}
              </p>
              <div className="btn-group btn-group-horizontal">
                <button
                  onClick={() => void handlePayment(capsule.id)}
                  className="btn btn-primary  btn-xs  text-xs"
                >
                  Pay <MdPayment className="ml-1 text-xl" />
                </button>
                <button
                  className="btn btn-secondary btn-xs  text-xs"
                  onClick={() => handleDelete(capsule.id)}
                >
                  Delete <MdDeleteForever className="ml-1 text-xl" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
