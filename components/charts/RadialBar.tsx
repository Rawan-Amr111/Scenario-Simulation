"use client";
import { getBarColor } from "@/constants";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const ProbabilityGauge = ({ probability }: { probability: number }) => {
  const data = [{ value: probability }];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center min-h-75">
      <h3 className="text-lg font-bold self-start mb-2 text-gray-800">
        Wait Probability
      </h3>
      <p className="text-xs text-gray-400 self-start mb-4">
        Chance of landing in a queue
      </p>

      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={15}
              fill={getBarColor(probability)}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <span className="text-4xl font-black text-gray-800">
            {probability}%
          </span>
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Likelihood
          </span>
        </div>
      </div>

      <div className="mt-4 w-full bg-gray-50 rounded-xl p-3">
        <p className="text-[11px] text-gray-500 text-center leading-relaxed">
          {probability >= 70
            ? "High congestion: Most arrivals will experience waiting delays."
            : probability >= 40
              ? "Moderate load: Some arrivals may experience short waits."
              : "Low congestion: Most arrivals are served immediately."}
        </p>
      </div>
    </div>
  );
};

export default ProbabilityGauge;
