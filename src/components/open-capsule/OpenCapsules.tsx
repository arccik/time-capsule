import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

export default function OpenCapsules() {
  const { data: capsuleData } = api.capsule.getOpenCapsules.useQuery();

  console.log("Open Capsules ", capsuleData);
  // if (status !== "success") return <Loader />;
  // if (!capsuleData.length) return null;
  return (
    <div className="grid grid-flow-col gap-3 overflow-auto  bg-purple-200 hover:overflow-scroll">
      <h1 className="ml-10 self-center text-3xl font-bold text-primary">
        Opened & <b className="text-secondary">Published</b>
      </h1>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((capsule) => (
        <div
          className="card card-side mb-5 mt-5 w-96 bg-slate-50 shadow-md"
          key={capsule}
        >
          <figure>
            <Image width={200} height={200} src="/images/TC.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Capsule from Armando!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge-primary badge  rounded-full">
                5 Years ago
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
