import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const CuteCharacter: React.FC = () => {
  const thoughts = [
    "Hi ASUU ❤️",
    "You found me! ✨",
    "ASUU is special ❤️",
    "Keep smiling 😊",
    "Don't forget to enjoy the surprise ✨",
    "There's still another surprise...",
  ];

  const [thoughtIndex, setThoughtIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % thoughts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-auto">
      {/* Animated Thought Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={thoughtIndex}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mb-2 max-w-[200px] px-3.5 py-2 rounded-2xl bg-slate-900/90 text-pink-100 border border-pink-400/40 shadow-xl text-xs font-semibold text-center relative glow-pink backdrop-blur-md select-none"
        >
          {thoughts[thoughtIndex]}
          {/* Bubble tail pointing down-right */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-pink-400/40 transform rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* Cute Animated Teddy/Cat SVG Character */}
      <motion.div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-pink-500/30 via-rose-500/20 to-purple-500/30 p-1 border border-pink-400/50 shadow-2xl cursor-pointer flex items-center justify-center glow-pink backdrop-blur-md"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setThoughtIndex((prev) => (prev + 1) % thoughts.length)}
        title="Tap me! 😊"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <circle cx="28" cy="28" r="14" fill="#f472b6" />
          <circle cx="28" cy="28" r="8" fill="#fda4af" />
          <circle cx="72" cy="28" r="14" fill="#f472b6" />
          <circle cx="72" cy="28" r="8" fill="#fda4af" />

          {/* Head */}
          <circle cx="50" cy="52" r="34" fill="#fbcfe8" />

          {/* Blinking / Happy Eyes */}
          <ellipse cx="38" cy="48" rx="4" ry="5" fill="#1e1b4b" />
          <ellipse cx="62" cy="48" rx="4" ry="5" fill="#1e1b4b" />
          <circle cx="36" cy="46" r="1.5" fill="#ffffff" />
          <circle cx="60" cy="46" r="1.5" fill="#ffffff" />

          {/* Rosy Cheeks */}
          <circle cx="30" cy="56" r="6" fill="#f43f5e" opacity="0.4" />
          <circle cx="70" cy="56" r="6" fill="#f43f5e" opacity="0.4" />

          {/* Cute Nose & Mouth */}
          <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill="#be185d" />
          <path d="M46 60 Q50 64 54 60" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />

          {/* Little Bow or Heart */}
          <path d="M50 78 L47 73 L53 73 Z" fill="#e11d48" />
        </svg>

        <span className="absolute -top-1 -left-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        </span>
      </motion.div>
    </div>
  );
};
