import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift } from 'lucide-react';

interface OneMoreSurpriseProps {
  onRevealFinal: () => void;
}

export const OneMoreSurprise: React.FC<OneMoreSurpriseProps> = ({ onRevealFinal }) => {
  const [isRevealing, setIsRevealing] = useState(false);

  const handleReveal = () => {
    setIsRevealing(true);

    try {
      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fb7185', '#e879f9', '#f43f5e', '#a855f7'],
      });
    } catch (e) {
      console.warn('Confetti burst error', e);
    }

    setTimeout(() => {
      onRevealFinal();
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-md w-full glass-card p-8 md:p-12 rounded-3xl border border-pink-400/30 shadow-2xl relative z-10 flex flex-col items-center glow-pink">
        <motion.div
          className="p-5 rounded-full bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-400/40 mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <Gift className="w-12 h-12 text-rose-300" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200 mb-4 tracking-tight">
          One More Surprise ✨
        </h2>

        <p className="text-pink-100/90 text-base md:text-lg mb-8 leading-relaxed font-light italic">
          "Wait... There's One More Thing"
        </p>

        <motion.button
          onClick={handleReveal}
          id="reveal-final-btn"
          disabled={isRevealing}
          className="py-4 px-10 rounded-full text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-xl shadow-pink-500/30 border border-pink-300/40 cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-80"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRevealing ? (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Unlocking Secret... ❤️</span>
            </div>
          ) : (
            <>
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>Reveal It ❤️</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
