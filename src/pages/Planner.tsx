import { StudyPlanWizard } from "@/components/StudyPlanWizard";
import { DailyScheduler } from "@/components/DailyScheduler";
import { StudyTemplates } from "@/components/StudyTemplates";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const Planner = () => {
  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <Navigation />
      
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Çalışma Planı Oluşturucu
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              YKS 2026 sınavına hazırlanırken size özel bir çalışma planı oluşturun. 
              Plan, 10 Eylül 2025'ten 21 Haziran 2026'ya kadar tüm süreci kapsar.
            </p>
          </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 card-elevated text-center">
            <div className="text-2xl mb-4">🎯</div>
            <h3 className="font-semibold mb-2">Kişiselleştirilmiş Plan</h3>
            <p className="text-sm text-muted-foreground">
              Güçlü ve zayıf olduğunuz derslere göre özelleştirilen program
            </p>
          </Card>
          
          <Card className="p-6 card-elevated text-center">
            <div className="text-2xl mb-4">📊</div>
            <h3 className="font-semibold mb-2">Takip ve Analiz</h3>
            <p className="text-sm text-muted-foreground">
              Günlük, haftalık ve aylık ilerleme takibi ve analiz
            </p>
          </Card>
          
          <Card className="p-6 card-elevated text-center">
            <div className="text-2xl mb-4">📈</div>
            <h3 className="font-semibold mb-2">Sürekli Gelişim</h3>
            <p className="text-sm text-muted-foreground">
              Performansınıza göre kendini güncelleyen akıllı sistem
            </p>
          </Card>
        </div>

        {/* Wizard */}
        <StudyPlanWizard />

        {/* Export Options */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Planınızı İndirin</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              PDF İndir
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Excel İndir
            </Button>
          </div>
        </div>
        
        {/* Daily Scheduler */}
        <DailyScheduler />
        {/* Templates */}
        <StudyTemplates />
        </div>
      </div>

      <Footer />
    </div>
  );
};
