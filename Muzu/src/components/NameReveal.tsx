import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export const NameReveal: React.FC = () => {
  const stages = ['A', 'AS', 'ASU', 'ASUU ❤️'];
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          try {
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f472b6', '#e879f9', '#fb7185'],
            });
          } catch (e) {
            console.warn(e);
          }
          clearInterval(timer);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-8 text-center">
      <div className="glass-card p-8 md:p-10 rounded-3xl border border-rose-400/40 shadow-2xl relative overflow-hidden glow-pink">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-mono text-rose-300 uppercase tracking-widest font-bold">
            Specially Crafted
          </span>
          <Sparkles className="w-5 h-5 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <div className="min-h-[100px] flex items-center justify-center my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ scale: 0.5, opacity: 0, y: 10 }}
              animate={{ scale: 1.2, opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-purple-200 glow-pink font-sans"
            >
              {stages[stageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-xs text-pink-200/80 font-light">
          Forever in every story ✨
        </p>
      </div>
    </div>
  );
};
