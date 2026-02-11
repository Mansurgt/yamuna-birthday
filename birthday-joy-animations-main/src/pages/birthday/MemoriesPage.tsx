import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Balloons, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { ArrowRight } from 'lucide-react';

const memories = [
  {
    title: 'First Chat',
    note: 'That first little hello that started everything.',
    color: 'bg-birthday-pink',
  },
  {
    title: 'Laughs',
    note: 'All the silly moments that never get old.',
    color: 'bg-birthday-lavender',
  },
  {
    title: 'Late Night Talks',
    note: 'When time stopped and we just talked.',
    color: 'bg-birthday-mint',
  },
  {
    title: 'Adventures',
    note: 'Every memory feels like a mini celebration.',
    color: 'bg-birthday-peach',
  },
  {
    title: 'Support',
    note: 'Always there, always kind.',
    color: 'bg-birthday-blue',
  },
  {
    title: 'Today',
    note: 'More memories, more smiles, more love.',
    color: 'bg-birthday-coral',
  },
];

export const MemoriesPage = () => {
  const { nextPage } = useBirthdayStore();

  return (
    <div className="min-h-screen gradient-magic relative overflow-hidden py-10 px-4">
      <Balloons count={8} />
      <Sparkles count={15} />

      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-birthday-lavender mb-2">
          Our Memories
        </h1>
        <p className="text-lg md:text-xl font-display text-birthday-coral">
          Little moments that mean everything.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${memory.color} rounded-2xl p-6 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/20" />
            <div className="text-white font-display text-2xl font-black mb-2">
              {memory.title}
            </div>
            <p className="text-white/90 font-display text-base leading-relaxed">
              {memory.note}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm text-white/90">
              <span>Photo</span>
              <span aria-hidden>📷</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-10 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: memories.length * 0.1 + 0.2 }}
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

      <div className="absolute top-0 left-0 w-full h-16 flex justify-around opacity-60 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-full"
            style={{
              background: `linear-gradient(180deg, ${['hsl(330,70%,70%)', 'hsl(270,50%,75%)', 'hsl(160,50%,75%)'][i % 3]}, transparent)`,
            }}
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoriesPage;
