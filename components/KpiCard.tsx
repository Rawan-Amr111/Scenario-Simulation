import { memo } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  color: string;
  status?: string;
}
const KpiCard = memo(function KpiCard({
  title,
  value,
  color,
  status,
}: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <p className="text-gray-400 font-medium text-sm mb-2 uppercase tracking-wider">
        {title}
      </p>
      <div className="flex items-center justify-between">
        <p className={`font-bold text-3xl ${color}`}>{value}</p>
        {status && (
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-bold">
            {status}
          </span>
        )}
      </div>
    </div>
  );
});

export default KpiCard;
