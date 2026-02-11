import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti, Fireworks, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { Wind, RefreshCw } from 'lucide-react';

interface Candle {
  id: number;
  x: number;
  color: string;
  lit: boolean;
}

export const CakeAndCandlesPage = () => {
  const { data, candlesBlown, setCandlesBlown, setCurrentPage } = useBirthdayStore();
  const [showFireworks, setShowFireworks] = useState(false);
  const [candles, setCandles] = useState<Candle[]>(() => {
    const colors = ['hsl(45, 90%, 75%)', 'hsl(330, 70%, 75%)', 'hsl(160, 50%, 75%)', 'hsl(200, 70%, 80%)', 'hsl(270, 50%, 75%)'];
    return Array.from({ length: Math.min(data.age, 10) }, (_, i) => ({
      id: i,
      x: 20 + (60 / Math.min(data.age, 10)) * i,
      color: colors[i % colors.length],
      lit: true,
    }));
  });

  const blowCandles = () => {
    // Blow out candles one by one with delay
    candles.forEach((_, i) => {
      setTimeout(() => {
        setCandles(prev => prev.map((c, idx) => 
          idx === i ? { ...c, lit: false } : c
        ));
      }, i * 150);
    });

    // Show celebration after all candles are blown
    setTimeout(() => {
      setCandlesBlown(true);
      setShowFireworks(true);
    }, candles.length * 150 + 500);
  };

  const restart = () => {
    setCurrentPage(1);
    setCandlesBlown(false);
    setShowFireworks(false);
    setCandles(prev => prev.map(c => ({ ...c, lit: true })));
  };

  return (
    <div className="min-h-screen gradient-celebration relative overflow-hidden flex flex-col items-center justify-center px-4">
      {candlesBlown && <Confetti count={100} />}
      <Fireworks active={showFireworks} burstCount={8} />
      <Sparkles count={20} />

      <AnimatePresence mode="wait">
        {!candlesBlown ? (
          <motion.div
            key="cake"
            className="text-center z-10"
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-birthday-lavender mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Make a Wish! ✨
            </motion.h1>

            {/* Interactive Cake */}
            <motion.div
              className="relative mx-auto mb-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              style={{ width: 300, height: 350 }}
            >
              <svg viewBox="0 0 300 350" fill="none" className="w-full h-full">
                {/* Plate */}
                <ellipse cx="150" cy="325" rx="140" ry="18" fill="hsl(25, 80%, 90%)" />
                
                {/* Bottom layer */}
                <rect x="30" y="230" width="240" height="90" rx="12" fill="hsl(330, 70%, 75%)" />
                <rect x="30" y="230" width="240" height="20" rx="8" fill="hsl(330, 70%, 82%)" />
                
                {/* Middle layer */}
                <rect x="55" y="150" width="190" height="85" rx="10" fill="hsl(270, 50%, 80%)" />
                <rect x="55" y="150" width="190" height="18" rx="6" fill="hsl(270, 50%, 85%)" />
                
                {/* Top layer */}
                <rect x="80" y="80" width="140" height="75" rx="8" fill="hsl(200, 70%, 85%)" />
                <rect x="80" y="80" width="140" height="15" rx="5" fill="hsl(200, 70%, 90%)" />
                
                {/* Frosting drips */}
                <path d="M30 230 Q40 255, 30 280" stroke="hsl(330, 70%, 85%)" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M270 230 Q260 260, 270 290" stroke="hsl(330, 70%, 85%)" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M100 230 Q110 245, 100 260" stroke="hsl(330, 70%, 85%)" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M200 230 Q190 250, 200 270" stroke="hsl(330, 70%, 85%)" strokeWidth="8" fill="none" strokeLinecap="round" />
                
                {/* Decorations */}
                <circle cx="70" cy="270" r="8" fill="hsl(45, 90%, 75%)" />
                <circle cx="150" cy="275" r="8" fill="hsl(45, 90%, 75%)" />
                <circle cx="230" cy="270" r="8" fill="hsl(45, 90%, 75%)" />
                <circle cx="100" cy="190" r="6" fill="hsl(160, 50%, 75%)" />
                <circle cx="200" cy="190" r="6" fill="hsl(160, 50%, 75%)" />
                
                {/* Candles */}
                {candles.map((candle) => (
                  <g key={candle.id}>
                    {/* Candle body */}
                    <rect 
                      x={candle.x + 70} 
                      y="40" 
                      width="12" 
                      height="45" 
                      rx="3" 
                      fill={candle.color} 
                    />
                    {/* Flame or smoke */}
                    {candle.lit ? (
                      <motion.g
                        animate={{ 
                          scaleY: [1, 1.2, 0.9, 1],
                          scaleX: [1, 0.9, 1.1, 1],
                        }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        style={{ transformOrigin: `${candle.x + 76}px 35px` }}
                      >
                        <ellipse 
                          cx={candle.x + 76} 
                          cy="30" 
                          rx="8" 
                          ry="14" 
                          fill="hsl(30, 100%, 60%)" 
                        />
                        <ellipse 
                          cx={candle.x + 76} 
                          cy="26" 
                          rx="4" 
                          ry="7" 
                          fill="hsl(45, 100%, 70%)" 
                        />
                      </motion.g>
                    ) : (
                      <motion.ellipse
                        cx={candle.x + 76}
                        cy="30"
                        rx="10"
                        ry="15"
                        fill="hsl(0, 0%, 70%)"
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ 
                          opacity: 0, 
                          scale: 2,
                          y: -30,
                        }}
                        transition={{ duration: 1.5 }}
                      />
                    )}
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Blow button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={blowCandles}
                size="lg"
                className="bg-gradient-to-r from-birthday-blue to-birthday-mint hover:from-birthday-mint hover:to-birthday-blue text-white font-display font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-birthday-blue/40 hover:shadow-xl hover:scale-105 transition-all"
              >
                <Wind className="mr-2 h-6 w-6" />
                Blow the Candles!
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="text-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 8 }}
          >
            <motion.div
              className="mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <span className="text-8xl md:text-9xl">🎉</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, hsl(330, 70%, 65%), hsl(270, 50%, 70%), hsl(200, 70%, 75%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '3px 3px 0px rgba(255,255,255,0.3)',
              }}
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              Happy Birthday!
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl font-display text-birthday-lavender mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {data.name}, you're {data.age}! 🎂
            </motion.p>

            <motion.p
              className="text-xl text-birthday-coral mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              May all your wishes come true! ✨💖
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={restart}
                size="lg"
                variant="outline"
                className="border-birthday-pink text-birthday-pink hover:bg-birthday-pink hover:text-white font-display font-bold text-lg px-8 py-5 rounded-full"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Celebrate Again!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CakeAndCandlesPage;
