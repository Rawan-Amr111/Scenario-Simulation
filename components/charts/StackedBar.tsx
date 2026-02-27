"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const TimeDistributionChart = ({
  waitTime,
  serviceTime,
}: {
  waitTime: number;
  serviceTime: number;
}) => {
  const data = [{ waitTime, serviceTime }];
  const total = waitTime + serviceTime;
  const waitPercentage = total > 0 ? ((waitTime / total) * 100).toFixed(0) : 0;
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
      <h3 className="text-xl font-bold mb-6 text-gray-900">
        Time Distribution Analysis
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: -20, right: 30, top: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e2e8f0"
            />

            <XAxis
              type="number"
              tick={{ fill: "#475569", fontSize: 14, fontWeight: 600 }}
              axisLine={{ stroke: "#cbd5e1" }}
              unit="s"
            />
            <YAxis type="category" hide />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={() => "Time Metrics"}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{
                paddingBottom: "30px",
                color: "#1e293b",
                fontWeight: 600,
              }}
            />

            <Bar
              dataKey="waitTime"
              name="Wait Time (Wq)"
              stackId="a"
              fill="#4f46e5"
              radius={[6, 0, 0, 6]}
              barSize={45}
            />

            <Bar
              dataKey="serviceTime"
              name="Service Time (1/μ)"
              stackId="a"
              fill="#94a3b8"
              radius={[0, 6, 6, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 bg-slate-50 py-3 rounded-2xl border border-slate-100 text-center">
        <p className="text-sm text-gray-700">
          Wait time represents{" "}
          <span className="text-indigo-700 font-extrabold text-base">
            {waitPercentage}%
          </span>
          of the total system time.
        </p>
      </div>
    </div>
  );
};

export default TimeDistributionChart;
