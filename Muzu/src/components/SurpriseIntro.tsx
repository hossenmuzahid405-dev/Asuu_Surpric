import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

interface SurpriseIntroProps {
  onContinue: () => void;
}

export const SurpriseIntro: React.FC<SurpriseIntroProps> = ({ onContinue }) => {
  const fullText = "This little surprise is just for you. ❤️";
  const [typedText, setTypedText] = useState('');
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setIsDoneTyping(true);
        clearInterval(interval);
      }
    }, 36);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[#030105] text-slate-100"
      initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.94 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ANIMATION 02: THE FLOATING MEMORY (DARK CINEMATIC SPACE WITH FLOATING GLASS FRAGMENTS) */}

      {/* Background Ambient Glow Pools */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-900/20 via-rose-600/15 to-amber-900/15 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Background Floating Glass Fragments for Parallax Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Fragment 1 Top-Left */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-44 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl"
          animate={{
            y: [-10, 15, -10],
            rotate: [-8, -4, -8],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Fragment 2 Bottom-Right */}
        <motion.div
          className="absolute bottom-[20%] right-[12%] w-40 h-52 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl"
          animate={{
            y: [15, -10, 15],
            rotate: [12, 6, 12],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Fragment 3 Top-Right Small */}
        <motion.div
          className="absolute top-[25%] right-[20%] w-24 h-24 rounded-xl border border-amber-300/10 bg-amber-500/[0.02] backdrop-blur-sm"
          animate={{
            y: [-8, 8, -8],
            rotate: [5, 15, 5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Floating Ambient Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-200/60 blur-[0.5px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 13) % 100}%`,
            }}
            animate={{
              y: [-15, -40, -15],
              x: [-10, 10, -10],
              opacity: [0.15, 0.75, 0.15],
            }}
            transition={{
              duration: 5 + (i % 3) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 4) * 0.5,
            }}
          />
        ))}
      </div>

      {/* Central Glass Card Moving Forward & Straightening Up */}
      <motion.div
        className="max-w-lg w-full backdrop-blur-3xl bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.85)] relative z-10 flex flex-col items-center overflow-hidden"
        initial={{ scale: 0.82, opacity: 0, rotateY: -12, rotateX: 8, y: 30 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000 }}
      >
        {/* Animated Light Sweep Reflection Across Glass Panel */}
        <motion.div
          className="absolute -inset-full top-0 block w-1/2 -skew-x-25 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', repeatDelay: 1 }}
        />

        {/* Header Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/25 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-6 shadow-md backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-pulse" />
          <span>For Someone Special</span>
        </motion.div>

        {/* Revealed Name */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 mb-3 tracking-tight drop-shadow-[0_0_35px_rgba(251,113,133,0.45)]"
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          ASUU ❤️
        </motion.h2>

        {/* Sentiment Quote */}
        <motion.p
          className="text-xs sm:text-sm font-serif italic text-amber-200/90 tracking-wide mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          "Some people make ordinary moments feel special."
        </motion.p>

        {/* Typed Sentiment Note */}
        <div className="min-h-[58px] flex items-center justify-center mb-8 px-2">
          <p className="text-base sm:text-lg md:text-xl text-pink-100/95 font-serif leading-relaxed italic text-center font-light">
            "{typedText}"
            {!isDoneTyping && (
              <span className="inline-block w-0.5 h-5 ml-1 bg-amber-200 animate-pulse" />
            )}
          </p>
        </div>

        {/* Transition Button */}
        <motion.button
          onClick={onContinue}
          id="intro-continue-btn"
          className="py-4 px-9 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_35px_rgba(251,113,133,0.35)] border border-amber-100/60 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isDoneTyping ? 1 : 0.85, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Continue ✨</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
