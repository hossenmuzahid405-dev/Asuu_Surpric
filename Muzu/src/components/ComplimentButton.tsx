import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, Star } from 'lucide-react';

export const ComplimentButton: React.FC = () => {
  const compliments = [
    "Your smile is beautiful. ❤️",
    "You make ordinary moments special. ✨",
    "Always keep that smile. 😊",
    "You are truly special, ASUU. 💖",
    "Your presence brings joy to everyone around you. 🌸",
    "Never forget how awesome you are! 🌟",
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const showNextCompliment = () => {
    if (currentIndex === null) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => ((prev as number) + 1) % compliments.length);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-8 text-center">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-pink-400/30 shadow-2xl relative overflow-hidden glow-pink">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-bounce" />
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200">
            Compliments For ASUU 💕
          </h3>
        </div>

        <p className="text-xs md:text-sm text-pink-100/80 mb-5 font-light">
          Tap below for a sweet reminder...
        </p>

        <motion.button
          onClick={showNextCompliment}
          id="one-more-compliment-btn"
          className="py-3 px-8 rounded-full text-sm md:text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-lg border border-pink-300/40 cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Smile className="w-4 h-4 text-pink-200" />
          <span>One More Compliment 💕</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {currentIndex !== null && (
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 rounded-2xl bg-slate-900/70 border border-pink-400/40 text-base md:text-lg font-extrabold text-pink-100 leading-relaxed glow-pink flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>"{compliments[currentIndex]}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
