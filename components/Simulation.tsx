"use client";

import { useCallback, useState } from "react";
import SimulationParameters from "../components/SimulationParameters";
import WaitTimeDistributionChart from "./charts/BarChart";
import QueueLineChart from "./charts/QueueLineChart";
import TimeDistributionChart from "./charts/StackedBar";
import ProbabilityGauge from "./charts/RadialBar";
import KpiCard from "./KpiCard";
import { calculateMMC, simulateQueue } from "@/utils/queueLogic";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface SimulationResult {
  utilization: string;
  avgWaitTime: string;
  avgQueueLength: string;
  probWait: string;
  chartData: { time: number; value: number }[];
}

const Simulation = () => {
  const [params, setParams] = useState({
    arrivalRate: 12,
    serviceRate: 15,
    numServers: 2,
    simDuration: 60,
  });
  const [isSimulated, setIsSimulated] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [results, setResults] = useState<SimulationResult>({
    utilization: "0",
    avgWaitTime: "0",
    avgQueueLength: "0",
    probWait: "0",
    chartData: [],
  });

  const handleRun = () => {
    const stats = calculateMMC(
      params.arrivalRate,
      params.serviceRate,
      params.numServers,
    );

    const realChartData = simulateQueue(
      params.arrivalRate,
      params.serviceRate,
      params.numServers,
      params.simDuration,
    );

    if (stats) {
      setResults({
        ...stats,
        chartData: realChartData,
      });
      setIsSimulated(true);
    }
  };

  const handleSave = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const confirmSave = () => {
    toast(`Scenario "${scenarioName}" saved successfully!`);
    setIsModalOpen(false);
    setScenarioName("");
    const savedScenarios = JSON.parse(
      localStorage.getItem("savedScenarios") || "[]",
    );
    savedScenarios.push({
      id: crypto.randomUUID(),
      name: scenarioName,
      params,
      results,
      date: new Date().toISOString(),
    });

    localStorage.setItem("savedScenarios", JSON.stringify(savedScenarios));
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f3f4f6]">
      {isSimulated && (
        <button
          onClick={handleSave}
          className="fixed top-30 right-8 z-50 flex items-center gap-2 bg-indigo-600 text-white  hover:bg-indigo-700 transition-colors px-5 py-2.5 rounded-xl shadow-lg animate-in fade-in zoom-in duration-300 font-semibold cursor-pointer"
        >
          <Save size={20} />
          Save Scenario
        </button>
      )}
      <SimulationParameters
        setParams={setParams}
        onRun={handleRun}
        params={params}
      />

      <div className="flex-1 flex flex-col overflow-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Simulation Results
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Real-time analysis of the M/M/c queueing model.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Avg Wait Time"
            value={`${results.avgWaitTime}`}
            color={
              parseFloat(results.avgWaitTime) > 30
                ? "text-red-500"
                : "text-green-500"
            }
            status={parseFloat(results.avgWaitTime) > 30 ? "High" : "Optimal"}
          />

          <KpiCard
            title="Avg Queue Length"
            value={results.avgQueueLength}
            color="text-yellow-500"
            status="Moderate"
          />

          <KpiCard
            title="Server Utilization"
            value={`${results.utilization}%`}
            color={
              Number(results.utilization) > 80
                ? "text-yellow-500"
                : Number(results.utilization) > 90
                  ? "text-red-500"
                  : "text-green-500"
            }
            status={
              Number(results.utilization) > 90
                ? "Critical"
                : Number(results.utilization) > 70
                  ? "Warning"
                  : "Optimal"
            }
          />

          <KpiCard
            title="Prob. of Waiting"
            value={`${results.probWait}%`}
            color={
              Number(results.probWait) >= 70
                ? "text-red-500"
                : Number(results.probWait) >= 40
                  ? "text-yellow-500"
                  : "text-green-500"
            }
            status={
              Number(results.probWait) >= 70
                ? "High"
                : Number(results.probWait) >= 40
                  ? "Moderate"
                  : "Low"
            }
          />
        </div>

        {/* Queue over time */}
        <div className="mb-8">
          <QueueLineChart data={results.chartData} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProbabilityGauge probability={Number(results.probWait)} />

          <TimeDistributionChart
            waitTime={parseFloat(results.avgWaitTime)}
            serviceTime={(1 / params.serviceRate) * 60}
          />

          <WaitTimeDistributionChart
            servers={params.numServers}
            arrivalRate={params.arrivalRate}
            serviceRate={params.serviceRate}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Save Scenario
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Please enter a name for this simulation to find it later.
            </p>

            <input
              autoFocus
              type="text"
              placeholder="e.g. Peak Hour Monday"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                disabled={!scenarioName.trim()}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulation;
