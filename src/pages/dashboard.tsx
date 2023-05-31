import React from "react";
import BuriedCapsules from "~/components/dashboard/BuriedCapsules";
import StatsBar from "~/components/dashboard/StatsBar";


export default function DashboardPage() {
  return (
    <section className=" grid grid-flow-row md:grid-flow-col">
      <StatsBar />
      <BuriedCapsules />
    </section>
  );
}
