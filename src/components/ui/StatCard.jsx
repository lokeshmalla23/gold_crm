import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, change, icon: Icon, iconBg = 'bg-amber-100', iconColor = 'text-amber-600', suffix }) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2 truncate">{value}{suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}</p>
          {change !== undefined && change !== null && (
            <div className="mt-3 flex items-center gap-1">
              {isPositive && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
              {isNegative && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
              <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-gray-500'}`}>
                {isPositive && '+'}{change}%
              </span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
