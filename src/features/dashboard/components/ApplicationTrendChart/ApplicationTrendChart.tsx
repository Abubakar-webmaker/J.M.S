import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ApplicationTrendPoint } from '../../types/dashboard.types';

interface ApplicationTrendChartProps {
  data?: ApplicationTrendPoint[];
}

/**
 * Application Activity Chart
 *
 * Line chart with green area fill showing actual application trends.
 * X-axis: dates, Y-axis: application counts, dashed grid, no legend.
 */
export function ApplicationTrendChart({ data = [] }: ApplicationTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <section
        aria-labelledby="trend-chart-heading"
        className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <h2
          id="trend-chart-heading"
          className="text-[15px] font-semibold text-neutral-900"
        >
          Application Activity
        </h2>
        <div className="h-[260px] flex items-center justify-center text-neutral-500">
          No data available
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="trend-chart-heading"
      className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="trend-chart-heading"
          className="text-[15px] font-semibold text-neutral-900"
        >
          Application Activity
        </h2>

        <span className="text-xs text-neutral-500">Last {data.length} days</span>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#F3F4F6"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111827',
              }}
              cursor={{ stroke: '#D1D5DB' }}
              formatter={(value) => [`${value} applications`, 'Count']}
            />
            <Area
              type="monotone"
              dataKey="count"
              name="Applications"
              stroke="#16a34a"
              strokeWidth={2}
              fill="url(#activityFill)"
              dot={{ r: 3, fill: '#16a34a', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#16a34a' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
