import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/pretty-little-baby.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-play music on any first click/tap on the page
  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted && audioRef.current) {
      setHasInteracted(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    }
  }, [hasInteracted]);

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [handleFirstInteraction]);

  const toggleMusic = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked - user needs to interact first
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
    >
      <Button
        onClick={toggleMusic}
        size="icon"
        className="h-14 w-14 rounded-full bg-birthday-pink hover:bg-birthday-coral shadow-lg shadow-birthday-pink/30"
      >
        <motion.div
          animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-white" />
          ) : hasInteracted ? (
            <VolumeX className="h-6 w-6 text-white" />
          ) : (
            <Music className="h-6 w-6 text-white" />
          )}
        </motion.div>
      </Button>
      {!hasInteracted && (
        <motion.span
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-birthday-pink font-medium bg-white px-2 py-1 rounded-full shadow"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎵 Play music
        </motion.span>
      )}
    </motion.div>
  );
};

export default MusicPlayer;
