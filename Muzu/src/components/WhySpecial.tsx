import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Smile, Gift, Flower2, Award } from 'lucide-react';

interface ReasonItem {
  id: number;
  icon: React.ReactNode;
  text: string;
}

export const WhySpecial: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      id: 1,
      icon: <Smile className="w-5 h-5 text-rose-300" />,
      text: "Your smile is genuinely breathtaking. ❤️",
    },
    {
      id: 2,
      icon: <Sparkles className="w-5 h-5 text-yellow-300" />,
      text: "You are wonderfully special just being yourself. ✨",
    },
    {
      id: 3,
      icon: <Flower2 className="w-5 h-5 text-pink-300" />,
      text: "Every moment spent with you is a cherished memory. 🌸",
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />,
      text: "Your happiness is what matters most of all. 💖",
    },
    {
      id: 5,
      icon: <Gift className="w-5 h-5 text-purple-300" />,
      text: "May you always stay happy and keep smiling. 😊",
    },
    {
      id: 6,
      icon: <Star className="w-5 h-5 text-amber-300 fill-amber-300" />,
      text: "Your presence brings joy and brightness to everyone around. 🌟",
    },
  ];

  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((item) => item !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Award className="w-6 h-6 text-rose-300" />
        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200">
          Why ASUU Is Special ❤️
        </h3>
      </div>
      <p className="text-sm md:text-base text-pink-200/90 mb-8 font-light italic">
        "Things That Make You Special"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reasons.map((reason) => {
          const isRevealed = revealedIds.includes(reason.id);
          return (
            <motion.div
              key={reason.id}
              onClick={() => toggleReveal(reason.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col items-center justify-center min-h-[120px] ${
                isRevealed
                  ? 'glass-card border-pink-400/50 glow-pink bg-gradient-to-br from-pink-500/20 to-purple-600/20 scale-102'
                  : 'bg-slate-900/60 border-slate-700/60 hover:border-pink-500/40 hover:bg-slate-800/80'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isRevealed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="p-2 rounded-full bg-rose-500/20 border border-rose-400/30">
                    {reason.icon}
                  </div>
                  <p className="text-sm md:text-base font-semibold text-pink-100 leading-relaxed">
                    {reason.text}
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
                    <Heart className="w-5 h-5 text-pink-400/60" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">
                    Reason #{reason.id} (Tap to Reveal ✨)
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
