import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Moon, Star, Crown } from 'lucide-react';

interface FinalScreenProps {
  onReplay: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReplay }) => {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[#03010b] text-slate-100"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Cinematic Night Scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Champagne Radial Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(244,114,182,0.08) 50%, rgba(3,1,11,0) 80%)',
          }}
          animate={{ scale: [0.95, 1.1, 0.95] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />

        {/* Crescent Moon in Corner */}
        <motion.div
          className="absolute top-10 right-10 md:top-14 md:right-20 text-amber-200/80 filter drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          <Moon className="w-16 h-16 md:w-20 md:h-20 fill-amber-200/20" />
        </motion.div>

        {/* Subtle Twinkling Stars */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-200/80"
            style={{
              top: `${(i * 17 + 5) % 90}%`,
              left: `${(i * 23 + 11) % 95}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{
              repeat: Infinity,
              duration: 2.5 + (i % 3),
              delay: (i % 5) * 0.3,
            }}
          >
            <Star className="w-3 h-3 fill-amber-200/80" />
          </motion.div>
        ))}
      </div>

      {/* LUXURY FINAL MEMORY CARD */}
      <motion.div
        className="max-w-lg w-full relative z-10 glass-card p-8 md:p-12 rounded-3xl border-2 border-amber-300/50 shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-slate-950/90 via-amber-950/20 to-slate-950/90 backdrop-blur-2xl"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {/* Soft Golden Halo Background Light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-transparent pointer-events-none" />

        {/* Crown Icon */}
        <motion.div
          className="p-3.5 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.7)] mb-6 border border-amber-100"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <Crown className="w-8 h-8 text-slate-950" />
        </motion.div>

        {/* "13 Memories" */}
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-200 bg-amber-500/20 border border-amber-300/40 px-4 py-1.5 rounded-full mb-3 backdrop-blur-md shadow-sm">
          13 Memories
        </span>

        {/* "One Beautiful Story" */}
        <h2 className="text-xl sm:text-2xl font-serif italic text-amber-100/90 tracking-wide font-light mb-2">
          One Beautiful Story
        </h2>

        {/* "ASUU ❤️" */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 drop-shadow-[0_0_35px_rgba(251,191,36,0.6)] mb-6">
          ASUU ❤️
        </h1>

        {/* "Some people become a beautiful part of our memories." */}
        <p className="text-base sm:text-lg text-pink-100/90 font-serif italic mb-8 tracking-wide font-light max-w-sm">
          "Some people become a beautiful part of our memories."
        </p>

        {/* Subtle Replay Button */}
        <motion.button
          onClick={onReplay}
          id="replay-surprise-btn"
          className="py-3.5 px-8 rounded-full text-sm sm:text-base font-bold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-amber-300/40 shadow-[0_0_20px_rgba(251,191,36,0.25)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95 hover:border-amber-300/70"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>Replay Surprise 🔄</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


