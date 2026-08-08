import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, Heart, Key, AlertCircle } from 'lucide-react';

/* ========================================================================
   🔐 SECRET CODE CUSTOMIZATION
   Top-level secret code variable.
   ======================================================================== */
export const SECRET_CODE = "ASUU";

export const SecretMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (inputCode.trim().toUpperCase() === SECRET_CODE.toUpperCase()) {
      setIsUnlocked(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#c084fc', '#fb7185'],
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    } else {
      setErrorMessage("Almost! Try again 😊");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-8 text-center">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-purple-400/30 shadow-2xl relative overflow-hidden glow-purple">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Lock className="w-6 h-6 text-purple-300 animate-pulse" />
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300">
            Secret Message 🔐
          </h3>
        </div>

        <p className="text-sm md:text-base text-pink-100/80 mb-6 font-light">
          "There's Something Hidden..."
        </p>

        <motion.button
          onClick={() => setIsOpen(true)}
          id="unlock-secret-btn"
          className="py-3 px-8 rounded-full text-sm md:text-base font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 hover:from-purple-700 hover:to-rose-600 shadow-lg border border-purple-300/30 cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Key className="w-4 h-4" />
          <span>Unlock Secret 🔐</span>
        </motion.button>
      </div>

      {/* Secret Password Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)} />

            <motion.div
              className="relative max-w-md w-full glass-card p-6 md:p-8 rounded-3xl border border-purple-400/40 shadow-2xl text-center z-10 glow-purple"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!isUnlocked ? (
                <div>
                  <div className="p-3 rounded-full bg-purple-500/20 border border-purple-400/30 w-fit mx-auto mb-4">
                    <Lock className="w-8 h-8 text-purple-300 animate-bounce" />
                  </div>

                  <h4 className="text-2xl font-bold text-pink-100 mb-2">
                    Enter Secret Passcode
                  </h4>
                  <p className="text-xs text-slate-400 mb-6">
                    Hint: Use your special name (ASUU)
                  </p>

                  <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter passcode..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-purple-400/40 text-center text-lg font-bold tracking-widest text-pink-200 placeholder:text-slate-600 focus:outline-none focus:border-pink-400"
                      autoFocus
                    />

                    {errorMessage && (
                      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-300 animate-bounce">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-2.5 rounded-full text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600 shadow-md cursor-pointer"
                      >
                        Unlock 🔓
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-4"
                >
                  <div className="p-3 rounded-full bg-rose-500/20 border border-rose-400/40 w-fit mx-auto mb-4">
                    <Unlock className="w-8 h-8 text-rose-300" />
                  </div>

                  <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 mb-4">
                    You found a little secret. ❤️
                  </h4>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-pink-400/30 text-base sm:text-lg font-serif italic text-pink-100 leading-relaxed mb-6 shadow-inner">
                    "ASUU, every memory in this page was created with endless love just for you."
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 px-8 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
