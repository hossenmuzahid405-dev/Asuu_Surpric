import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface PersonalMessageProps {
  onContinue: () => void;
}

export const PersonalMessage: React.FC<PersonalMessageProps> = ({ onContinue }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const fullMessage = "ASUU, some people become special to us without even realizing it. You are one of those people. This little surprise is just a small way of saying that you truly matter to me.";
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const handleEnterSurprise = () => {
    setIsTriggered(true);

    // Light expansion phase -> revealed note phase
    setTimeout(() => {
      setIsRevealed(true);
    }, 1200);
  };

  useEffect(() => {
    if (!isRevealed) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, index));
        index++;
      } else {
        setIsFinished(true);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [isRevealed]);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[#030106] text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ANIMATION 03: THE LIGHT PORTAL */}

      {/* Dynamic Background Light Portal Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Portal Core Light Glow */}
        <motion.div
          className="absolute rounded-full blur-[140px]"
          animate={{
            width: isTriggered ? '1200px' : '500px',
            height: isTriggered ? '1200px' : '500px',
            background: isTriggered
              ? 'radial-gradient(circle, rgba(254,243,199,0.9) 0%, rgba(251,113,133,0.6) 40%, rgba(3,1,6,0) 75%)'
              : 'radial-gradient(circle, rgba(251,113,133,0.22) 0%, rgba(217,119,6,0.12) 45%, rgba(3,1,6,0) 75%)',
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Circular Light Portal Outer Orbital Ring 1 */}
        <motion.div
          className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full border border-amber-300/30 shadow-[0_0_50px_rgba(251,113,133,0.3)] pointer-events-none"
          animate={{
            rotate: 360,
            scale: isTriggered ? 18 : [0.98, 1.03, 0.98],
            opacity: isTriggered ? 0 : 0.8,
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            scale: { duration: isTriggered ? 1.4 : 4, repeat: isTriggered ? 0 : Infinity, ease: 'easeInOut' },
            opacity: { duration: 1.2 },
          }}
        />

        {/* Circular Light Portal Inner Orbital Ring 2 */}
        <motion.div
          className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border border-dashed border-rose-300/40 shadow-[0_0_30px_rgba(251,113,133,0.4)] pointer-events-none"
          animate={{
            rotate: -360,
            scale: isTriggered ? 22 : [1.02, 0.96, 1.02],
            opacity: isTriggered ? 0 : 0.8,
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: isTriggered ? 1.4 : 3.5, repeat: isTriggered ? 0 : Infinity, ease: 'easeInOut' },
            opacity: { duration: 1.2 },
          }}
        />

        {/* Transition Flash Overlay ("White Light Burst") */}
        <AnimatePresence>
          {isTriggered && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-50 z-50 pointer-events-none flex items-center justify-center text-slate-950 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 1.3, times: [0, 0.6, 1], ease: 'easeInOut' }}
            >
              <div className="text-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold tracking-tight text-slate-900 drop-shadow-md">
                  Made specially for ASUU ❤️
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles Accelerating Outward when Triggered */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-100/80 blur-[0.5px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 13 + 3) % 100}%`,
              left: `${(i * 19 + 7) % 100}%`,
            }}
            animate={{
              y: isTriggered ? [-30, -120] : [-10, -35, -10],
              opacity: isTriggered ? [0.2, 1, 0] : [0.1, 0.7, 0.1],
              scale: isTriggered ? [1, 2.5] : 1,
            }}
            transition={{
              duration: isTriggered ? 1.2 : 5 + (i % 3) * 2,
              repeat: isTriggered ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Centerpiece Portal Container */}
      <motion.div
        className="max-w-xl w-full backdrop-blur-3xl bg-white/[0.025] p-8 md:p-12 rounded-3xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.85)] relative z-10 flex flex-col items-center overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* PRE-REVEAL: Sealed Light Portal Object */
            <motion.div
              key="portal-sealed"
              className="flex flex-col items-center justify-center py-4 w-full"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
            >
              {/* Sealed Digital Card inside Portal */}
              <motion.div
                className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-b from-white/10 via-rose-500/10 to-amber-900/20 border border-amber-200/30 shadow-[0_0_40px_rgba(251,113,133,0.25)] mb-8 cursor-pointer overflow-hidden group"
                onClick={!isTriggered ? handleEnterSurprise : undefined}
                animate={{
                  boxShadow: isTriggered
                    ? '0 0 120px rgba(254,243,199,0.9)'
                    : [
                        '0 0 30px rgba(251,113,133,0.2)',
                        '0 0 50px rgba(251,113,133,0.45)',
                        '0 0 30px rgba(251,113,133,0.2)',
                      ],
                  scale: isTriggered ? [1, 1.08, 1.2] : [1, 1.02, 1],
                }}
                transition={{
                  repeat: isTriggered ? 0 : Infinity,
                  duration: isTriggered ? 1.2 : 3.5,
                  ease: 'easeInOut',
                }}
                whileHover={!isTriggered ? { scale: 1.03 } : {}}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3.5 rounded-full bg-amber-500/10 border border-amber-300/30 text-amber-200 shadow-md">
                    <ShieldCheck className="w-8 h-8 text-amber-200" />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-mono tracking-widest uppercase text-amber-300/90 font-semibold mb-1">
                      Sealed Surprise • ASUU
                    </div>
                    <div className="text-base sm:text-lg font-serif italic text-pink-100 font-light">
                      "Your Story Starts Here"
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-full top-0 block w-1/2 -skew-x-20 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer pointer-events-none" />
              </motion.div>

              {!isTriggered && (
                <motion.button
                  onClick={handleEnterSurprise}
                  id="open-surprise-final-btn"
                  className="py-4 px-10 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_35px_rgba(251,113,133,0.35)] border border-amber-100/60 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>ENTER ✨</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* POST-REVEAL: Revealed Message Note */
            <motion.div
              key="portal-revealed"
              className="flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/25 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-6 shadow-md backdrop-blur-md">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-pulse" />
                <span>Made specially for ASUU ❤️</span>
              </div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 mb-6 drop-shadow-[0_0_25px_rgba(251,113,133,0.4)] tracking-tight"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                For ASUU ❤️
              </motion.h2>

              <div className="min-h-[140px] flex items-center justify-center my-2 px-2">
                <p className="text-lg sm:text-xl md:text-2xl text-pink-100/95 font-serif leading-relaxed text-center font-light italic">
                  "{displayedText}"
                  {!isFinished && (
                    <span className="inline-block w-0.5 h-6 ml-1 bg-amber-200 animate-pulse" />
                  )}
                </p>
              </div>

              <motion.button
                onClick={onContinue}
                id="personal-message-continue-btn"
                className="mt-6 py-4 px-9 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_35px_rgba(251,113,133,0.35)] border border-amber-100/60 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explore Memories 📸</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
