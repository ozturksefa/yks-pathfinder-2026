import { Card } from "@/components/ui/card";

interface ProgressCardProps {
  title: string;
  value: string | number;
  description: string;
  color: 'math' | 'physics' | 'chemistry' | 'biology' | 'turkish' | 'success' | 'primary';
  trend?: 'up' | 'down' | 'stable';
}

export const ProgressCard = ({ title, value, description, color, trend }: ProgressCardProps) => {
  const colorClasses = {
    math: 'text-math border-math/20 bg-math/5',
    physics: 'text-physics border-physics/20 bg-physics/5',
    chemistry: 'text-chemistry border-chemistry/20 bg-chemistry/5',
    biology: 'text-biology border-biology/20 bg-biology/5',
    turkish: 'text-turkish border-turkish/20 bg-turkish/5',
    success: 'text-green-600 border-green-200 bg-green-50',
    primary: 'text-primary border-primary/20 bg-primary/5',
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '→';
  };

  return (
    <Card className={`p-6 card-elevated transition-smooth hover:scale-105 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium opacity-80">{title}</h3>
        {trend && (
          <span className="text-xs opacity-60">
            {getTrendIcon()}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <p className="text-xs opacity-70">{description}</p>
    </Card>
  );
};