import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';

export const SecretFinalCard: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#e879f9', '#fb7185', '#ffffff'],
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-10 text-center">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-pink-400/30 shadow-2xl relative overflow-hidden glow-pink">
        {!isUnlocked ? (
          <div>
            <div className="p-3 rounded-full bg-purple-500/20 border border-purple-400/30 w-fit mx-auto mb-3 animate-pulse">
              <Lock className="w-6 h-6 text-purple-300" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300 mb-2">
              Something Is Still Hidden... 🤫
            </h3>

            <p className="text-xs md:text-sm text-pink-100/80 mb-6 font-light">
              One last hidden note for ASUU...
            </p>

            <motion.button
              onClick={handleUnlock}
              id="unlock-final-card-btn"
              className="py-3 px-8 rounded-full text-sm md:text-base font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 hover:from-purple-700 hover:to-rose-600 shadow-xl border border-purple-300/40 cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Unlock className="w-4 h-4 text-pink-200" />
              <span>Unlock Final Card 🔐</span>
            </motion.button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="py-4 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
                <Sparkles className="w-5 h-5 text-purple-300 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 mb-3">
                ASUU ❤️
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-pink-400/40 text-base md:text-xl font-bold text-pink-100 leading-relaxed max-w-lg mx-auto glow-pink">
                "Thank you for being such a special part of my memories."
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
