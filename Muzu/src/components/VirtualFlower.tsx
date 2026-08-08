import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flower2, Sparkles, Heart } from 'lucide-react';

export const VirtualFlower: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBloom = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fb7185', '#f472b6', '#e879f9', '#fde047'],
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-8 text-center">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-pink-400/30 shadow-2xl relative overflow-hidden glow-pink">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flower2 className="w-6 h-6 text-pink-300 animate-spin" style={{ animationDuration: '10s' }} />
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200">
            Make A Wish 🌷
          </h3>
        </div>

        <p className="text-sm md:text-base text-pink-100/90 mb-6 font-light italic">
          "Make A Wish"
        </p>

        {!isOpen ? (
          <motion.button
            onClick={handleBloom}
            id="make-wish-flower-btn"
            className="py-3 px-8 rounded-full text-sm md:text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl border border-pink-300/40 cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flower2 className="w-5 h-5 text-pink-200" />
            <span>Make A Wish 🌷</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex flex-col items-center p-4 rounded-2xl bg-slate-900/60 border border-pink-400/40 glow-pink"
            >
              {/* Blooming Flower Graphic */}
              <div className="relative my-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-pink-400 opacity-80"
                >
                  <Flower2 className="w-16 h-16" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute"
                >
                  <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
                </motion.div>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-bounce" />
                <span className="text-xs font-mono text-pink-300 uppercase tracking-widest font-bold">
                  Wish Granted ✨
                </span>
                <Sparkles className="w-4 h-4 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>

              <p className="text-base md:text-lg font-bold text-pink-100 leading-relaxed font-sans mt-1">
                ASUU, keep smiling always ❤️
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Reset Flower
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
