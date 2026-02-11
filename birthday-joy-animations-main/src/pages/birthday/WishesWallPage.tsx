import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Balloons, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { ArrowRight } from 'lucide-react';

const wishes = [
  { message: "You care for me like my own parents would — always checking on me, making sure I'm okay, and loving me unconditionally. You're the comfort I never knew I needed! 💕", from: "My Mom & Dad", color: "bg-birthday-pink" },
  { message: "You're my partner in crime, my late-night chat buddy, the one who knows all my secrets. Every moment with you is an adventure. You're the best friend anyone could ask for! 🤗", from: "My Best Friend", color: "bg-birthday-lavender" },
  { message: "You shower me with wisdom, patience, and endless warmth — just like a grandmother would. Your gentle soul makes me feel so safe and loved! 🌟", from: "My Grandmother", color: "bg-birthday-mint" },
  { message: "You make my heart flutter with your kindness and the little things you do. You're the one I secretly admire every single day. You're absolutely magical! 💖", from: "My Secret Admirer", color: "bg-birthday-peach" },
  { message: "You ARE my family. You make me feel like I belong, like I'm home wherever you are. You bring so much love into my life! 🏠✨", from: "My Family", color: "bg-birthday-coral" },
  { message: "You inspire me to be better, to dream bigger, to never give up. Your guidance and belief in me pushes me forward every day. Thank you for being my mentor! 📚🌈", from: "My Mentor", color: "bg-birthday-blue" },
];

export const WishesWallPage = () => {
  const { nextPage } = useBirthdayStore();

  return (
    <div className="min-h-screen gradient-magic relative overflow-hidden py-10 px-4">
      <Balloons count={8} />
      <Sparkles count={15} />

      {/* Header */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-birthday-lavender mb-4">
          The Roles You Play in My Life 💕
        </h1>
      </motion.div>

      {/* Wishes grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -5, 0],
            }}
            transition={{
              delay: index * 0.15,
              type: 'spring',
              damping: 12,
              y: {
                delay: index * 0.15 + 0.5,
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: Math.random() > 0.5 ? 3 : -3,
              transition: { duration: 0.2 },
            }}
            className={`${wish.color} rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden`}
          >
            {/* Speech bubble tail */}
            <div 
              className={`absolute -bottom-2 left-6 w-4 h-4 ${wish.color} transform rotate-45`}
            />
            
            {/* Content */}
            <p className="text-white font-display text-lg mb-4 leading-relaxed">
              "{wish.message}"
            </p>
            <p className="text-white/80 font-display font-bold text-sm text-right">
              — {wish.from}
            </p>

            {/* Decorative sparkle */}
            <motion.div
              className="absolute top-3 right-3 text-white/50"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Continue button */}
      <motion.div
        className="text-center mt-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: wishes.length * 0.15 + 0.5 }}
      >
        <Button
          onClick={nextPage}
          size="lg"
          className="bg-gradient-to-r from-birthday-coral to-birthday-yellow hover:from-birthday-yellow hover:to-birthday-coral text-white font-display font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-birthday-coral/40 hover:shadow-xl hover:scale-105 transition-all"
        >
          Time for Cake! 🎂
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

      {/* Streamers decoration */}
      <div className="absolute top-0 left-0 w-full h-20 flex justify-around opacity-60 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-full"
            style={{
              background: `linear-gradient(180deg, ${['hsl(330,70%,70%)', 'hsl(270,50%,75%)', 'hsl(160,50%,75%)', 'hsl(200,70%,80%)'][i % 4]}, transparent)`,
            }}
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
};

export default WishesWallPage;
