import React from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import { BsCapsulePill, BsHeart, BsPrescription } from "react-icons/bs";

export default function StatsBar() {
  const { data: capsulesData, status } = api.capsule.getAll.useQuery();
  if (status === "loading") return <Loader />;


  return (
    <div className="stats stats-vertical min-w-full  shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <BsCapsulePill className="text-4xl" />
        </div>
        <div className="stat-title">Total Capsules</div>
        <div className="stat-value text-primary">{capsulesData?.length}</div>
        <div className="stat-desc">
          {capsulesData?.filter((v) => v.dateTime > new Date()).length} still
          closed
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BsHeart className="text-4xl" />
        </div>
        <div className="stat-title">Public Capsules</div>
        <div className="stat-value text-secondary">
          {capsulesData?.filter((v) => v.public).length}
        </div>
        <div className="stat-desc text-primary">
          will be visible on main page
        </div>
      </div>

      {capsulesData && capsulesData?.length > 0 && (
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsPrescription className="text-4xl" />
          </div>
          <div className="stat-value">
            {Math.round(
              100 -
                (100 / capsulesData?.length) *
                  capsulesData?.reduce((prev, curr) => {
                    if (curr.opened) {
                      return (prev += 1);
                    }
                    return prev;
                  }, 0)
            )}
            %
          </div>
          <div className="stat-title">Capsules are closed</div>
          <div className="stat-desc text-secondary">Soonest will be open </div>
        </div>
      )}
    </div>
  );
}
