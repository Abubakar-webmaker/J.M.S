import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { APPLICATION_STATUS_CONFIG } from '@/constants/application';

import { DASHBOARD_STATUS_TOKENS } from '../../constants/dashboard.constants';
import type { StatusDistributionItem } from '../../types/dashboard.types';

interface StatusDistributionChartProps {
  data: StatusDistributionItem[];
}

export function StatusDistributionChart({
  data,
}: StatusDistributionChartProps) {
  const hasData = data.length > 0 && data.some((d) => d.count > 0);

  return (
    <section
      aria-labelledby="status-chart-heading"
      className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
    >
      <h2
        id="status-chart-heading"
        className="mb-6 text-lg font-semibold text-neutral-900"
      >
        Status distribution
      </h2>

      {hasData ? (
        <>
          {/* Screen-reader summary */}
          <p className="sr-only">
            Application status breakdown:{' '}
            {data
              .map(
                (d) =>
                  `${APPLICATION_STATUS_CONFIG[d.status]?.label ?? d.status} ${d.count}`,
              )
              .join(', ')}
            .
          </p>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="80%"
                  paddingAngle={2}
                >
                  {data.map((item) => (
                    <Cell
                      key={item.status}
                      fill={
                        DASHBOARD_STATUS_TOKENS[item.status] ??
                        'var(--color-neutral-300)'
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    APPLICATION_STATUS_CONFIG[name as keyof typeof APPLICATION_STATUS_CONFIG]
                      ?.label ?? name,
                  ]}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: '8px',
                    border: '1px solid var(--color-neutral-200)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-neutral-900)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Textual legend */}
          <ul className="mt-6 space-y-2" aria-label="Status counts">
            {data.map((item) => {
              const config =
                APPLICATION_STATUS_CONFIG[
                  item.status as keyof typeof APPLICATION_STATUS_CONFIG
                ];
              const label = config?.label ?? item.status;
              const color =
                DASHBOARD_STATUS_TOKENS[item.status] ??
                'var(--color-neutral-300)';

              return (
                <li
                  key={item.status}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="text-neutral-600">{label}</span>
                  </span>
                  <span className="font-semibold text-neutral-900">{item.count}</span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-neutral-600">
            No application status data available.
          </p>
        </div>
      )}
    </section>
  );
}
