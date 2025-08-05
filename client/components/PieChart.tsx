interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title: string;
}

export function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate angles for each segment
  let currentAngle = 0;
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      percentage: ((item.value / total) * 100).toFixed(1)
    };
    currentAngle += angle;
    return segment;
  });

  // Create SVG path for each segment
  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(50, 50, 40, endAngle);
    const end = polarToCartesian(50, 50, 40, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", 50, 50,
      "L", start.x, start.y,
      "A", 40, 40, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-dashboard-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Pie Chart */}
        <div className="w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="transition-opacity hover:opacity-80"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 space-y-3 w-full sm:w-auto">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-foreground">{segment.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{segment.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
