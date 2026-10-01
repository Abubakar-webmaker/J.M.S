import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ApplicationTrendPoint } from '../../types/dashboard.types';

interface ApplicationTrendChartProps {
  data: ApplicationTrendPoint[];
}

function formatAxisDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Application Trend Chart
 * 
 * Line chart showing application volume over time
 * Uses primary green color for the trend line
 * Responsive height with proper accessibility
 */
export function ApplicationTrendChart({ data }: ApplicationTrendChartProps) {
  const hasData = data.length > 0;

  return (
    <section
      aria-labelledby="trend-chart-heading"
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h2
        id="trend-chart-heading"
        className="mb-6 text-lg font-bold text-neutral-900"
      >
        Application trend
      </h2>

      {hasData ? (
        <>
          {/* Screen-reader summary */}
          <p className="sr-only">
            Application trend over {data.length} data points. Range:{' '}
            {formatAxisDate(data[0].date)} to{' '}
            {formatAxisDate(data[data.length - 1].date)}.
            Total applications:{' '}
            {data.reduce((sum, p) => sum + p.count, 0)}.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-neutral-200)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatAxisDate}
                  tick={{ fontSize: 12, fill: 'var(--color-neutral-600)' }}
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: 'var(--color-neutral-600)' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  labelFormatter={(label) =>
                    typeof label === 'string' ? formatAxisDate(label) : label
                  }
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: '8px',
                    border: '1px solid var(--color-neutral-200)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-neutral-900)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  cursor={{ strokeDasharray: '3 3', stroke: 'var(--color-neutral-300)' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Applications"
                  stroke="var(--color-primary-600)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: 'var(--color-primary-600)' }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-neutral-600">
            No application activity for this period.
          </p>
        </div>
      )}
    </section>
  );
}
