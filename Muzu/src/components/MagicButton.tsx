import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Wand2, Heart } from 'lucide-react';

export const MagicButton: React.FC = () => {
  const [isMagicActive, setIsMagicActive] = useState(false);

  const handleTouchMagic = () => {
    setIsMagicActive(true);

    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#38bdf8', '#c084fc', '#fde047'],
      });
    } catch (e) {
      console.warn(e);
    }

    setTimeout(() => {
      setIsMagicActive(false);
    }, 3500);
  };

  return (
    <div className="relative z-20 flex flex-col items-center my-6">
      <motion.button
        onClick={handleTouchMagic}
        id="magic-touch-btn"
        className={`py-3.5 px-8 rounded-full text-sm md:text-base font-extrabold text-white shadow-xl border cursor-pointer flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
          isMagicActive
            ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 border-yellow-300 shadow-yellow-500/50 scale-105'
            : 'bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 border-pink-300/40 hover:from-rose-600 hover:to-purple-600 shadow-pink-500/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wand2 className={`w-5 h-5 ${isMagicActive ? 'text-yellow-200 animate-spin' : 'text-pink-200'}`} />
        <span>Touch Me ✨</span>
      </motion.button>

      {/* Floating Magic Glow Effect Overlay */}
      <AnimatePresence>
        {isMagicActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-sky-500/20 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-3 bg-slate-900/90 p-8 rounded-3xl border border-yellow-300/50 shadow-2xl glow-pink text-center">
              <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" />
              <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-sky-200">
                Magic Sparkle Activated! ✨
              </h4>
              <p className="text-sm text-pink-200 font-serif">
                A special magical aura for ASUU ❤️
              </p>
              <div className="flex gap-2 mt-2">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-bounce" />
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-6 h-6 text-purple-400 fill-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
