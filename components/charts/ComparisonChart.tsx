"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Scenario } from "../ScenarioList";

const ComparisonCharts = ({ scenarios }: { scenarios: Scenario[] }) => {
  const dynamicData =
    scenarios[0]?.results?.chartData?.map((item, index) => ({
      time: `${item.time}m`,
      a: item.value,
      b: scenarios[1]?.results?.chartData?.[index]?.value || 0,
    })) || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      {/* 1. Queue Length Distribution (Bar Chart) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-800 font-bold text-lg">
            Queue Length Distribution
          </h3>
          <div className="flex gap-4 text-xs font-bold text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span> A
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-slate-200 rounded-sm"></span> B
            </span>
          </div>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dynamicData} barGap={8}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="a"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="b"
                fill="#e2e8f0"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Waiting Time Trends (Area Chart) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-gray-800 font-bold text-lg">
              Waiting Time Trends (60min)
            </h3>
          </div>
          <span className="text-gray-400 italic text-xs flex items-center gap-1">
            Live Simulation
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          </span>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dynamicData}>
              <defs>
                <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip />
              {/* Scenario B - Dashed Line */}
              <Area
                type="monotone"
                dataKey="b"
                stroke="#cbd5e1"
                strokeWidth={3}
                strokeDasharray="5 5"
                fill="transparent"
                dot={false}
              />
              {/* Scenario A - Solid Line with Gradient */}
              <Area
                type="monotone"
                dataKey="a"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorA)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCharts;
