import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  label?: string;
  icon?: LucideIcon;
  color?: "blue" | "orange" | "green" | "red" | "purple" | "pink";
}

const colorClasses = {
  blue: "bg-dashboard-accent-blue",
  orange: "bg-dashboard-accent-orange", 
  green: "bg-dashboard-accent-green",
  red: "bg-dashboard-accent-red",
  purple: "bg-dashboard-accent-purple",
  pink: "bg-dashboard-accent-pink",
};

export function StatCard({ title, value, label, icon: Icon, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-dashboard-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {label && <span className="text-sm text-muted-foreground">{label}</span>}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
