"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const QueueLineChart = ({
  data,
}: {
  data: { time: number; value: number }[];
}) => {
  return (
    <div className="bg-[#f8f9ff] rounded-3xl shadow-sm p-8 border border-gray-100">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-2xl font-bold text-[#1a1a2e]">System Dynamics</h3>
          <p className="text-gray-400 text-sm">
            Queue Behavior During Simulation
          </p>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#f0f0f0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={15}
              tickFormatter={(value) => `${value}m`}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dx={-10}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{ r: 4, fill: "#fff", stroke: "#4f46e5", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QueueLineChart;
