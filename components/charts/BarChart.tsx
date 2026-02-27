"use client";

import { calculateAvgWaitSeconds } from "@/utils/queueLogic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

const WaitTimeDistributionChart = ({
  servers,
  arrivalRate,
  serviceRate,
}: {
  servers: number;
  arrivalRate: number;
  serviceRate: number;
}) => {
  const serverOptions = [Math.max(1, servers - 1), servers, servers + 1];

  const data = serverOptions.map((c) => ({
    servers: `c=${c}`,
    avgWaitTime: calculateAvgWaitSeconds(arrivalRate, serviceRate, c),
    isCurrent: c === servers,
  }));

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex-1">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#1a1a2e]">
          Wait Time Distribution
        </h3>
        <p className="text-gray-400 text-sm">
          Impact of server count on average delay
        </p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="servers"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => {
                if (value === undefined) return ["-", "Avg Wait Time"];
                return [`${Number(value).toFixed(1)} sec`, "Avg Wait Time"];
              }}
            />

            <Bar dataKey="avgWaitTime" barSize={45} radius={[10, 10, 10, 10]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.isCurrent ? "#3b21f8" : "#e5e7eb"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50">
        <p className="text-xs text-gray-400 text-center">
          * Adding servers significantly reduces waiting time until saturation
        </p>
      </div>
    </div>
  );
};

export default WaitTimeDistributionChart;
