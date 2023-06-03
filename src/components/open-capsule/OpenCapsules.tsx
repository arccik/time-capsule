import React from "react";
import { api } from "~/utils/api";
import Loader from "../layout/Loader";
import Image from "next/image";

export default function OpenCapsules() {
  const { data: capsuleData, status } = api.capsule.getOpenCapsules.useQuery();

  console.log("Open Capsules ", capsuleData);
  // if (status !== "success") return <Loader />;
  // if (!capsuleData.length) return null;
  return (
    <div className="mb-5 mt-5 grid w-full grid-flow-col gap-3 overflow-auto hover:overflow-scroll">
      <h1 className="ml-10 text-3xl font-bold text-secondary">
        Opened & <span className="text-primary">Published</span>
      </h1>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((capsule) => (
        <div className="card card-side w-96 bg-base-100 shadow-xl">
          <figure>
            <Image width={200} height={200} src="/images/TC.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Capsule from Armando!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-primary  rounded-full">
                5 Years ago
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
