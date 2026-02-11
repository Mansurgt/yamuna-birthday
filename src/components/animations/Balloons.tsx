import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const balloonColors = [
  'hsl(330, 70%, 70%)',   // pink
  'hsl(270, 50%, 75%)',   // lavender
  'hsl(160, 50%, 75%)',   // mint
  'hsl(25, 80%, 80%)',    // peach
  'hsl(200, 70%, 80%)',   // blue
  'hsl(45, 90%, 75%)',    // yellow
];

interface BalloonsProps {
  count?: number;
  active?: boolean;
}

export const Balloons = ({ count = 15, active = true }: BalloonsProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (!active) return;
    
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < count; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 100,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        delay: Math.random() * 5,
        size: 40 + Math.random() * 30,
      });
    }
    setBalloons(newBalloons);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
            bottom: -100,
          }}
          initial={{ y: 0 }}
          animate={{
            y: '-120vh',
            x: [0, 20, -20, 10, -10, 0],
          }}
          transition={{
            y: { duration: 15 + Math.random() * 10, delay: balloon.delay, repeat: Infinity },
            x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Balloon body */}
          <svg
            width={balloon.size}
            height={balloon.size * 1.2}
            viewBox="0 0 40 48"
            fill="none"
          >
            <ellipse
              cx="20"
              cy="18"
              rx="18"
              ry="18"
              fill={balloon.color}
            />
            <ellipse
              cx="14"
              cy="12"
              rx="4"
              ry="5"
              fill="white"
              fillOpacity="0.3"
            />
            <polygon
              points="20,36 16,42 24,42"
              fill={balloon.color}
            />
            <line
              x1="20"
              y1="42"
              x2="20"
              y2="55"
              stroke={balloon.color}
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Balloons;
