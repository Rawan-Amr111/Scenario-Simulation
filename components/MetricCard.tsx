interface MetricCardProps {
  title: string;
  mainVal: string;
  mainSub?: string;
  baseVal: string;
  baseSub?: string;
  percentage: string;
  isPositive: boolean;
}
const MetricCard = ({
  title,
  mainVal,
  mainSub,
  baseVal,
  baseSub,
  percentage,
  isPositive,
}: MetricCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-6">
      <h3 className="text-gray-700 font-bold text-lg">{title}</h3>
    </div>

    {/* Scenario A (Current) */}
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-gray-400 text-sm font-medium">Scenario A</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-900">
            {mainVal}
            <span className="text-lg ml-0.5">{mainSub}</span>
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center ${isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {percentage} {isPositive ? "↓" : "↑"}
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-indigo-600 h-full w-[80%]" />
      </div>
    </div>

    {/* Scenario B (Base) */}
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-gray-400 text-sm font-medium">
          Scenario B (Base)
        </span>
        <span className="text-xl font-bold text-gray-800">
          {baseVal}
          <span className="text-base ml-0.5">{baseSub}</span>
        </span>
      </div>
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-gray-400 h-full w-[65%]" />
      </div>
    </div>
  </div>
);

export default MetricCard;
