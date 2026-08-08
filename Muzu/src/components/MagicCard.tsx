import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const MagicCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-8 text-center">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="glass-card p-8 md:p-10 rounded-3xl border border-purple-400/40 shadow-2xl relative overflow-hidden cursor-pointer select-none glow-purple transition-all hover:scale-102"
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-4"
            >
              <div className="p-3.5 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4 animate-bounce">
                <Sparkles className="w-8 h-8 text-purple-200" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 mb-2">
                Magic Card ✨
              </h3>

              <div className="py-2 px-6 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 mt-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Tap To Reveal</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-2"
            >
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mb-3 animate-pulse" />

              <p className="text-base md:text-xl font-bold text-pink-100 font-sans leading-relaxed max-w-md mx-auto">
                "ASUU, some people make ordinary moments feel special. ❤️"
              </p>

              <span className="text-[11px] text-slate-400 mt-4 underline">
                Tap to flip back
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
