import { useSession } from "next-auth/react";
import React from "react";
import Footer from "~/components/capsule-form/CapsuleFooter";
import BuriedCapsules from "~/components/dashboard/BuriedCapsules";
import StatsBar from "~/components/dashboard/StatsBar";
import ProPromotion from "~/components/layout/ProPromotion";

export default function DashboardPage() {
  const { status } = useSession({ required: true });
  if (status !== "authenticated") return null;
  return (
    <>
      <section className="container mx-auto mb-20 mt-10 grid-flow-row md:grid md:grid-flow-col">
        <StatsBar />
        <BuriedCapsules />
        <ProPromotion />
      </section>
      <Footer />
    </>
  );
}
