// app/saved-scenario/page.tsx
import React from "react";
import ScenariosList from "../../components/ScenarioList";

export default function SavedScenarioPage() {
  return (
    <div className="p-8 bg-[#f3f4ff] min-h-screen font-sans">
      {/* Header - Static Content */}
      <div className="m-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Saved Scenarios
          </h1>
          <p className="text-gray-600">
            Here you can view and manage your saved simulation scenarios. <br />
            First select your current scenario, then select a base scenario to
            compare against
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12">
        {/* Table Header - Static Content */}
        <div className="grid grid-cols-12 px-6 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3 flex items-center gap-6">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>Scenario Name</span>
          </div>
          <div className="col-span-1">Arrival (λ)</div>
          <div className="col-span-1">Service (μ)</div>
          <div className="col-span-1">Servers (c)</div>
          <div className="col-span-1">Avg Wait (Wq)</div>
          <div className="col-span-2">Utilization</div>
          <div className="col-span-3">Created At</div>
        </div>

        {/* Dynamic Client Content */}
        <ScenariosList />
      </div>
    </div>
  );
}
