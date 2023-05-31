import React from "react";
import Loader from "~/components/layout/Loader";
import { api } from "~/utils/api";
import { BsCapsule, BsTrash, BsPersonBoundingBox } from "react-icons/bs";

const formatTime = (time: Date): string => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(time);
};

export default function BuriedCapsules() {
  const { data: capsuleData, status } = api.capsule.getAll.useQuery();
  if (status !== "success") return <Loader />;
  return (
    <>
      <div className="m-6">
        <p className="text-3xl font-bold"> Buried Capsules</p>
        {capsuleData.map((capsule) => (
          <div className="alert m-2 flex w-[95%] flex-row shadow-lg ">
            <div>
              <BsCapsule />
              <span>
                <p>Will be open at {formatTime(capsule.dateTime)}</p>
                <span className="text-xs text-primary-focus">
                  {capsule.public ? "Public" : "Private"}
                </span>
              </span>
            </div>
            <div className="flex-none">
              <button className="btn-secondary btn">
                <BsTrash className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
