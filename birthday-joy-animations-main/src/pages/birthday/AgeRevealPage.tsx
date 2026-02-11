import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti, Fireworks, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { ArrowRight, Calendar, Star } from 'lucide-react';

export const AgeRevealPage = () => {
  const { data, nextPage } = useBirthdayStore();
  const [countdown, setCountdown] = useState(3);
  const [revealed, setRevealed] = useState(false);
  const [countingDown, setCountingDown] = useState(true);

  useEffect(() => {
    if (countdown > 0 && countingDown) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !revealed) {
      setTimeout(() => {
        setRevealed(true);
        setCountingDown(false);
      }, 500);
    }
  }, [countdown, countingDown, revealed]);

  return (
    <div className="min-h-screen gradient-magic relative overflow-hidden flex flex-col items-center justify-center px-4">
      {revealed && <Confetti count={80} />}
      {revealed && <Fireworks active burstCount={6} />}
      <Sparkles count={25} />

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="countdown"
            className="text-center"
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.p
              className="text-2xl md:text-3xl font-display text-birthday-lavender mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Get ready for the big reveal...
            </motion.p>
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              className="text-[150px] md:text-[200px] font-display font-black text-birthday-pink"
              style={{ textShadow: '4px 4px 0px rgba(255,255,255,0.5)' }}
            >
              {countdown > 0 ? countdown : '🎉'}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            className="text-center z-10 flex flex-col items-center gap-3 md:gap-4"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 8, stiffness: 80 }}
          >
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/images/yamuna.jpg"
                alt="Yamuna"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-full ring-4 ring-birthday-lavender/60 shadow-xl"
              />
            </motion.div>
            {/* Age reveal */}
            <motion.div
              className="relative inline-block"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <motion.div
                className="text-[120px] md:text-[180px] lg:text-[220px] font-display font-black bg-gradient-to-br from-birthday-pink via-birthday-coral to-birthday-yellow bg-clip-text text-transparent"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ 
                  WebkitTextStroke: '3px hsl(330, 70%, 80%)',
                  filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.1))',
                }}
              >
                {data.age}
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Star className="h-12 w-12 text-birthday-yellow fill-birthday-yellow" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-4"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              >
                <Star className="h-8 w-8 text-birthday-mint fill-birthday-mint" />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-3xl md:text-4xl font-display font-bold text-birthday-lavender"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Years of Amazing You! ✨
            </motion.p>

            {/* Birth date */}
            <motion.div
              className="flex items-center justify-center gap-2 text-xl text-birthday-coral"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-display">{data.birthDate}</span>
            </motion.div>

            {/* Balloons popping from sides */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <span className="text-6xl">🎈</span>
            </motion.div>
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
            >
              <span className="text-6xl">🎈</span>
            </motion.div>

            {/* Continue button */}
            <motion.div
              className="-mt-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={nextPage}
                size="lg"
                className="bg-gradient-to-r from-birthday-lavender to-birthday-blue hover:from-birthday-blue hover:to-birthday-lavender text-white font-display font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-birthday-lavender/40 hover:shadow-xl hover:scale-105 transition-all"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgeRevealPage;
