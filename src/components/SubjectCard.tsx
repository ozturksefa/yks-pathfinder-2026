import { Card } from "@/components/ui/card";

interface SubjectCardProps {
  subject: string;
  color: 'math' | 'physics' | 'chemistry' | 'biology' | 'turkish' | 'history' | 'geography';
  progress: number;
  totalTopics: number;
  completedTopics: number;
  nextTopic?: string;
}

export const SubjectCard = ({ 
  subject, 
  color, 
  progress, 
  totalTopics, 
  completedTopics, 
  nextTopic 
}: SubjectCardProps) => {
  const colorClasses = {
    math: 'border-math/30 bg-gradient-to-br from-math/10 to-math/5',
    physics: 'border-physics/30 bg-gradient-to-br from-physics/10 to-physics/5',
    chemistry: 'border-chemistry/30 bg-gradient-to-br from-chemistry/10 to-chemistry/5',
    biology: 'border-biology/30 bg-gradient-to-br from-biology/10 to-biology/5',
    turkish: 'border-turkish/30 bg-gradient-to-br from-turkish/10 to-turkish/5',
    history: 'border-history/30 bg-gradient-to-br from-history/10 to-history/5',
    geography: 'border-geography/30 bg-gradient-to-br from-geography/10 to-geography/5',
  };

  const progressColorClasses = {
    math: 'bg-math',
    physics: 'bg-physics',
    chemistry: 'bg-chemistry',
    biology: 'bg-biology',
    turkish: 'bg-turkish',
    history: 'bg-history',
    geography: 'bg-geography',
  };

  return (
    <Card className={`p-6 card-elevated transition-smooth hover:scale-105 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{subject}</h3>
        <div className="text-2xl font-bold text-primary">
          {Math.round(progress)}%
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              color === 'math' ? 'bg-math' :
              color === 'physics' ? 'bg-physics' :
              color === 'chemistry' ? 'bg-chemistry' :
              color === 'biology' ? 'bg-biology' :
              color === 'turkish' ? 'bg-turkish' :
              color === 'history' ? 'bg-history' :
              'bg-geography'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <div className="font-medium">{completedTopics}</div>
          <div className="text-muted-foreground">Tamamlanan</div>
        </div>
        <div>
          <div className="font-medium">{totalTopics}</div>
          <div className="text-muted-foreground">Toplam Konu</div>
        </div>
      </div>
      
      {nextTopic && (
        <div className="text-xs bg-white/50 rounded-lg p-2">
          <div className="font-medium mb-1">Sıradaki Konu:</div>
          <div className="text-muted-foreground">{nextTopic}</div>
        </div>
      )}
    </Card>
  );
};