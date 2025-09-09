import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProgressCard } from "@/components/ProgressCard";
import { SubjectCard } from "@/components/SubjectCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-study.jpg";
import { Calendar, BookOpen, Target, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  // Mock data - in a real app this would come from a backend/local storage
  const mockStats = {
    daysStudied: 45,
    weeklyProgress: 78,
    averageScore: 65,
    totalHours: 180
  };

  const mockSubjects = [
    { 
      subject: 'Matematik', 
      color: 'math' as const, 
      progress: 65, 
      totalTopics: 120, 
      completedTopics: 78,
      nextTopic: 'Türev Uygulamaları' 
    },
    { 
      subject: 'Fizik', 
      color: 'physics' as const, 
      progress: 45, 
      totalTopics: 85, 
      completedTopics: 38,
      nextTopic: 'Elektrik ve Manyetizma' 
    },
    { 
      subject: 'Kimya', 
      color: 'chemistry' as const, 
      progress: 72, 
      totalTopics: 95, 
      completedTopics: 68,
      nextTopic: 'Organik Kimya Reaksiyonları' 
    },
    { 
      subject: 'Biyoloji', 
      color: 'biology' as const, 
      progress: 58, 
      totalTopics: 110, 
      completedTopics: 64,
      nextTopic: 'Hücre Bölünmesi' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            YKS 2026 Hazırlık
            <br />
            <span className="text-yellow-300">Başarı Planın</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            10 Eylül 2025'ten 21 Haziran 2026'ya kadarki yolculuğunda 
            her adımını planla, takip et ve hedefe ulaş! 🎯
          </p>
          
          <div className="mb-12">
            <CountdownTimer />
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 transition-bounce"
            onClick={() => window.location.href = '/planner'}
          >
            <Target className="mr-2 h-5 w-5" />
            Çalışma Planımı Başlat
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Çalışma İstatistiklerin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ProgressCard
              title="Çalıştığın Gün"
              value={mockStats.daysStudied}
              description="10 Eylül'den bu yana"
              color="primary"
              trend="up"
            />
            <ProgressCard
              title="Haftalık İlerleme"
              value={`${mockStats.weeklyProgress}%`}
              description="Bu haftaki hedef"
              color="success"
              trend="up"
            />
            <ProgressCard
              title="Ortalama Net"
              value={mockStats.averageScore}
              description="Son 5 deneme ortalaması"
              color="math"
              trend="up"
            />
            <ProgressCard
              title="Toplam Saat"
              value={`${mockStats.totalHours}h`}
              description="Toplam çalışma saati"
              color="turkish"
              trend="up"
            />
          </div>

          {/* Subjects Grid */}
          <h3 className="text-2xl font-bold mb-8">Ders Bazlı İlerleme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSubjects.map((subject, index) => (
              <SubjectCard key={index} {...subject} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            Hızlı Eylemler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
            >
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Günlük Planlama</div>
                <div className="text-sm text-muted-foreground">Bugünkü programını ayarla</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Konu Takibi</div>
                <div className="text-sm text-muted-foreground">Hangi konularda kaldığını gör</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="p-8 h-auto flex flex-col items-center gap-4 card-elevated hover:bg-primary/5"
            >
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Performans Analizi</div>
                <div className="text-sm text-muted-foreground">Grafiklerle gelişimini izle</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};