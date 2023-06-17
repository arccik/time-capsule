import React from "react";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
};

export default function Tabs({ setActiveTab, activeTab }: Props) {
  return (
    <div className="tabs w-full">
      <button
        className={"tab-lifted tab " + (activeTab === 1 ? "tab-active" : "")}
        onClick={() => setActiveTab(1)}
      >
        Pending
      </button>
      <button
        className={"tab-lifted tab  " + (activeTab === 2 ? "tab-active" : "")}
        onClick={() => setActiveTab(2)}
      >
        Dashboard
      </button>
      <button
        className={"tab-lifted tab " + (activeTab === 3 ? "tab-active" : "")}
        onClick={() => setActiveTab(3)}
      >
        Closed
      </button>
      <button
        className={"tab-lifted tab " + (activeTab === 4 ? "tab-active" : "")}
        onClick={() => setActiveTab(4)}
      >
        Opened
      </button>
    </div>
  );
}
