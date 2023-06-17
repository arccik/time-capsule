import React from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import { BsCapsulePill, BsHeart, BsPrescription } from "react-icons/bs";
import { SlEnvelopeOpen } from "react-icons/sl";

export default function StatsBar() {
  const { data: totalOpenCapsules, status: openStatus } =
    api.capsule.getTotalOpenCapsules.useQuery();
  const { data: totalCapsules, status: totalStatus } =
    api.capsule.getTotalCapsules.useQuery();
  const { data: totalPublic, status: publicStatus } =
    api.capsule.getTotalPublicCapsules.useQuery();

  const { data: totalUnpaid, status: unpaidStatus } =
    api.capsule.getTotalUnpaidCapsules.useQuery();

  if (
    openStatus === "loading" ||
    totalStatus === "loading" ||
    publicStatus === "loading" ||
    unpaidStatus === "loading"
  )
    return <Loader />;

  return (
    <div className="stats stats-vertical min-w-full  shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <BsCapsulePill className="text-4xl" />
        </div>
        <div className="stat-title">Total Capsules</div>
        <div className="stat-value text-primary">{totalCapsules}</div>
        <div className="stat-desc text-secondary">
          {totalUnpaid} capsules awaiting payment
        </div>
      </div>
      <div className="stat">
        <div className="stat-figure text-primary">
          <SlEnvelopeOpen className="text-4xl" />
        </div>
        <div className="stat-title">Already Open</div>
        <div className="stat-value text-primary">{totalOpenCapsules}</div>
        <div className="stat-desc text-secondary">
          {totalCapsules &&
            totalOpenCapsules &&
            totalCapsules - totalOpenCapsules}{" "}
          capsules still closed
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BsHeart className="text-4xl" />
        </div>
        <div className="stat-title">Public Capsules</div>
        <div className="stat-value text-secondary">{totalPublic}</div>
        <div className="stat-desc text-primary">
          will be visible on main page
        </div>
      </div>

      {totalOpenCapsules && totalCapsules && (
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsPrescription className="text-4xl" />
          </div>
          <div className="stat-value">
            {Math.round(100 - (100 / totalCapsules) * totalOpenCapsules)}%
          </div>
          <div className="stat-title">Capsules are closed</div>
          <div className="stat-desc text-secondary">Soonest will be open </div>
        </div>
      )}
    </div>
  );
}
