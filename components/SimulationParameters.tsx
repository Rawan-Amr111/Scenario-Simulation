"use client";
interface Props {
  params: {
    arrivalRate: number;
    serviceRate: number;
    numServers: number;
    simDuration: number;
  };
  setParams: React.Dispatch<
    React.SetStateAction<{
      arrivalRate: number;
      serviceRate: number;
      numServers: number;
      simDuration: number;
    }>
  >;
  onRun: () => void;
}
const SimulationParameters = ({ params, setParams, onRun }: Props) => {
  const handleChange = (key: string, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value === "" ? 0 : Number(value) }));
  };
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg w-3/12  left-0 flex flex-col sticky h-fit top-0 ">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Simulation Parameters
        </h3>

        {/* Arrival Rate */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arrival Rate (λ)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={params.arrivalRate}
              onChange={(e) => handleChange("arrivalRate", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="w-12 text-right text-gray-600">
              {params.arrivalRate} req/min
            </span>
          </div>
        </div>

        {/* Service Rate */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Rate (μ)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={params.serviceRate}
              onChange={(e) => handleChange("serviceRate", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="w-12 text-right text-gray-600">
              {params.serviceRate} req/min
            </span>
          </div>
        </div>

        {/* Number of Servers */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Servers (c)
          </label>
          <input
            type="text"
            value={params.numServers}
            onChange={(e) => handleChange("numServers", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Simulation Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Simulation Duration
          </label>
          <select
            value={params.simDuration}
            onChange={(e) => handleChange("simDuration", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={30}>30 Minutes</option>
            <option value={60}>60 Minutes</option>
            <option value={120}>120 Minutes</option>
          </select>
        </div>
      </div>
      <div>
        <button
          className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md font-semibold hover:from-indigo-600 hover:to-purple-600 transition duration-300 cursor-pointer"
          onClick={onRun}
        >
          Run Simulation
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Current model uses <strong>M/M/c</strong> stochastic distribution.
        </p>
      </div>
    </div>
  );
};

export default SimulationParameters;
