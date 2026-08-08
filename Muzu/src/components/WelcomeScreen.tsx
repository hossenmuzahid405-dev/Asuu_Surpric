import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, Mail, Crown, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onOpenSurprise: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenSurprise }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleStart = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[#020105] text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.05 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Film Glow & Subtle Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(244,114,182,0.08) 45%, rgba(2,1,5,0) 80%)',
          }}
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Ambient Gold Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/60 blur-[0.3px]"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
            }}
            animate={{
              y: [-15, -45, -15],
              x: [-10, 10, -10],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 5 + (i % 4) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 5) * 0.3,
            }}
          />
        ))}
      </div>

      {/* LUXURY PERSONAL INVITATION CARD */}
      <motion.div
        className="max-w-md sm:max-w-lg w-full relative z-10 glass-card p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-amber-300/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90 backdrop-blur-2xl my-auto"
        initial={{ y: 30, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000 }}
      >
        {/* Card Gold Accent Borders & Corner Sparkles */}
        <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-amber-300/60 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-amber-300/60 rounded-br-2xl sm:rounded-br-3xl pointer-events-none" />

        {/* Crown / Envelope Icon */}
        <motion.div
          className="p-3 sm:p-4 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.5)] mb-4 sm:mb-6 border border-amber-100"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-slate-950 stroke-[2.2]" />
        </motion.div>

        {/* "You're Invited" Header */}
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-200/90 bg-amber-500/15 border border-amber-300/30 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
          ✨ You're Invited ✨
        </span>

        {/* Subtitle */}
        <p className="text-xs sm:text-base font-serif italic text-amber-200/90 tracking-wide font-light mb-1.5 max-w-xs sm:max-w-sm">
          Someone Special Has Prepared A Little Surprise For You
        </p>

        {/* "ASUU ❤️" */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] mb-6 sm:mb-8">
          ASUU ❤️
        </h1>

        {/* Action Button: "Enter The Surprise ✨" */}
        <motion.button
          onClick={handleStart}
          id="enter-surprise-btn"
          disabled={isOpening}
          className="w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-lg font-black text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.4)] border border-amber-100/80 cursor-pointer flex items-center justify-center gap-2.5 transition-all active:scale-95 disabled:opacity-80"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 fill-slate-950" />
          <span>Enter The Surprise ✨</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

