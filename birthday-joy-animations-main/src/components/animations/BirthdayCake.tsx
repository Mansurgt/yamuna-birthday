import { motion } from 'framer-motion';

interface BirthdayCakeProps {
  size?: number;
  className?: string;
}

export const BirthdayCake = ({ size = 200, className = '' }: BirthdayCakeProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.2 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
        {/* Plate */}
        <ellipse cx="100" cy="225" rx="90" ry="12" fill="hsl(25, 80%, 85%)" />
        
        {/* Bottom layer */}
        <rect x="25" y="160" width="150" height="60" rx="8" fill="hsl(330, 70%, 75%)" />
        <rect x="25" y="160" width="150" height="15" rx="4" fill="hsl(330, 70%, 82%)" />
        
        {/* Middle layer */}
        <rect x="40" y="110" width="120" height="55" rx="6" fill="hsl(270, 50%, 80%)" />
        <rect x="40" y="110" width="120" height="12" rx="4" fill="hsl(270, 50%, 85%)" />
        
        {/* Top layer */}
        <rect x="55" y="70" width="90" height="45" rx="5" fill="hsl(200, 70%, 85%)" />
        <rect x="55" y="70" width="90" height="10" rx="4" fill="hsl(200, 70%, 90%)" />
        
        {/* Frosting drips */}
        <path d="M25 160 Q35 175, 25 190" stroke="hsl(330, 70%, 85%)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M175 160 Q165 180, 175 195" stroke="hsl(330, 70%, 85%)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M60 160 Q70 170, 60 180" stroke="hsl(330, 70%, 85%)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M140 160 Q130 172, 140 185" stroke="hsl(330, 70%, 85%)" strokeWidth="6" fill="none" strokeLinecap="round" />
        
        {/* Decorations - dots */}
        <circle cx="50" cy="185" r="5" fill="hsl(45, 90%, 75%)" />
        <circle cx="100" cy="185" r="5" fill="hsl(45, 90%, 75%)" />
        <circle cx="150" cy="185" r="5" fill="hsl(45, 90%, 75%)" />
        <circle cx="75" cy="135" r="4" fill="hsl(160, 50%, 75%)" />
        <circle cx="125" cy="135" r="4" fill="hsl(160, 50%, 75%)" />
        
        {/* Candles */}
        <g className="candle">
          <rect x="70" y="40" width="8" height="35" rx="2" fill="hsl(45, 90%, 75%)" />
          <motion.ellipse
            cx="74"
            cy="35"
            rx="6"
            ry="10"
            fill="hsl(30, 100%, 60%)"
            animate={{ scaleY: [1, 1.2, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="74"
            cy="32"
            rx="3"
            ry="5"
            fill="hsl(45, 100%, 70%)"
            animate={{ scaleY: [1, 1.3, 0.8, 1] }}
            transition={{ duration: 0.25, repeat: Infinity }}
          />
        </g>
        
        <g className="candle">
          <rect x="96" y="35" width="8" height="40" rx="2" fill="hsl(330, 70%, 75%)" />
          <motion.ellipse
            cx="100"
            cy="30"
            rx="6"
            ry="10"
            fill="hsl(30, 100%, 60%)"
            animate={{ scaleY: [1, 0.9, 1.2, 1], scaleX: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
          <motion.ellipse
            cx="100"
            cy="27"
            rx="3"
            ry="5"
            fill="hsl(45, 100%, 70%)"
            animate={{ scaleY: [1, 0.8, 1.3, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </g>
        
        <g className="candle">
          <rect x="122" y="40" width="8" height="35" rx="2" fill="hsl(160, 50%, 75%)" />
          <motion.ellipse
            cx="126"
            cy="35"
            rx="6"
            ry="10"
            fill="hsl(30, 100%, 60%)"
            animate={{ scaleY: [1, 1.1, 0.9, 1.2, 1], scaleX: [1, 0.95, 1.05, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          <motion.ellipse
            cx="126"
            cy="32"
            rx="3"
            ry="5"
            fill="hsl(45, 100%, 70%)"
            animate={{ scaleY: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 0.28, repeat: Infinity }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default BirthdayCake;
