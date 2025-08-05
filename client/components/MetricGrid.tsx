interface MetricItem {
  label: string;
  value: number;
}

interface MetricGridProps {
  title: string;
  metrics: MetricItem[];
  columns?: number;
}

export function MetricGrid({ title, metrics, columns = 3 }: MetricGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
  };

  return (
    <div className="bg-dashboard-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>

      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
