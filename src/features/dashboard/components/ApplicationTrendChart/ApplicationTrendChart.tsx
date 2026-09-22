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

export function ApplicationTrendChart({ data }: ApplicationTrendChartProps) {
  const hasData = data.length > 0;

  return (
    <section
      aria-labelledby="trend-chart-heading"
      className="rounded-xl border border-border bg-surface p-5 shadow-sm"
    >
      <h2
        id="trend-chart-heading"
        className="mb-4 text-sm font-semibold text-text"
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

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatAxisDate}
                  tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
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
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Applications"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-text-muted">
            No application activity for this period.
          </p>
        </div>
      )}
    </section>
  );
}
