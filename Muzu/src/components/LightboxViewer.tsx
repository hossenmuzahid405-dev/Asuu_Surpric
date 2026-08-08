import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlotItem } from '../types';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Play, Pause, Film, Lock } from 'lucide-react';
import { LOCKED_DESCRIPTIONS } from './GallerySection';

interface LightboxViewerProps {
  slots: SlotItem[];
  currentIndex: number | null; // 0-based index (0..12) representing slot 1..13
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  isAutoplayDefault?: boolean;
}

export const LightboxViewer: React.FC<LightboxViewerProps> = ({
  slots,
  currentIndex,
  onClose,
  onNavigate,
  isAutoplayDefault = false,
}) => {
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState<boolean>(isAutoplayDefault);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIsPlayingSlideshow(isAutoplayDefault);
  }, [isAutoplayDefault]);

  // Slideshow timer
  useEffect(() => {
    let timer: number | null = null;
    if (isPlayingSlideshow && currentIndex !== null) {
      timer = window.setInterval(() => {
        onNavigate((currentIndex + 1) % slots.length);
      }, 3500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingSlideshow, currentIndex, slots.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (currentIndex === null) return null;

  const currentSlot = slots[currentIndex];
  const lockedDescription = LOCKED_DESCRIPTIONS[currentIndex] || currentSlot.caption;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + slots.length) % slots.length;
    onNavigate(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % slots.length;
    onNavigate(nextIdx);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Threshold 40px
    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Counter format: "01 / 13"
  const formattedCounter = `${(currentIndex + 1).toString().padStart(2, '0')} / 13`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/92 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Focus Mode Background Blur Backdrop */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        {/* Focus Mode Glowing Backdrop Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251,113,133,0.3) 0%, rgba(217,119,6,0.15) 50%, rgba(0,0,0,0) 70%)',
          }}
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lightbox Container */}
        <motion.div
          className="relative max-w-4xl w-full backdrop-blur-3xl bg-slate-950/85 p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col items-center max-h-[94vh] overflow-y-auto z-10"
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header Controls Bar */}
          <div className="w-full flex flex-wrap items-center justify-between border-b border-white/10 pb-2.5 mb-3 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-200 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Photo Option {String(currentSlot.slotNumber).padStart(2, '0')}
              </span>

              {/* Counter 01 / 13 */}
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-900 text-pink-200 border border-pink-400/30 font-mono text-[10px] sm:text-xs font-bold whitespace-nowrap">
                {formattedCounter}
              </span>

              <span className="px-2 sm:px-2.5 py-1 rounded-full bg-slate-800/80 text-rose-300 border border-rose-400/20 text-[10px] sm:text-xs font-medium hidden sm:inline-flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            </div>

            {/* Actions: Slideshow Toggle + Exit */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
                id="auto-slideshow-toggle-btn"
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isPlayingSlideshow
                    ? 'bg-amber-200 text-slate-950 border-amber-100 shadow-[0_0_20px_rgba(251,113,133,0.4)]'
                    : 'bg-slate-900 text-slate-200 border-white/20 hover:border-amber-200/50'
                }`}
                title={isPlayingSlideshow ? 'Pause Slideshow' : 'Play Memory Slideshow'}
              >
                <Film className="w-3.5 h-3.5" />
                {isPlayingSlideshow ? (
                  <>
                    <Pause className="w-3 h-3 text-slate-950 animate-pulse" />
                    <span className="hidden min-[380px]:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-slate-200 fill-slate-200" />
                    <span className="hidden min-[380px]:inline">Play Memories ▶</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-900 hover:bg-rose-500/30 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                title="Close Lightbox"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Main Focused Photo View */}
          <div className="relative w-full flex-1 flex items-center justify-center bg-slate-950/80 rounded-2xl p-2 sm:p-4 min-h-[240px] max-h-[55vh] sm:max-h-[62vh] overflow-hidden border border-white/10 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlot.slotNumber}
                src={currentSlot.photoDataUrl || ''}
                alt={`Photo Option ${currentSlot.slotNumber}`}
                className="max-h-[50vh] sm:max-h-[58vh] max-w-full object-contain rounded-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>

            {/* Navigation Arrow Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-950/80 hover:bg-rose-500 text-slate-200 hover:text-white border border-white/20 transition-all shadow-xl cursor-pointer"
              title="Previous Memory"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-950/80 hover:bg-rose-500 text-slate-200 hover:text-white border border-white/20 transition-all shadow-xl cursor-pointer"
              title="Next Memory"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Caption / Description Display */}
          <div className="w-full mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <p className="text-sm sm:text-base md:text-lg font-serif text-pink-100 italic leading-relaxed tracking-wide">
              "{lockedDescription}"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
