import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Mail } from 'lucide-react';
import { SecretLetter } from './SecretLetter';
import { SecretMessage } from './SecretMessage';
import { WhySpecial } from './WhySpecial';
import { MagicButton } from './MagicButton';
import { VirtualFlower } from './VirtualFlower';
import { ThreeGiftBoxes } from './ThreeGiftBoxes';
import { MagicCard } from './MagicCard';
import { MemoryDiary } from './MemoryDiary';
import { ComplimentButton } from './ComplimentButton';
import { SecretFinalCard } from './SecretFinalCard';
import { NameReveal } from './NameReveal';
import { FinalSurpriseReveal } from './FinalSurpriseReveal';

interface MemoryAndCardsSectionProps {
  onProceedToOneMoreSurprise: () => void;
}

export const MemoryAndCardsSection: React.FC<MemoryAndCardsSectionProps> = ({
  onProceedToOneMoreSurprise,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center gap-10">
      {/* Magic Touch Button */}
      <MagicButton />

      {/* Secret Letter */}
      <SecretLetter />

      {/* Secret Message */}
      <SecretMessage />

      {/* Why ASUU Is Special */}
      <WhySpecial />

      {/* Virtual Flower */}
      <VirtualFlower />

      {/* Three Gift Boxes */}
      <ThreeGiftBoxes />

      {/* Magic Card */}
      <MagicCard />

      {/* Compliment Button */}
      <ComplimentButton />

      {/* Memory Diary */}
      <MemoryDiary />

      {/* Cinematic Name Reveal */}
      <NameReveal />

      {/* Memory Quote Card */}
      <motion.div
        className="w-full glass-card p-8 md:p-10 rounded-3xl border border-rose-400/30 text-center relative overflow-hidden shadow-2xl glow-pink"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" />

        <div className="flex items-center justify-center gap-2 mb-4 text-rose-300">
          <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          <Star className="w-5 h-5 fill-yellow-300 text-yellow-300 animate-bounce" />
          <Heart className="w-6 h-6 fill-rose-400 text-rose-400 animate-pulse" />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200 mb-4">
          ASUU, These Memories Are Special ❤️
        </h3>

        <p className="text-lg md:text-xl text-pink-100/90 font-serif font-handwriting leading-relaxed max-w-2xl mx-auto">
          "Every picture holds a little memory, and every memory becomes a little more special when we look back at it."
        </p>
      </motion.div>

      {/* Secret Final Card */}
      <SecretFinalCard />

      {/* Final Surprise Reveal with 3-2-1 Countdown */}
      <FinalSurpriseReveal />

      {/* Button to advance to Finale */}
      <motion.button
        onClick={onProceedToOneMoreSurprise}
        id="proceed-one-more-surprise-btn"
        className="py-4 px-10 rounded-full text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-xl shadow-pink-500/30 border border-pink-300/40 cursor-pointer flex items-center gap-2 transform transition-all active:scale-95 my-4 glow-pink"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Continue To Finale ✨</span>
      </motion.button>
    </div>
  );
};

