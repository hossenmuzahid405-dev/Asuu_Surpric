import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';

interface GiftBoxItem {
  id: number;
  label: string;
  message: string;
  isSpecial?: boolean;
}

export const ThreeGiftBoxes: React.FC = () => {
  const gifts: GiftBoxItem[] = [
    {
      id: 1,
      label: 'Gift Box 1 🎁',
      message: "You're Amazing ❤️",
    },
    {
      id: 2,
      label: 'Gift Box 2 🎁',
      message: 'Keep Smiling ✨',
    },
    {
      id: 3,
      label: 'Gift Box 3 🎁',
      message: 'One More Surprise 🎁',
      isSpecial: true,
    },
  ];

  const [openedBoxId, setOpenedBoxId] = useState<number | null>(null);

  const handleOpenGift = (gift: GiftBoxItem) => {
    setOpenedBoxId(gift.id);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a855f7', '#fb7185'],
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-10 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Gift className="w-6 h-6 text-pink-300 animate-bounce" />
        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200">
          Choose Your Gift 🎁
        </h3>
      </div>
      <p className="text-sm md:text-base text-pink-200/90 mb-6 font-light italic">
        "Pick One Surprise"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {gifts.map((gift) => {
          const isOpened = openedBoxId === gift.id;

          return (
            <motion.div
              key={gift.id}
              onClick={() => handleOpenGift(gift)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer select-none flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden ${
                isOpened
                  ? 'glass-card border-pink-400/60 glow-pink bg-gradient-to-br from-pink-500/25 to-purple-600/25'
                  : 'bg-slate-900/70 border-slate-700/80 hover:border-pink-500/50 hover:bg-slate-800/80'
              }`}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpened ? (
                  <motion.div
                    key="opened"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="p-2.5 rounded-full bg-rose-500/20 border border-rose-400/40">
                      <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                    </div>
                    <span className="text-xs font-mono text-rose-300 font-bold uppercase tracking-wider">
                      {gift.label}
                    </span>
                    <p className="text-base font-extrabold text-pink-100 mt-1 leading-snug">
                      {gift.message}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="closed"
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: [-3, 3, -3] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="p-3.5 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-pink-400/30"
                    >
                      <Gift className="w-8 h-8 text-pink-300" />
                    </motion.div>
                    <span className="text-xs font-bold text-slate-200">
                      {gift.label}
                    </span>
                    <span className="text-[10px] text-pink-300/80">
                      Tap to open ✨
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
