interface PolicyStatusProps {
  active: number;
  inactive: number;
  pending: number;
}

export function PolicyStatus({ active, inactive, pending }: PolicyStatusProps) {
  const total = active + inactive + pending;
  const activePercent = (active / total) * 100;
  const inactivePercent = (inactive / total) * 100;
  const pendingPercent = (pending / total) * 100;

  return (
    <div className="bg-dashboard-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Policy Status</h3>
      
      {/* Status Bar */}
      <div className="mb-4">
        <div className="flex h-3 rounded-full overflow-hidden bg-muted">
          <div 
            className="bg-dashboard-accent-orange transition-all duration-300"
            style={{ width: `${activePercent}%` }}
          />
          <div 
            className="bg-dashboard-accent-green transition-all duration-300"
            style={{ width: `${inactivePercent}%` }}
          />
          <div 
            className="bg-dashboard-accent-red transition-all duration-300"
            style={{ width: `${pendingPercent}%` }}
          />
        </div>
      </div>

      {/* Status Labels */}
      <div className="flex justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-dashboard-accent-orange"></div>
          <span className="text-foreground font-medium">Active</span>
          <span className="text-muted-foreground">{active}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-dashboard-accent-green"></div>
          <span className="text-foreground font-medium">Inactive</span>
          <span className="text-muted-foreground">{inactive}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-dashboard-accent-red"></div>
          <span className="text-foreground font-medium">Pending</span>
          <span className="text-muted-foreground">{pending}</span>
        </div>
      </div>
    </div>
  );
}
