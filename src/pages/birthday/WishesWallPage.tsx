import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Balloons, Sparkles } from '@/components/animations';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { ArrowRight, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

const memories = [
  { src: '/images/memories/memory-2.jpeg', title: 'Birthday Wishes 🎂', rotate: -3 },
  { src: '/images/memories/memory-1.jpeg', title: 'Chat Memory 💬', rotate: 2 },
  { src: '/images/memories/memory-3.jpeg', title: 'Relative Drama 😂', rotate: -2 },
  { src: '/images/memories/memory-4.jpeg', title: 'Bestfriend Vibes 😂', rotate: 3 },
  { src: '/images/memories/memory-5.jpeg', title: 'Money Meme 💸', rotate: -1 },
  { src: '/images/memories/memory-6.jpeg', title: 'Happy New Year 🎉', rotate: 2 },
  { src: '/images/memories/memory-7.jpeg', title: 'Nandri & Monkey Fight 🐵', rotate: -3 },
  { src: '/images/memories/memory-8.jpeg', title: 'Exam Support 📚', rotate: 1 },
  { src: '/images/memories/memory-9.jpeg', title: 'Ice Cream Kolupu 🍦', rotate: -2 },
  { src: '/images/memories/memory-10.jpeg', title: 'Jail Plan 🔒😂', rotate: 3 },
  { src: '/images/memories/memory-11.jpeg', title: 'Promise Ring 💍', rotate: -1 },
  { src: '/images/memories/memory-12.jpeg', title: 'Korangu Payanam 🐒', rotate: 2 },
];

const frameStyles = [
  { border: 'border-4 border-double border-pink-300', bg: 'bg-pink-50', shadow: 'shadow-pink-200/50' },
  { border: 'border-4 border-dashed border-purple-300', bg: 'bg-purple-50', shadow: 'shadow-purple-200/50' },
  { border: 'border-[5px] border-solid border-amber-300', bg: 'bg-amber-50', shadow: 'shadow-amber-200/50' },
  { border: 'border-4 border-double border-sky-300', bg: 'bg-sky-50', shadow: 'shadow-sky-200/50' },
  { border: 'border-4 border-dotted border-rose-400', bg: 'bg-rose-50', shadow: 'shadow-rose-200/50' },
  { border: 'border-[5px] border-solid border-emerald-300', bg: 'bg-emerald-50', shadow: 'shadow-emerald-200/50' },
  { border: 'border-4 border-double border-violet-400', bg: 'bg-violet-50', shadow: 'shadow-violet-200/50' },
  { border: 'border-4 border-dashed border-orange-300', bg: 'bg-orange-50', shadow: 'shadow-orange-200/50' },
  { border: 'border-[5px] border-solid border-cyan-300', bg: 'bg-cyan-50', shadow: 'shadow-cyan-200/50' },
  { border: 'border-4 border-double border-fuchsia-300', bg: 'bg-fuchsia-50', shadow: 'shadow-fuchsia-200/50' },
  { border: 'border-4 border-dotted border-yellow-400', bg: 'bg-yellow-50', shadow: 'shadow-yellow-200/50' },
  { border: 'border-4 border-dashed border-indigo-300', bg: 'bg-indigo-50', shadow: 'shadow-indigo-200/50' },
];

export const WishesWallPage = () => {
  const { nextPage } = useBirthdayStore();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    if (direction === 'prev' && selectedImage > 0) setSelectedImage(selectedImage - 1);
    if (direction === 'next' && selectedImage < memories.length - 1) setSelectedImage(selectedImage + 1);
  };

  return (
    <div className="min-h-screen gradient-magic relative overflow-hidden py-10 px-4">
      <Balloons count={6} />
      <Sparkles count={12} />

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Heart className="h-10 w-10 text-birthday-coral mx-auto mb-3 fill-birthday-coral" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-birthday-lavender mb-2">
          Memories 💬
        </h1>
        <p className="text-lg md:text-xl font-display text-birthday-coral">
          Our special chat moments pinned forever 📌🤎
        </p>
      </motion.div>

      {/* Memory Board - Polaroid Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: memory.rotate * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: memory.rotate }}
              transition={{
                delay: index * 0.08,
                type: 'spring',
                damping: 12,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.2 },
              }}
              onClick={() => setSelectedImage(index)}
              className="cursor-pointer group"
            >
              {/* Polaroid frame */}
              <div className={`${frameStyles[index % frameStyles.length].bg} ${frameStyles[index % frameStyles.length].border} rounded-lg shadow-xl p-2.5 pb-2.5 relative hover:shadow-2xl transition-shadow ${frameStyles[index % frameStyles.length].shadow}`}>
                {/* Tape decoration */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-200/80 rounded-sm rotate-2 z-10 shadow-sm" />

                {/* Corner decorations */}
                <div className="absolute top-1 left-1 text-[8px] opacity-60">✿</div>
                <div className="absolute top-1 right-1 text-[8px] opacity-60">✿</div>
                <div className="absolute bottom-1 left-1 text-[8px] opacity-60">✿</div>
                <div className="absolute bottom-1 right-1 text-[8px] opacity-60">✿</div>

                {/* Image */}
                <div className="aspect-[3/4] rounded overflow-hidden bg-gray-100 ring-1 ring-black/5">
                  <img
                    src={memory.src}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Pin emoji */}
                <motion.div
                  className="absolute -top-1 -right-1 text-lg z-10"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  📌
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev button */}
            {selectedImage > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-2 md:left-6 z-50 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Next button */}
            {selectedImage < memories.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-2 md:right-6 z-50 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Image card */}
            <motion.div
              key={selectedImage}
              className="bg-white rounded-2xl p-3 shadow-2xl max-w-sm md:max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[3/5] rounded-xl overflow-hidden">
                <img
                  src={memories[selectedImage].src}
                  alt={memories[selectedImage].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-display font-black text-lg text-birthday-lavender mt-3 mb-1">
                {memories[selectedImage].title}
              </p>
              <p className="text-center font-display text-sm text-birthday-coral/60">
                {selectedImage + 1} / {memories.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <motion.div
        className="text-center mt-10 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
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
