import clsx from "clsx";
import React from "react";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
};

export default function Tabs({ setActiveTab, activeTab }: Props) {
  const tabsTitle = ["Pending", "Dashboard", "Closed", "Opened"];

  const tabs = tabsTitle.map((tab, index) => (
    <button
      key={tab}
      className={clsx("tab-lifted tab", {
        "tab-active": activeTab === index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {tab}
    </button>
  ));
  return tabs;
}
