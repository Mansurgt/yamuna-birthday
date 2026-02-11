import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const colors = [
  'hsl(330, 70%, 70%)',   // pink
  'hsl(270, 50%, 75%)',   // lavender
  'hsl(160, 50%, 75%)',   // mint
  'hsl(25, 80%, 80%)',    // peach
  'hsl(200, 70%, 80%)',   // blue
  'hsl(45, 90%, 75%)',    // yellow
];

interface ConfettiProps {
  count?: number;
  active?: boolean;
}

export const Confetti = ({ count = 50, active = true }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;
    
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
      });
    }
    setPieces(newPieces);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: -20,
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
          initial={{ y: -50, rotate: 0, opacity: 1 }}
          animate={{
            y: '100vh',
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
