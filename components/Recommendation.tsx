import { getRecommendation } from "@/utils/queueLogic";
import { Scenario } from "./ScenarioList";

const Recommendation = ({ scenarios }: { scenarios: Scenario[] }) => {
  const recommendation = getRecommendation(scenarios);

  if (!recommendation) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-center gap-6 mb-8 mt-6">
      <div className="relative">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
          BEST
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 font-bold text-lg mb-1">
          QueueLab Insight: Recommendation
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Based on your simulation objectives,{" "}
          <span className="text-indigo-600 font-bold">
            {recommendation.name}
          </span>{" "}
          is the recommended configuration. It achieves a{" "}
          <span className="text-gray-900 font-bold">
            {recommendation.reduction}% reduction
          </span>{" "}
          in average waiting time while maintaining an optimal{" "}
          <span className="text-gray-900 font-bold">
            {recommendation.utilization}% resource utilization
          </span>
          . This balance minimizes idle time without causing significant
          bottlenecks.
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
