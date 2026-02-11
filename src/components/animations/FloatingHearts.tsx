import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  count?: number;
}

export const FloatingHearts = ({ count = 10 }: FloatingHeartsProps) => {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
    size: 16 + Math.random() * 16,
    color: [
      'hsl(330, 70%, 70%)',
      'hsl(350, 80%, 75%)',
      'hsl(10, 80%, 75%)',
    ][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: -50,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(heart.id) * 50, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
