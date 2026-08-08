import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, X, Lock, CheckCircle2 } from 'lucide-react';

interface SecretLetterProps {
  openedGiftsCount?: number;
}

export const SecretLetter: React.FC<SecretLetterProps> = ({ openedGiftsCount = 13 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const letterMessage = "ASUU, this little surprise was made specially for you. Every photo, every memory, and every little detail was added with you in mind. I hope this brings a beautiful smile to your face and gives you a moment worth remembering. ❤️";
  const [typedMessage, setTypedMessage] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Unlocked if user has opened at least 1 gift (or always unlocked after progress)
  const isUnlocked = openedGiftsCount >= 1;

  useEffect(() => {
    if (!isOpen) {
      setTypedMessage('');
      setIsTypingDone(false);
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= letterMessage.length) {
        setTypedMessage(letterMessage.slice(0, idx));
        idx++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-8 text-center">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-pink-400/30 shadow-2xl relative overflow-hidden glow-pink">
        {/* Envelope Top Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
          <div className="p-3.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300">
            <Mail className="w-8 h-8 animate-bounce" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-300/30 text-amber-200 text-xs font-mono font-bold uppercase tracking-widest my-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Unlocked ✨</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200">
            A Little Letter For ASUU 💌
          </h3>
        </div>

        <p className="text-sm md:text-base text-pink-100/80 mb-6 font-light italic">
          "A heartfelt secret letter written specially for you..."
        </p>

        <motion.button
          onClick={() => setIsOpen(true)}
          id="open-secret-letter-btn"
          className="py-3.5 px-8 rounded-full text-sm md:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 hover:from-amber-200 hover:to-pink-200 shadow-xl border border-white/50 cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4 text-slate-950" />
          <span>Open Letter ✉️</span>
        </motion.button>
      </div>

      {/* Secret Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)} />

            <motion.div
              className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto glass-card p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-pink-400/40 shadow-2xl text-center z-10 glow-pink"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Soft Particles & Light aura */}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-purple-500/10 pointer-events-none" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-rose-500/30 text-slate-300 hover:text-white transition-colors cursor-pointer z-20"
                title="Close Letter"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
                <Sparkles className="w-6 h-6 text-purple-300 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200 mb-6">
                Dearest ASUU ❤️
              </h4>

              <div className="min-h-[140px] flex items-center justify-center p-5 rounded-2xl bg-slate-900/80 border border-white/10 mb-6 shadow-inner">
                <p className="text-base md:text-lg text-pink-100 font-serif italic leading-relaxed tracking-wide">
                  "{typedMessage}"
                  {!isTypingDone && (
                    <span className="inline-block w-0.5 h-5 ml-1 bg-amber-300 animate-pulse" />
                  )}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-6 rounded-full text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 cursor-pointer"
              >
                Close Letter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
