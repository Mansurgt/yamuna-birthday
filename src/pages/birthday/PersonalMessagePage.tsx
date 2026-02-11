import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FloatingHearts, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { ArrowRight, Heart, Gift, Cake } from 'lucide-react';

export const PersonalMessagePage = () => {
  const { data, nextPage } = useBirthdayStore();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayedText.length < data.personalMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(data.personalMessage.slice(0, displayedText.length + 1));
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, data.personalMessage]);

  return (
    <div className="min-h-screen gradient-celebration relative overflow-hidden flex flex-col items-center justify-center px-4 py-10">
      <FloatingHearts count={15} />
      <Sparkles count={20} color="hsl(330, 70%, 70%)" />

      {/* Decorative icons */}
      <motion.div
        className="absolute top-16 left-8 md:left-16"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Gift className="h-10 w-10 md:h-14 md:w-14 text-birthday-coral" />
      </motion.div>
      <motion.div
        className="absolute top-24 right-8 md:right-20"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <Cake className="h-10 w-10 md:h-12 md:w-12 text-birthday-lavender" />
      </motion.div>

      {/* Greeting card */}
      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ scale: 0, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: 'spring', damping: 15, duration: 0.8 }}
      >
        {/* Card outer */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-birthday-pink/20 p-8 md:p-12 relative overflow-hidden">
          {/* Decorative border */}
          <div className="absolute inset-2 border-4 border-dashed border-birthday-pink/30 rounded-2xl pointer-events-none" />
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-3xl">💝</div>
          <div className="absolute top-4 right-4 text-3xl">💖</div>
          <div className="absolute bottom-4 left-4 text-3xl">🌸</div>
          <div className="absolute bottom-4 right-4 text-3xl">🎀</div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="h-10 w-10 text-birthday-coral mx-auto mb-3 fill-birthday-coral" />
            <h2 className="text-3xl md:text-4xl font-display font-black text-birthday-lavender">
              Hey Yamuna 🐒
            </h2>
          </motion.div>

          {/* Typewriter message */}
          <motion.div
            className="min-h-[150px] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-lg md:text-xl font-display text-foreground leading-relaxed">
              {displayedText}
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-6 bg-birthday-pink ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTyping ? 0 : 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl font-display font-bold text-birthday-pink italic">
              With all my love 💕
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        className="mt-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 30 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={nextPage}
          size="lg"
          disabled={isTyping}
          className="bg-gradient-to-r from-birthday-pink to-birthday-lavender hover:from-birthday-lavender hover:to-birthday-pink text-white font-display font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-birthday-pink/40 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
        >
          Let's See the Unforgettable Memories
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PersonalMessagePage;
