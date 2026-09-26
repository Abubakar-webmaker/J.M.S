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
      className="rounded-xl border border-border bg-surface p-5 shadow-sm"
    >
      <h2
        id="status-chart-heading"
        className="mb-4 text-sm font-semibold text-text"
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
                        'var(--color-border)'
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
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Textual legend */}
          <ul className="mt-4 space-y-1.5" aria-label="Status counts">
            {data.map((item) => {
              const config =
                APPLICATION_STATUS_CONFIG[
                  item.status as keyof typeof APPLICATION_STATUS_CONFIG
                ];
              const label = config?.label ?? item.status;
              const color =
                DASHBOARD_STATUS_TOKENS[item.status] ??
                'var(--color-border)';

              return (
                <li
                  key={item.status}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="text-text-muted">{label}</span>
                  </span>
                  <span className="font-medium text-text">{item.count}</span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-text-muted">
            No application status data available.
          </p>
        </div>
      )}
    </section>
  );
}
