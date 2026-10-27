import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { DASHBOARD_STATUS_TOKENS } from '../../constants/dashboard.constants';
import type { StatusDistributionItem } from '../../types/dashboard.types';

interface StatusDistributionChartProps {
  statusDistribution?: StatusDistributionItem[];
  total?: number;
}

/**
 * Application Status Chart
 *
 * Donut chart with a centered total showing actual status distribution.
 * Right-side vertical legend with dot + label + count.
 */
export function StatusDistributionChart({
  statusDistribution = [],
  total = 0,
}: StatusDistributionChartProps) {
  if (!statusDistribution || statusDistribution.length === 0) {
    return (
      <section
        aria-labelledby="status-chart-heading"
        className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <h2
          id="status-chart-heading"
          className="mb-4 text-[15px] font-semibold text-neutral-900"
        >
          Application Status
        </h2>
        <div className="flex items-center justify-center h-[180px] text-neutral-500">
          No data available
        </div>
      </section>
    );
  }

  const chartData = statusDistribution.map((item) => ({
    label: item.status,
    value: item.count,
    color: DASHBOARD_STATUS_TOKENS[item.status] || '#6B7280',
  }));

  return (
    <section
      aria-labelledby="status-chart-heading"
      className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <h2
        id="status-chart-heading"
        className="mb-4 text-[15px] font-semibold text-neutral-900"
      >
        Application Status
      </h2>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={1}
                isAnimationActive={false}
              >
                {chartData.map((item) => (
                  <Cell key={item.label} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[26px] font-bold leading-none text-neutral-900">
              {total}
            </span>
            <span className="mt-1 text-xs text-neutral-400">Total</span>
          </div>
        </div>

        <ul className="flex w-full flex-1 flex-col gap-2.5" aria-label="Status counts">
          {chartData.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="text-[13px] text-neutral-700">{item.label}</span>
              <span className="ml-auto text-[13px] text-neutral-500">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
