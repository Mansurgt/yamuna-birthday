import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  delay: number;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const colors = [
  'hsl(330, 70%, 70%)',
  'hsl(270, 50%, 75%)',
  'hsl(45, 90%, 75%)',
  'hsl(200, 70%, 80%)',
  'hsl(25, 80%, 80%)',
];

interface FireworksProps {
  active?: boolean;
  burstCount?: number;
}

export const Fireworks = ({ active = false, burstCount = 5 }: FireworksProps) => {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);

  useEffect(() => {
    if (!active) {
      setBursts([]);
      return;
    }

    const createBurst = (id: number) => {
      const particles: Particle[] = [];
      const particleCount = 20 + Math.floor(Math.random() * 15);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          angle: (360 / particleCount) * i + Math.random() * 20,
          distance: 80 + Math.random() * 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
          delay: Math.random() * 0.1,
        });
      }

      return {
        id,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 50,
        particles,
      };
    };

    const initialBursts = Array.from({ length: burstCount }, (_, i) => createBurst(i));
    setBursts(initialBursts);

    const interval = setInterval(() => {
      setBursts((prev) => {
        const newBurst = createBurst(Date.now());
        return [...prev.slice(-4), newBurst];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [active, burstCount]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
          }}
        >
          {burst.particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0.5],
                x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fireworks;
