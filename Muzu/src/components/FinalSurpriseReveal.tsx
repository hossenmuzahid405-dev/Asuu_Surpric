import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, RotateCcw, Star, Moon, Crown } from 'lucide-react';

interface FinalSurpriseRevealProps {
  onReplay?: () => void;
}

export const FinalSurpriseReveal: React.FC<FinalSurpriseRevealProps> = ({ onReplay }) => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [nameStep, setNameStep] = useState<number>(0); // 0: A, 1: AS, 2: ASU, 3: ASUU ❤️

  const startSurprise = () => {
    setIsCountingDown(true);
    setCount(3);

    const timer3 = setTimeout(() => setCount(2), 1000);
    const timer2 = setTimeout(() => setCount(1), 2000);
    const timer1 = setTimeout(() => {
      setCount(null);
      setIsCountingDown(false);
      setIsRevealed(true);

      // Start gradual name reveal animation
      setNameStep(0);
      setTimeout(() => setNameStep(1), 600);
      setTimeout(() => setNameStep(2), 1200);
      setTimeout(() => setNameStep(3), 1800);

      try {
        confetti({
          particleCount: 180,
          spread: 140,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f472b6', '#fb7185', '#ffffff', '#c084fc', '#fef08a'],
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    }, 3000);
  };

  const nameVariants = ["A", "AS", "ASU", "ASUU ❤️"];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-12 text-center">
      {/* 14TH GOLDEN GIFT CARD */}
      <div className="glass-card p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-amber-300/60 shadow-[0_0_50px_rgba(251,191,36,0.3)] relative overflow-hidden bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950">
        {/* Background Golden Glow Beam */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/15 via-rose-500/5 to-transparent pointer-events-none" />

        {!isRevealed ? (
          <div className="relative z-10 flex flex-col items-center">
            {/* Golden Crown & Badge */}
            <motion.div
              className="p-3 sm:p-4 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.8)] mb-3 sm:mb-4 border border-amber-100"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
            </motion.div>

            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-200 bg-amber-500/20 border border-amber-300/40 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 backdrop-blur-md">
              One Last Surprise ✨ • The 14th Golden Surprise
            </span>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-tight mb-2 sm:mb-3 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              One Last Surprise ✨
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-amber-200/90 font-serif italic mb-6 sm:mb-8 max-w-md mx-auto">
              "The ultimate moment prepared exclusively for ASUU..."
            </p>

            {isCountingDown && count !== null ? (
              <div className="my-6 sm:my-8 flex flex-col items-center">
                <motion.div
                  key={count}
                  initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1.4, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ scale: 2.0, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl sm:text-7xl font-black text-amber-300 font-mono drop-shadow-[0_0_30px_rgba(251,191,36,0.9)]"
                >
                  {count}
                </motion.div>
                <p className="text-[10px] sm:text-xs font-mono text-amber-200/70 mt-3 sm:mt-4 animate-pulse uppercase tracking-widest">
                  Unwrapping Final Golden Gift...
                </p>
              </div>
            ) : (
              <motion.button
                onClick={startSurprise}
                id="open-final-surprise-btn"
                className="py-3.5 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg font-black text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.5)] border-2 border-amber-100 cursor-pointer flex items-center justify-center gap-2.5 transition-all active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>Open Final Surprise 🎁</span>
              </motion.button>
            )}
          </div>
        ) : (
          /* REVEALED FINAL SCREEN CONTENT */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 py-6 flex flex-col items-center"
            >
              {/* Stars & Floating Sparkles */}
              <div className="flex items-center justify-center gap-3 mb-6 text-amber-300">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
                <Crown className="w-10 h-10 text-amber-200 animate-pulse" />
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              {/* GRADUAL CINEMATIC NAME REVEAL */}
              <div className="h-24 flex items-center justify-center mb-4">
                <motion.h2
                  key={nameStep}
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 drop-shadow-[0_0_35px_rgba(251,191,36,0.6)]"
                >
                  {nameVariants[nameStep]}
                </motion.h2>
              </div>

              {/* Subtitles & Lines */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 }}
                className="flex flex-col gap-1 mb-6 text-center"
              >
                <p className="text-base sm:text-xl font-bold font-mono tracking-wide text-amber-200">
                  13 Memories. Countless Beautiful Moments.
                </p>
                <p className="text-sm sm:text-lg font-serif italic text-pink-200">
                  Made especially for you.
                </p>
              </motion.div>

              {/* FINAL MEMORY CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90 border-2 border-amber-300/40 max-w-xl mx-auto mb-8 shadow-[0_0_50px_rgba(251,191,36,0.3)] relative overflow-hidden backdrop-blur-xl"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-300/30">
                    13 Memories • One Beautiful Story
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 mb-3 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                  ASUU ❤️
                </h3>

                <p className="text-base sm:text-lg font-serif italic text-pink-100/90 leading-relaxed font-light mb-2">
                  "Some people become a beautiful part of our memories."
                </p>
              </motion.div>

              {/* Replay Option */}
              <motion.button
                onClick={() => {
                  setIsRevealed(false);
                  if (onReplay) onReplay();
                }}
                id="replay-surprise-btn"
                className="py-3 px-8 rounded-full text-xs sm:text-sm font-bold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-amber-300/40 shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span>Replay Surprise 🔄</span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
