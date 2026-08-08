import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Moon, Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
}

interface FloatingParticlesProps {
  openedCount?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ openedCount = 0 }) => {
  const particles = useMemo(() => {
    const items: Particle[] = [];
    const symbols = ['❤️', '💕', '✨', '🌸', '💖', '⭐'];

    // Increase particle density as gifts unlock
    const count = openedCount === 0 ? 12 : openedCount >= 10 ? 32 : 22;

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 10,
        duration: Math.random() * 8 + 7,
        delay: Math.random() * 6,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }
    return items;
  }, [openedCount]);

  const isNightScene = openedCount >= 13;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-all duration-1000">
      {/* Dynamic Background Radial Ambient Spotlights based on openedCount */}
      {openedCount <= 3 && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-950/15 rounded-full blur-[140px] transition-all duration-1000" />
      )}

      {openedCount >= 4 && openedCount <= 6 && (
        <>
          <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-rose-700/20 rounded-full blur-[140px] transition-all duration-1000" />
          <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-amber-600/15 rounded-full blur-[140px] transition-all duration-1000" />
        </>
      )}

      {openedCount >= 7 && openedCount <= 9 && (
        <>
          <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] transition-all duration-1000" />
          <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[150px] transition-all duration-1000" />
        </>
      )}

      {openedCount >= 10 && (
        <>
          <div className="absolute top-10 left-1/3 w-[700px] h-[700px] bg-amber-400/25 rounded-full blur-[160px] transition-all duration-1000" />
          <div className="absolute bottom-10 right-1/3 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[160px] transition-all duration-1000" />
        </>
      )}

      {/* ALL 13 GIFTS OPENED: PREMIUM NIGHT SCENE MOONLIGHT & TWINKLING STARS */}
      {isNightScene && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Subtle Moonlight in Corner */}
          <div className="absolute top-12 right-12 text-amber-200/70 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
            <Moon className="w-16 h-16 fill-amber-200/20" />
          </div>

          {/* Small Twinkling Night Stars */}
          {[...Array(24)].map((_, idx) => (
            <motion.div
              key={`star-${idx}`}
              className="absolute text-amber-200/80"
              style={{
                top: `${(idx * 13 + 7) % 85}%`,
                left: `${(idx * 19 + 5) % 95}%`,
              }}
              animate={{ opacity: [0.15, 0.95, 0.15], scale: [0.8, 1.25, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 2.5 + (idx % 3),
                delay: (idx % 4) * 0.4,
              }}
            >
              <Star className="w-2.5 h-2.5 fill-amber-200/80" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Animated Floating / Falling Hearts & Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: '-5%',
            fontSize: `${p.size}px`,
            filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.4))',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: ['0px', `${(p.id % 2 === 0 ? 1 : -1) * 30}px`, '0px'],
            rotate: [0, 20, -20, 0],
            opacity: openedCount === 0 ? [0, 0.4, 0.4, 0] : [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

