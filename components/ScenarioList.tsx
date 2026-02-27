"use client";

import React, { useState, useEffect } from "react";
import { Folder } from "lucide-react";
import { getBarColor } from "@/constants";
import { useRouter } from "next/navigation";

export interface Scenario {
  id: string;
  name: string;
  params: { arrivalRate: number; serviceRate: number; numServers: number };
  results: {
    avgWaitTime: string;
    utilization: string;
    avgQueueLength: string;
    maxQueueLength: string;
    chartData?: { time: number; value: number }[];
  };
  date: string;
}

const ScenariosList = () => {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [compareId, setCompareId] = useState<string[]>([]);

  const handleCompareClick = (id: string) => {
    console.log("Selected ID:", id);

    setCompareId(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id) // uncheck
          : [...prev, id], // check
    );
  };
  const handleCompareButton = () => {
    router.push(`/compare?ids=${compareId.join(",")}`);
  };
  const LOAD_MORE_COUNT = 4;
  useEffect(() => {
    const saved = localStorage.getItem("savedScenarios");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScenarios(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading scenarios", e);
      }
    }
  }, []);

  // Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 100) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, scenarios.length),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scenarios.length]);

  if (scenarios.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20 bg-white rounded-xl shadow-sm">
        <Folder size={48} className="mx-auto mb-4 text-slate-300" />
        <p>No saved scenarios yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Compare Button */}
      {compareId.length > 0 && (
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-6"
          onClick={handleCompareButton}
        >
          Compare Scenarios
        </button>
      )}
      {scenarios.slice(0, visibleCount).map((scenario) => {
        const wqValue = parseFloat(scenario.results?.avgWaitTime || "0");
        const utilValue = parseFloat(scenario.results?.utilization || "0");
        const createdAt = scenario.date;

        return (
          <div
            key={scenario.id}
            className="grid grid-cols-12 items-center px-6 py-4 bg-white rounded-lg shadow-sm mb-4 hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-3 flex items-center gap-4">
              <input
                type="checkbox"
                className={`rounded border-gray-300 ${
                  compareId.length === 2 && !compareId.includes(scenario.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onChange={() => handleCompareClick(scenario.id)}
                checked={compareId.includes(scenario.id)}
                disabled={
                  compareId.length === 2 && !compareId.includes(scenario.id)
                }
              />
              <span className="font-medium text-gray-900">{scenario.name}</span>
            </div>

            <div className="col-span-1">{scenario.params.arrivalRate}</div>
            <div className="col-span-1">{scenario.params.serviceRate}</div>
            <div className="col-span-1">{scenario.params.numServers}</div>

            <div className="col-span-1 font-medium text-indigo-600">
              {wqValue.toFixed(2)}
            </div>

            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-2 w-40">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(utilValue, 100)}%`,
                    backgroundColor: getBarColor(utilValue),
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 mt-1 block">
                {utilValue.toFixed(2)}%
              </span>
            </div>

            <div className="col-span-3 text-sm text-gray-600">
              {createdAt ? new Date(createdAt).toLocaleString() : "---"}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ScenariosList;
