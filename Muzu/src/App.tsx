import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppStep, SlotItem } from './types';
import { loadSlots, saveSlot, createInitialSlots } from './lib/storage';
import { FloatingParticles } from './components/FloatingParticles';
import { CuteCharacter } from './components/CuteCharacter';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SurpriseIntro } from './components/SurpriseIntro';
import { PersonalMessage } from './components/PersonalMessage';
import { GallerySection } from './components/GallerySection';
import { MemoryAndCardsSection } from './components/MemoryAndCardsSection';
import { LightboxViewer } from './components/LightboxViewer';
import { OneMoreSurprise } from './components/OneMoreSurprise';
import { FinalScreen } from './components/FinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { Heart, Sun, Moon } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<AppStep>('WELCOME');
  const [slots, setSlots] = useState<SlotItem[]>(createInitialSlots());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSlideshowAutoplay, setIsSlideshowAutoplay] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [openedCount, setOpenedCount] = useState<number>(0);

  // Background atmosphere color mapping based on opened gifts count
  const getAtmosphereBg = () => {
    if (!isDarkMode) return 'bg-rose-50/95 text-slate-800';

    if (openedCount <= 3) {
      return 'bg-[#05020a] text-slate-100'; // Dark & mysterious
    } else if (openedCount <= 8) {
      return 'bg-[#0c0618] text-slate-100'; // Soft glowing particles
    } else if (openedCount <= 12) {
      return 'bg-[#170b22] text-slate-100'; // Warm champagne/golden lighting
    } else {
      return 'bg-[#03010b] text-slate-100'; // Cinematic night scene
    }
  };

  // Load 13 slots from IndexedDB / LocalStorage on mount
  useEffect(() => {
    loadSlots().then((loaded) => {
      setSlots(loaded);
    });
  }, []);

  // Update photo for a specific slot number (1..13)
  const handleUpdatePhoto = (slotNumber: number, dataUrl: string | null) => {
    setSlots((prev) => {
      const updated = prev.map((item) => {
        if (item.slotNumber === slotNumber) {
          const newSlot = { ...item, photoDataUrl: dataUrl, updatedAt: Date.now() };
          saveSlot(newSlot);
          return newSlot;
        }
        return item;
      });
      return updated;
    });
  };

  // Update caption for a specific slot number (1..13)
  const handleUpdateCaption = (slotNumber: number, caption: string) => {
    setSlots((prev) => {
      const updated = prev.map((item) => {
        if (item.slotNumber === slotNumber) {
          const newSlot = { ...item, caption, updatedAt: Date.now() };
          saveSlot(newSlot);
          return newSlot;
        }
        return item;
      });
      return updated;
    });
  };

  // Update date for a specific slot number (1..13)
  const handleUpdateDate = (slotNumber: number, date: string) => {
    setSlots((prev) => {
      const updated = prev.map((item) => {
        if (item.slotNumber === slotNumber) {
          const newSlot = { ...item, date, updatedAt: Date.now() };
          saveSlot(newSlot);
          return newSlot;
        }
        return item;
      });
      return updated;
    });
  };

  // Toggle favorite for a specific slot number (1..13)
  const handleToggleFavorite = (slotNumber: number) => {
    setSlots((prev) => {
      const updated = prev.map((item) => {
        if (item.slotNumber === slotNumber) {
          const newSlot = { ...item, isFavorite: !item.isFavorite, updatedAt: Date.now() };
          saveSlot(newSlot);
          return newSlot;
        }
        return item;
      });
      return updated;
    });
  };

  const handleOpenLightbox = (index: number, startSlideshow: boolean = false) => {
    setIsSlideshowAutoplay(startSlideshow);
    setLightboxIndex(index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-1000 selection:bg-rose-500 selection:text-white pb-16 ${getAtmosphereBg()}`}
    >
      {/* Floating Background Particles & Ambient Lights */}
      <FloatingParticles openedCount={openedCount} />

      {/* Invisible Background Music (No UI Controls) */}
      <MusicPlayer />

      {/* Floating Controls Bar: Day/Night Theme Toggle */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          id="theme-toggle-btn"
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold transition-all shadow-lg border backdrop-blur-md cursor-pointer ${
            isDarkMode
              ? 'bg-slate-900/80 text-yellow-300 border-yellow-500/30 hover:border-yellow-400'
              : 'bg-white/90 text-slate-800 border-rose-300/50 hover:border-rose-400'
          }`}
          title="Toggle Day/Night Mode"
        >
          {isDarkMode ? (
            <>
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-300 text-yellow-300" />
              <span className="hidden min-[400px]:inline">Night Mode 🌙</span>
              <span className="inline min-[400px]:hidden">🌙</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400" />
              <span className="hidden min-[400px]:inline">Soft Day ☀️</span>
              <span className="inline min-[400px]:hidden">☀️</span>
            </>
          )}
        </button>
      </div>

      {/* Cute Floating Mascot Character with Thought Bubbles */}
      {step !== 'WELCOME' && <CuteCharacter />}

      {/* Persistent App Header (Visible when in Gallery or main message flow) */}
      {step === 'GALLERY_AND_MESSAGE' && (
        <motion.header
          className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-6 py-3 flex items-center justify-between transition-colors ${
            isDarkMode
              ? 'bg-slate-950/60 border-rose-500/10'
              : 'bg-white/70 border-rose-200'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
              ASUU ❤️
            </span>
          </div>

          <div className="text-xs font-mono text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/20 font-bold">
            13 Memory Slots
          </div>
        </motion.header>
      )}

      {/* Step Views */}
      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {step === 'WELCOME' && (
            <WelcomeScreen
              key="welcome"
              onOpenSurprise={() => {
                setStep('INTRO');
                scrollToTop();
              }}
            />
          )}

          {step === 'INTRO' && (
            <SurpriseIntro
              key="intro"
              onContinue={() => {
                setStep('PERSONAL_MESSAGE');
                scrollToTop();
              }}
            />
          )}

          {step === 'PERSONAL_MESSAGE' && (
            <PersonalMessage
              key="personal-message"
              onContinue={() => {
                setStep('GALLERY_AND_MESSAGE');
                scrollToTop();
              }}
            />
          )}

          {step === 'GALLERY_AND_MESSAGE' && (
            <motion.div
              key="gallery-and-message"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 13 Permanent Photo Slots */}
              <GallerySection
                slots={slots}
                onOpenLightbox={handleOpenLightbox}
                onOpenedCountChange={setOpenedCount}
              />

              {/* Memory Message & Special Cards */}
              <MemoryAndCardsSection
                onProceedToOneMoreSurprise={() => {
                  setStep('ONE_MORE_SURPRISE');
                  scrollToTop();
                }}
              />
            </motion.div>
          )}

          {step === 'ONE_MORE_SURPRISE' && (
            <OneMoreSurprise
              key="one-more-surprise"
              onRevealFinal={() => {
                setStep('FINAL_SCREEN');
                scrollToTop();
              }}
            />
          )}

          {step === 'FINAL_SCREEN' && (
            <FinalScreen
              key="final-screen"
              onReplay={() => {
                setStep('WELCOME');
                scrollToTop();
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox Modal */}
      <LightboxViewer
        slots={slots}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        isAutoplayDefault={isSlideshowAutoplay}
      />
    </div>
  );
}

