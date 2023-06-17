import { useSession } from "next-auth/react";
import React from "react";
import BuriedCapsules from "~/components/dashboard/BuriedCapsules";
import StatsBar from "~/components/dashboard/StatsBar";
import PandingCapsules from "~/components/dashboard/PendingCapsules";
import Tabs from "~/components/dashboard/Tabs";
import ResponseAlert from "~/components/capsule-form/ResponseAlert";
import OpenMessages from "~/components/dashboard/OpenMessages";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState(1);
  const { status } = useSession({ required: true });
  if (status !== "authenticated") return null;

  return (
    <main className="container m-2 mx-auto mb-20 mt-10 md:w-2/3">
      <ResponseAlert setActiveTab={setActiveTab} />

      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {activeTab === 1 && <PandingCapsules setActiveTab={setActiveTab} />}
      {activeTab === 2 && <StatsBar />}
      {activeTab === 3 && <BuriedCapsules />}
      {activeTab === 4 && <OpenMessages />}
    </main>
  );
}
