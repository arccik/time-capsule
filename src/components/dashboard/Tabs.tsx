import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
};

export default function Tabs({ setActiveTab, activeTab }: Props) {
  const router = useRouter();
  const tabsTitle = ["Pending", "Dashboard", "Closed", "Opened"];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    router.push({
      pathname: router.pathname,
      query: { openTab: index.toString() },
    });
  };

  const tabs = tabsTitle.map((tab, index) => (
    <button
      key={tab}
      className={clsx("tab-lifted tab", {
        "tab-active": activeTab === index,
      })}
      onClick={() => handleTabClick(index)}
    >
      {tab}
    </button>
  ));
  return tabs;
}
