import React from "react";
import Footer from "~/components/capsule-form/CapsuleFooter";
import BuriedCapsules from "~/components/dashboard/BuriedCapsules";
import StatsBar from "~/components/dashboard/StatsBar";

export default function DashboardPage() {
  return (
    <>
      <section className="grid grid-flow-row justify-center md:grid-flow-col">
        <StatsBar />
        <BuriedCapsules />
      </section>
      <Footer />
    </>
  );
}
