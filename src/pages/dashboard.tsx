import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ClosedMessages from "~/components/dashboard/ClosedMessages";
import StatsBar from "~/components/dashboard/StatsBar";
import PandingCapsules from "~/components/dashboard/PendingCapsules";
import Tabs from "~/components/dashboard/Tabs";
import ResponseAlert from "~/components/capsule-form/ResponseAlert";
import OpenMessages from "~/components/dashboard/OpenMessages";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const { status } = useSession({ required: true });

  useEffect(() => {
    if (router.query?.openTab) {
      setActiveTab(Number(router.query.openTab));
    }
  }, [router.query.openTab]);

  if (status !== "authenticated") return null;
  const displayTabArray = [
    <PandingCapsules key="panding" />,
    <StatsBar key="stats" />,
    <ClosedMessages key="closed" />,
    <OpenMessages key="open" />,
  ];

  return (
    <main className="container m-2 mx-auto mb-20 mt-10 md:w-2/3">
      <ResponseAlert />

      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      {displayTabArray[activeTab]}
    </main>
  );
}
