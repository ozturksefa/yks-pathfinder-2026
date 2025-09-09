import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const examDate = new Date("2026-06-21T09:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = examDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-hero rounded-2xl p-8 text-white text-center animate-pulse-glow">
      <h2 className="text-2xl font-bold mb-2">YKS 2026'ya Kalan Süre</h2>
      <p className="text-white/80 mb-6">21 Haziran 2026 • Sınav Günü</p>
      
      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-sm text-white/70">Gün</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm text-white/70">Saat</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm text-white/70">Dakika</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm text-white/70">Saniye</div>
        </div>
      </div>
    </div>
  );
};