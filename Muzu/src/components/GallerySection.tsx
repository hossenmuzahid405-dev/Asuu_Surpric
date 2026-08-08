import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlotItem } from '../types';
import { Camera, Eye, Heart, Play, Sparkles, Star, Lock, Gift, Unlock, CheckCircle2 } from 'lucide-react';

export const LOCKED_DESCRIPTIONS: string[] = [
  "Too hot to handle. 🔥🥵",
  "Simply adorable. 🎀",
  "Cute little vibe. 🧸",
  "Just too cute. 🤍",
  "Pure cuteness. 🌸",
  "Cutie energy. 🫶🏻",
  "Sweet and adorable. 💕",
  "A little bundle of cute. 🎀",
  "Too cute for words. 🥹",
  "Simply precious. 🤍✨",
  "Cute in every way. 🌷",
  "Little moments, big cuteness. 💗",
  "Forever a cutie. 🫶🏻❤️"
];

interface GallerySectionProps {
  slots: SlotItem[];
  onOpenLightbox: (index: number, startSlideshow?: boolean) => void;
  onOpenedCountChange?: (count: number) => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

// Chapter grouping metadata
const CHAPTERS = [
  { id: 1, title: "Chapter 01 — The Beginning", range: [0, 3], subtitle: "First moments frozen in time" },
  { id: 2, title: "Chapter 02 — Little Memories", range: [4, 7], subtitle: "Everyday smiles and cuteness" },
  { id: 3, title: "Chapter 03 — The Surprise", range: [8, 11], subtitle: "Special highlights made for ASUU" },
  { id: 4, title: "Final Chapter — ASUU ❤️", range: [12, 12], subtitle: "The ultimate memory" }
];

export const GallerySection: React.FC<GallerySectionProps> = ({
  slots,
  onOpenLightbox,
  onOpenedCountChange,
}) => {
  // Track opened state of each gift by slot number (1..13)
  const [openedGifts, setOpenedGifts] = useState<{ [slotNumber: number]: boolean }>({ 1: false });
  // Track currently active opening modal for cinematic animation
  const [activeOpeningSlot, setActiveOpeningSlot] = useState<number | null>(null);
  const [openingPhase, setOpeningPhase] = useState<'IDLE' | 'CENTERING' | 'LID_OPENING' | 'PHOTO_EMERGE'>('IDLE');

  // Lock notification toast slot
  const [lockedNoticeSlot, setLockedNoticeSlot] = useState<number | null>(null);

  const [heartsBySlot, setHeartsBySlot] = useState<{ [slotNumber: number]: FloatingHeart[] }>({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const openedCount = Object.keys(openedGifts).filter((k) => openedGifts[Number(k)]).length;

  useEffect(() => {
    if (onOpenedCountChange) {
      onOpenedCountChange(openedCount);
    }
  }, [openedCount, onOpenedCountChange]);

  const triggerHeartBurst = (slotNumber: number, x: number, y: number) => {
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setHeartsBySlot((prev) => ({
      ...prev,
      [slotNumber]: [...(prev[slotNumber] || []), newHeart],
    }));

    setTimeout(() => {
      setHeartsBySlot((prev) => ({
        ...prev,
        [slotNumber]: (prev[slotNumber] || []).filter((h) => h.id !== newHeart.id),
      }));
    }, 1000);
  };

  // Check if a gift is unlocked: Gift 01 is always unlocked. Gift N unlocks when Gift N-1 is opened.
  const isGiftUnlocked = (slotNumber: number): boolean => {
    if (slotNumber === 1) return true;
    return !!openedGifts[slotNumber - 1];
  };

  const handleGiftClick = (slotNumber: number) => {
    // If already opened, do nothing
    if (openedGifts[slotNumber]) return;

    // Check lock status
    if (!isGiftUnlocked(slotNumber)) {
      setLockedNoticeSlot(slotNumber);
      setTimeout(() => setLockedNoticeSlot(null), 2500);
      return;
    }

    // Start cinematic gift opening process
    setActiveOpeningSlot(slotNumber);
    setOpeningPhase('CENTERING');

    setTimeout(() => {
      setOpeningPhase('LID_OPENING');
    }, 600);

    setTimeout(() => {
      setOpeningPhase('PHOTO_EMERGE');
    }, 1500);

    setTimeout(() => {
      setOpenedGifts((prev) => ({ ...prev, [slotNumber]: true }));
      setActiveOpeningSlot(null);
      setOpeningPhase('IDLE');
    }, 3200);
  };

  const handleOpenAllGifts = () => {
    const allOpened: { [key: number]: boolean } = {};
    slots.forEach((s) => {
      allOpened[s.slotNumber] = true;
    });
    setOpenedGifts(allOpened);
  };

  const handlePhotoClick = (slotNumber: number, index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerHeartBurst(slotNumber, x, y);

    // Open fullscreen lightbox
    onOpenLightbox(index);
  };

  const activeSlotData = activeOpeningSlot ? slots[activeOpeningSlot - 1] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      {/* Hidden Easter Egg Constellation Trigger */}
      <button
        onClick={() => setShowEasterEgg(true)}
        className="absolute top-2 right-4 text-amber-300/30 hover:text-amber-300 transition-colors cursor-pointer p-2 rounded-full z-10"
        title="✨ Hidden Secret"
      >
        <Star className="w-4 h-4 animate-pulse" />
      </button>

      {/* Hidden Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              className="glass-card p-8 rounded-3xl border border-amber-300/40 shadow-2xl text-center max-w-sm w-full relative overflow-hidden"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 rounded-full bg-amber-500/10 border border-amber-300/30 w-fit mx-auto mb-4 text-amber-200">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '5s' }} />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-200 mb-2">
                Easter Egg Found!
              </h3>
              <p className="text-lg text-pink-100 italic font-serif my-4">
                "You found a little secret. ✨"
              </p>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="mt-2 py-2 px-6 rounded-full text-xs font-bold text-slate-950 bg-amber-200 hover:bg-amber-100 cursor-pointer"
              >
                Close Secret
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CINEMATIC GIFT OPENING OVERLAY */}
      <AnimatePresence>
        {activeOpeningSlot !== null && activeSlotData && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl ${
              activeOpeningSlot === 7 ? 'bg-black/95' : 'bg-slate-950/90'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative w-full max-w-lg glass-card p-8 rounded-3xl border text-center flex flex-col items-center justify-center overflow-hidden ${
                activeOpeningSlot === 7
                  ? 'border-amber-300 shadow-[0_0_80px_rgba(251,191,36,0.6)] bg-gradient-to-b from-slate-950 via-amber-950/30 to-slate-950'
                  : 'border-amber-300/50 shadow-[0_0_60px_rgba(251,191,36,0.3)]'
              }`}
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background golden light beam for Special Gift #7 */}
              {activeOpeningSlot === 7 && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/25 via-rose-500/10 to-transparent pointer-events-none animate-pulse" />
              )}
              {activeOpeningSlot !== 7 && (
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-rose-500/10 to-transparent pointer-events-none" />
              )}

              <span className={`text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 ${
                activeOpeningSlot === 7
                  ? 'text-slate-950 font-black bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.8)]'
                  : 'text-amber-300 bg-amber-500/20 border border-amber-300/40'
              }`}>
                {activeOpeningSlot === 7 ? '⭐ Special Gift 07 Reveal ✨' : `Unwrapping Gift ${String(activeOpeningSlot).padStart(2, '0')} ✨`}
              </span>

              {/* Gift Box / Opening Lid Animation */}
              <div className="relative w-48 h-48 my-4 flex items-center justify-center">
                {openingPhase === 'CENTERING' || openingPhase === 'LID_OPENING' ? (
                  <motion.div
                    className={`relative w-36 h-36 rounded-2xl flex items-center justify-center border-2 shadow-2xl ${
                      activeOpeningSlot === 7
                        ? 'bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-300 border-amber-100 shadow-[0_0_60px_rgba(251,191,36,0.9)]'
                        : 'bg-gradient-to-tr from-amber-500 via-rose-400 to-amber-200 border-amber-100 shadow-[0_0_40px_rgba(251,191,36,0.6)]'
                    }`}
                    animate={
                      openingPhase === 'LID_OPENING'
                        ? { y: [0, -40, -100], rotateX: [0, 45, 90], opacity: [1, 1, 0] }
                        : { scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }
                    }
                    transition={{ duration: openingPhase === 'LID_OPENING' ? 1.0 : 0.6 }}
                  >
                    <Gift className="w-16 h-16 text-slate-950" />
                    {/* Golden Light Beam Inside Box */}
                    <div className="absolute inset-0 bg-amber-200/40 rounded-2xl animate-ping pointer-events-none" />
                  </motion.div>
                ) : null}

                {/* Emergence of Photo */}
                {openingPhase === 'PHOTO_EMERGE' && (
                  <motion.div
                    className={`w-full h-full rounded-2xl overflow-hidden border-2 shadow-2xl relative ${
                      activeOpeningSlot === 7 ? 'border-amber-200 shadow-[0_0_50px_rgba(251,191,36,0.8)]' : 'border-amber-300 shadow-2xl'
                    }`}
                    initial={{ scale: 0.2, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  >
                    <img
                      src={activeSlotData.photoDataUrl || ''}
                      alt={`Gift ${activeOpeningSlot}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Golden Particles overlay on emergence for Gift #7 */}
                    {activeOpeningSlot === 7 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-amber-300/20 pointer-events-none" />
                    )}
                  </motion.div>
                )}
              </div>

              {/* Description reveal during emergence */}
              {openingPhase === 'PHOTO_EMERGE' && (
                <motion.p
                  className={`text-base sm:text-lg font-serif italic mt-4 max-w-sm ${
                    activeOpeningSlot === 7 ? 'text-amber-200 font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'text-amber-100'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{LOCKED_DESCRIPTIONS[activeOpeningSlot - 1] || activeSlotData.caption}"
                </motion.p>
              )}

              <p className="text-xs font-mono text-pink-200/70 mt-6 animate-pulse">
                Revealing special memory for ASUU...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs font-mono font-semibold uppercase tracking-widest mb-3 backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>13 Luxury Memory Gifts • ASUU</span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 tracking-tight mb-3 drop-shadow-[0_0_25px_rgba(251,113,133,0.3)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Unwrap ASUU's 13 Gift Boxes 🎁
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-pink-200/90 font-serif italic text-center max-w-lg mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          "Open each gift sequentially to discover every special memory created for ASUU..."
        </motion.p>

        {/* ELEGANT MEMORY COUNTER */}
        <div className="max-w-xs mx-auto mb-8 bg-slate-950/80 p-4 rounded-2xl border border-amber-300/30 shadow-2xl backdrop-blur-md text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-pink-200/80 mb-1">
            Memories Unlocked
          </p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 font-mono mb-2">
            {openedCount} / 13
          </p>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-300 via-rose-400 to-pink-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.7)]"
              initial={{ width: 0 }}
              animate={{ width: `${(openedCount / 13) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {openedCount < 13 && (
            <motion.button
              onClick={handleOpenAllGifts}
              id="open-all-gifts-btn"
              className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] border border-amber-100/60 cursor-pointer inline-flex items-center gap-2 transition-all active:scale-95"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Unwrap All 13 Gifts ✨</span>
            </motion.button>
          )}

          <motion.button
            onClick={() => onOpenLightbox(0, true)}
            id="play-memories-main-btn"
            className="py-2.5 px-5 rounded-full text-xs sm:text-sm font-bold text-slate-100 bg-slate-900/90 hover:bg-slate-800 shadow-lg border border-white/20 cursor-pointer inline-flex items-center gap-2 transition-all active:scale-95"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Play className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>Play Memories ▶</span>
          </motion.button>
        </div>
      </div>

      {/* Chapter View Hierarchy */}
      <div className="flex flex-col gap-12">
        {CHAPTERS.map((chap, chapIndex) => {
          const chapterSlots = slots.slice(chap.range[0], chap.range[1] + 1);

          const MEMORY_MOMENTS = [
            "Some memories stay forever. ✨",
            "Every picture holds a little story. 💖",
            "Some moments are simply unforgettable. ❤️",
            "Keep this memory close. 🌸"
          ];

          return (
            <React.Fragment key={chap.id}>
              <div className="flex flex-col gap-6">
                {/* Chapter Title Bar */}
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-1"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-pink-200 tracking-wide">
                      {chap.title}
                    </h3>
                    <p className="text-xs text-pink-200/60 font-mono mt-0.5">
                      {chap.subtitle}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-amber-300/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20 w-fit">
                    {chapterSlots.length} {chapterSlots.length === 1 ? 'Gift' : 'Gifts'}
                  </div>
                </motion.div>

              {/* Photos Grid for this chapter */}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                {chapterSlots.map((slot) => {
                  const index = slot.slotNumber - 1;
                  const isOpened = !!openedGifts[slot.slotNumber];
                  const unlocked = isGiftUnlocked(slot.slotNumber);
                  const isLockedNotice = lockedNoticeSlot === slot.slotNumber;
                  const slotHearts = heartsBySlot[slot.slotNumber] || [];
                  const lockedDescription = LOCKED_DESCRIPTIONS[index] || slot.caption;

                  return (
                    <motion.div
                      key={slot.slotNumber}
                      id={`gift-slot-${slot.slotNumber}`}
                      className="relative w-full"
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                    >
                      <AnimatePresence mode="wait">
                        {!isOpened ? (
                          /* UNOPENED GIFT BOX CARD WITH LUXURY HOVER AND LOCK SYSTEM */
                          <motion.div
                            key={`unopened-${slot.slotNumber}`}
                            onClick={() => handleGiftClick(slot.slotNumber)}
                            className={`w-full aspect-square rounded-2xl p-3.5 sm:p-5 border shadow-2xl relative overflow-hidden flex flex-col items-center justify-between cursor-pointer select-none transition-all ${
                              slot.slotNumber === 7
                                ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.5)] ring-2 ring-amber-300/40 hover:scale-105'
                                : unlocked
                                ? 'bg-gradient-to-b from-slate-900 via-rose-950/40 to-slate-950 border-amber-300/50 hover:border-amber-200 hover:shadow-[0_0_35px_rgba(251,191,36,0.35)]'
                                : 'bg-slate-950/90 border-slate-800 opacity-80 cursor-not-allowed'
                            }`}
                            initial={{ scale: 0.96 }}
                            animate={{
                              x: isLockedNotice ? [0, -10, 10, -10, 10, 0] : 0,
                              y: unlocked ? (slot.slotNumber === 7 ? [0, -8, 0] : [0, -4, 0]) : 0,
                            }}
                            transition={{
                              y: { duration: slot.slotNumber === 7 ? 3 : 4, repeat: Infinity, ease: 'easeInOut' },
                              x: { duration: 0.4 },
                            }}
                            whileHover={unlocked ? { y: -8, scale: 1.04 } : { scale: 0.98 }}
                          >
                            {/* Golden Particles overlay for Gift #7 */}
                            {slot.slotNumber === 7 && (
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/15 via-transparent to-transparent pointer-events-none animate-pulse" />
                            )}

                            {/* Gold Cross Ribbons for Unlocked Gift */}
                            {unlocked && (
                              <>
                                <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 sm:h-8 pointer-events-none ${
                                  slot.slotNumber === 7
                                    ? 'bg-gradient-to-r from-amber-400/30 via-amber-300/70 to-amber-400/30 border-y border-amber-200/60'
                                    : 'bg-gradient-to-r from-amber-500/20 via-amber-300/50 to-amber-500/20 border-y border-amber-200/40'
                                }`} />
                                <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 pointer-events-none ${
                                  slot.slotNumber === 7
                                    ? 'bg-gradient-to-b from-amber-400/30 via-amber-300/70 to-amber-400/30 border-x border-amber-200/60'
                                    : 'bg-gradient-to-b from-amber-500/20 via-amber-300/50 to-amber-500/20 border-x border-amber-200/40'
                                }`} />
                              </>
                            )}

                            {/* Top Badge: Gift Number & Status */}
                            <div className="w-full flex items-center justify-between z-10 gap-1">
                              <span
                                className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-md shadow-md whitespace-nowrap ${
                                  slot.slotNumber === 7
                                    ? 'text-slate-950 bg-gradient-to-r from-amber-300 to-amber-200 font-extrabold border border-amber-100'
                                    : unlocked
                                    ? 'text-amber-200 bg-amber-500/20 border border-amber-300/40'
                                    : 'text-slate-400 bg-slate-900 border border-slate-700'
                                }`}
                              >
                                {slot.slotNumber === 7 ? '⭐ Gift 07 ✨' : `Gift ${String(slot.slotNumber).padStart(2, '0')}`}
                              </span>

                              <span
                                className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap ${
                                  unlocked
                                    ? 'text-amber-300 bg-amber-500/10 border border-amber-400/30'
                                    : 'text-rose-300/80 bg-rose-950/60 border border-rose-500/30'
                                }`}
                              >
                                {unlocked ? (
                                  <>
                                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                                    Ready
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-300" />
                                    Locked
                                  </>
                                )}
                              </span>
                            </div>

                            {/* Center Gift Icon / Lock Notice */}
                            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                              <motion.div
                                className={`relative p-3.5 sm:p-5 rounded-full shadow-lg border mb-1.5 sm:mb-2 transition-transform ${
                                  unlocked
                                    ? 'bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 text-slate-950 border-amber-100 shadow-[0_0_25px_rgba(251,191,36,0.5)]'
                                    : 'bg-slate-900 text-slate-500 border-slate-700'
                                }`}
                                animate={unlocked ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                {unlocked ? (
                                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-slate-950 stroke-[2.2]" />
                                ) : (
                                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                                )}
                              </motion.div>

                              <p
                                className={`text-[11px] sm:text-xs md:text-sm font-serif italic text-center max-w-[150px] leading-tight ${
                                  unlocked ? 'text-pink-100/90 font-light' : 'text-slate-400'
                                }`}
                              >
                                {unlocked
                                  ? 'Tap to Unwrap Gift ✨'
                                  : `Open Gift ${String(slot.slotNumber - 1).padStart(2, '0')} first`}
                              </p>
                            </div>

                            {/* Locked Notice Shake Alert */}
                            {isLockedNotice && (
                              <div className="absolute inset-x-2 bottom-12 z-20 bg-rose-950/90 border border-rose-400/80 text-rose-200 text-[10px] sm:text-[11px] font-bold py-1.5 px-2 rounded-lg text-center backdrop-blur-md shadow-xl animate-bounce">
                                🔒 Open Gift {String(slot.slotNumber - 1).padStart(2, '0')} first!
                              </div>
                            )}

                            {/* Bottom Label */}
                            <div className="w-full z-10 text-center">
                              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-amber-300/80 uppercase">
                                For ASUU ❤️
                              </span>
                            </div>

                            {/* Shimmer Light Reflection for Unlocked */}
                            {unlocked && (
                              <div className="absolute -inset-full top-0 block w-1/2 -skew-x-25 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
                            )}
                          </motion.div>
                        ) : (
                          /* OPENED STATE: REVEALED PHOTO CARD */
                          <motion.div
                            key={`opened-${slot.slotNumber}`}
                            className="glass-card glass-card-hover rounded-2xl p-4 md:p-5 flex flex-col items-center border border-amber-300/30 relative group transition-all shadow-[0_10px_30px_rgba(251,191,36,0.15)]"
                            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {/* Photo Header Badge */}
                            <div className="w-full flex items-center justify-between mb-2.5 px-1">
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-200/90 bg-amber-500/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                                Memory {String(slot.slotNumber).padStart(2, '0')}
                              </span>
                              <span className="text-[11px] font-medium text-amber-300 bg-amber-500/10 border border-amber-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-amber-300" />
                                Memory Opened ✓
                              </span>
                            </div>

                            {/* Photo Image Area */}
                            <div
                              onClick={(e) => handlePhotoClick(slot.slotNumber, index, e)}
                              className="relative w-full aspect-square bg-slate-900/60 rounded-xl overflow-hidden border border-white/10 group-hover:border-rose-400/40 transition-colors flex items-center justify-center cursor-pointer select-none"
                            >
                              <img
                                src={slot.photoDataUrl || ''}
                                alt={`ASUU Memory ${slot.slotNumber}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <button className="px-3.5 py-1.5 rounded-full bg-slate-950/90 text-amber-200 border border-amber-300/40 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                                  View Fullscreen
                                </button>
                              </div>

                              {/* Heart Tap Effect Burst */}
                              <AnimatePresence>
                                {slotHearts.map((h) => (
                                  <motion.div
                                    key={h.id}
                                    initial={{ opacity: 1, scale: 0.5, y: 0 }}
                                    animate={{ opacity: 0, scale: 1.8, y: -40 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    style={{ left: h.x - 12, top: h.y - 12 }}
                                    className="absolute pointer-events-none z-20 text-rose-400"
                                  >
                                    <Heart className="w-6 h-6 fill-rose-400 stroke-rose-200" />
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>

                            {/* Fixed English Description */}
                            <motion.div
                              className="w-full mt-3.5 p-3 rounded-xl border text-center shadow-inner flex items-center justify-center min-h-[52px] bg-slate-950/60 border-white/10"
                            >
                              <p className="text-sm sm:text-base font-serif text-pink-100/95 italic leading-snug tracking-wide">
                                "{lockedDescription}"
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
              </div>

              {/* Special Memory Moment Interstitial Quote Banner */}
              {chapIndex < CHAPTERS.length - 1 && (
                <motion.div
                  className="my-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-300/20 text-center backdrop-blur-md shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <p className="text-xs sm:text-sm font-serif italic text-amber-200/90 tracking-wide">
                    "{MEMORY_MOMENTS[chapIndex % MEMORY_MOMENTS.length]}"
                  </p>
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
