import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white/50 border-t py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold gradient-text mb-2">
            YKS 2026 Hazırlık Platformu
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Başarıya giden yolda her adımını planla, takip et ve hedefe ulaş. 
            10 Eylül 2025 - 21 Haziran 2026 arası tam destek.
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          <span>Öğrenciler için</span>
          <Heart className="h-4 w-4 text-red-500 fill-current" />
          <span>ile yapıldı</span>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          © 2024 YKS Hazırlık Platformu. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};