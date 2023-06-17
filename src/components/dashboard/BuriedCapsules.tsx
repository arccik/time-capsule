import React from "react";
import Loader from "~/components/layout/Loader";
import { api } from "~/utils/api";
import { BsTrash, BsClock } from "react-icons/bs";
import dateFormatter from "~/lib/dateFormatter";

export default function BuriedCapsules() {
  const {
    data: capsuleData,
    status: capsuleStatus,
    refetch,
  } = api.capsule.getAllBuried.useQuery();
  const deleteCapsule = api.capsule.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = (id: string) => {
    deleteCapsule.mutate({ id });
  };

  if (capsuleStatus !== "success") return <Loader />;
  if (capsuleData.length === 0) return null;
  return (
    <>
      <div className="mt-2 w-full p-2">
        <p className="text-3xl font-bold"> Buried Capsules</p>
        {capsuleData.map((capsule) => (
          <div
            key={capsule.id}
            className="alert m-2 flex w-[95%] flex-row shadow-lg "
          >
            <div>
              <BsClock className="mr-2 text-2xl" />
              <span>
                <p className="text-sm font-bold">
                  Will open on {dateFormatter(capsule.dateTime)}
                </p>
                <span className="text-xs text-primary-focus">
                  {capsule.public ? "Public" : "Private"}
                </span>
              </span>
            </div>
            <div className="flex-none">
              <button className="btn btn-secondary">
                <BsTrash
                  className="text-2xl"
                  onClick={() => handleDelete(capsule.id)}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
