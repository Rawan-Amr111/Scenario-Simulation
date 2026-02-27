"use client";

import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MetricCard from "@/components/MetricCard";
import ComparisonCharts from "@/components/charts/ComparisonChart";
import { Scenario } from "@/components/ScenarioList";
import { calculateChange } from "@/utils/queueLogic";
import Recommendation from "./Recommendation";

const CompareClient = ({ ids }: { ids: string[] }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Comparison_Report_${new Date().toLocaleDateString()}`,
  });

  useEffect(() => {
    const saved = localStorage.getItem("savedScenarios");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const result = ids
          .map((id) => parsed.find((s: Scenario) => s.id === id))
          .filter(Boolean);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScenarios(result);
      } catch (e) {
        console.error("Error loading scenarios", e);
      }
    }
  }, [ids]);

  const s1 = scenarios[0]?.results;
  const s2 = scenarios[1]?.results;

  const waitTimeChange = calculateChange(
    s1?.avgWaitTime,
    s2?.avgWaitTime,
    true,
  );
  const queueLengthChange = calculateChange(
    s1?.avgQueueLength,
    s2?.avgQueueLength,
    true,
  );
  const utilizationChange = calculateChange(
    s1?.utilization,
    s2?.utilization,
    false,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Compare Scenarios
          </h1>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all font-semibold text-slate-700 active:scale-95"
          >
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export Report (PDF)
          </button>
        </div>
        <div ref={contentRef} className="print:p-10 space-y-10">
          <div className="flex gap-4">
            <div className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md text-sm font-medium">
              Current: {scenarios[0]?.name || "Scenario A"}
            </div>
            <div className="bg-white border border-slate-200 text-slate-600 px-5 py-2 rounded-full shadow-sm text-sm font-medium">
              Base: {scenarios[1]?.name || "Scenario B"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Avg. Waiting Time"
              mainVal={s1?.avgWaitTime || "0s"}
              baseVal={s2?.avgWaitTime || "0s"}
              percentage={waitTimeChange.percent}
              isPositive={waitTimeChange.isPositive}
            />
            <MetricCard
              title="Queue Length"
              mainVal={s1?.avgQueueLength || "0"}
              mainSub="units"
              baseVal={s2?.avgQueueLength || "0"}
              baseSub="units"
              percentage={queueLengthChange.percent}
              isPositive={queueLengthChange.isPositive}
            />
            <MetricCard
              title="Utilization Rate"
              mainVal={s1?.utilization || "0"}
              mainSub="%"
              baseVal={s2?.utilization || "0"}
              baseSub="%"
              percentage={utilizationChange.percent}
              isPositive={utilizationChange.isPositive}
            />
          </div>

          <ComparisonCharts scenarios={scenarios} />

          <Recommendation scenarios={scenarios} />
        </div>
      </div>
    </div>
  );
};

export default CompareClient;
