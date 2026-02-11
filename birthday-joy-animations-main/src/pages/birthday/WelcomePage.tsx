import { motion } from 'framer-motion';
import { Sparkles, Gift, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confetti, Balloons, Sparkles as SparkleAnim, BirthdayCake } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';

export const WelcomePage = () => {
  const { data, nextPage } = useBirthdayStore();

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        damping: 10,
        stiffness: 100,
      },
    }),
  };

  const happyBirthday = "Happy Birthday!".split('');

  return (
    <div className="min-h-screen gradient-celebration relative overflow-hidden flex flex-col items-center justify-center px-4">
      <Confetti count={60} />
      <Balloons count={12} />
      <SparkleAnim count={30} />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Gift className="h-12 w-12 text-birthday-coral" />
      </motion.div>
      <motion.div
        className="absolute top-20 right-16"
        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <PartyPopper className="h-10 w-10 text-birthday-lavender" />
      </motion.div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Animated Happy Birthday text */}
        <motion.div
          className="flex flex-wrap justify-center mb-4"
          initial="hidden"
          animate="visible"
        >
          {happyBirthday.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black"
              style={{
                color: `hsl(${330 + i * 8}, 70%, 60%)`,
                textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Birthday person's name */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-birthday-lavender mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: 'spring', damping: 8 }}
          style={{ textShadow: '3px 3px 0px rgba(255,255,255,0.5)' }}
        >
          {data.name}! 🎉
        </motion.h2>

        {/* Animated cake */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 2, type: 'spring' }}
        >
          <BirthdayCake size={180} />
        </motion.div>

        {/* Enter button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <Button
            onClick={nextPage}
            size="lg"
            className="bg-gradient-to-r from-birthday-pink to-birthday-coral hover:from-birthday-coral hover:to-birthday-pink text-white font-display font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-birthday-pink/40 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Let's Celebrate!
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-birthday-pink/20 to-transparent" />
    </div>
  );
};

export default WelcomePage;
