import React from "react";
import BuriedCapsules from "~/components/dashboard/BuriedCapsules";
import StatsBar from "~/components/dashboard/StatsBar";

type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <section className=" grid grid-flow-row md:grid-flow-col">
      <StatsBar />
      <BuriedCapsules />
    </section>
  );
}
