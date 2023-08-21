import React from "react";
import { api } from "~/utils/api";
import { BsCapsule, BsTrash } from "react-icons/bs";
import dateFormatter from "~/lib/dateFormatter";
import Loader from "../ui/Loader";

export default function BuriedCapsules() {
  const {
    data: capsuleData,
    status: capsuleStatus,
    refetch,
  } = api.capsule.getAll.useQuery();
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
      <div className="m-6">
        <p className="text-3xl font-bold"> Buried Capsules</p>
        {capsuleData.map((capsule) => (
          <div
            key={capsule.id}
            className="alert m-2 flex w-[95%] flex-row shadow-lg "
          >
            <div>
              <BsCapsule />
              <span>
                <p>Will be open at {dateFormatter(capsule.dateTime)}</p>
                <span className="text-xs text-primary-focus">
                  {capsule.public ? "Public" : "Private"}
                </span>
              </span>
            </div>
            <div className="flex-none">
              <button className="btn-secondary btn">
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
