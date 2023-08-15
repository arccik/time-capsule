import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

type Props = { from: Date | null; to: Date | null };

export default function ShowFromToDate({ from, to }: Props) {
  return (
    <div className="font-display flex w-full flex-row justify-between text-sm text-slate-300 ">
      {from && (
        <p>
          {from.toDateString()}
          <HiLockClosed className="float-left mr-2" />
        </p>
      )}
      <FaLongArrowAltRight />
      {to && (
        <p>
          {to.toDateString()}
          <HiLockOpen className="float-left mr-2" />
        </p>
      )}
    </div>
  );
}