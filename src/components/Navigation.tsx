import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: BookOpen },
    { path: '/planner', label: 'Plan Oluştur', icon: Calendar },
    { path: '/tracker', label: 'Takip', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text">
              YKS 2026
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    size="sm"
                    className={isActive ? "bg-gradient-primary" : ""}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};
