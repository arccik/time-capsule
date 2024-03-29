import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

type Props = { from: Date | null; to: Date | null };

export default function ShowFromToDate({ from, to }: Props) {
  return (
    <div className="font-display mb-2 mt-1 flex w-full  flex-row gap-4 text-xs text-slate-800 md:text-sm ">
      {from && (
        <p>
          {from.toLocaleDateString()}
          <HiLockClosed className="float-left mr-2" />
        </p>
      )}
      <FaLongArrowAltRight />
      {to && (
        <p>
          {to.toLocaleDateString()}
          <HiLockOpen className="float-left mr-2" />
        </p>
      )}
    </div>
  );
}
