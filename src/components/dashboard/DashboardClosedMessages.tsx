import React from "react";
import Loader from "~/components/ui/Loader";
import { api } from "~/utils/api";
import DashboardCard from "./DashboardCard";

export default function BuriedCapsules() {
  const {
    data: capsuleData,
    status: capsuleStatus,
    refetch,
  } = api.capsule.getAllBuried.useQuery();

  if (capsuleStatus !== "success") return <Loader />;
  if (capsuleData.length === 0) {
    return (
      <div className="mt-2 w-full p-2">
        <p className="text-3xl font-bold">
          <b className="text-secondary">Closed</b> Messages
        </p>
        <p className="mt-10  text-center text-sm text-secondary">
          You have no open messages.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 w-full p-2">
        <p className="text-3xl font-bold">
          <b className="text-secondary">Buried</b> Messages
        </p>
        {capsuleData.map((capsule) => (
          <DashboardCard
            key={capsule.id}
            refetch={refetch}
            id={capsule.id}
            isPublic={capsule.public}
            date={capsule.createdAt}
          />
        ))}
      </div>
    </>
  );
}
