import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DiaryEntry } from '../types';
import { loadDiaryEntries } from '../lib/storage';
import { BookOpen, Heart } from 'lucide-react';

export const MemoryDiary: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const loaded = loadDiaryEntries();
    setEntries(loaded);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BookOpen className="w-6 h-6 text-pink-300" />
        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-200">
          Memory Diary 📖
        </h3>
      </div>
      <p className="text-sm md:text-base text-pink-200/90 mb-6 font-light italic">
        "Beautiful Memories, Beautiful Moments"
      </p>

      {/* Diary Cards Grid (Read-Only & Locked) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {entries.map((entry, idx) => {
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-3xl bg-[#fdf8f0] text-slate-800 shadow-xl border-2 border-amber-200/80 flex flex-col justify-between text-left rotate-[-1deg] hover:rotate-0 transition-transform font-serif min-h-[200px]"
              style={{
                backgroundImage:
                  'linear-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '100% 1.8rem',
              }}
            >
              {/* Paper Clip or Heart Pin */}
              <div className="absolute -top-3 left-6 p-1 rounded-full bg-rose-400 border border-white shadow-md">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>

              <div>
                {/* Title */}
                <h4 className="font-bold text-base md:text-lg text-rose-900 flex items-center justify-between mb-1">
                  <span>{entry.title}</span>
                </h4>

                {/* Date */}
                <span className="text-[11px] font-mono font-bold text-amber-800 block mb-3 opacity-80">
                  🗓️ {entry.date}
                </span>

                {/* Text */}
                <p className="text-sm text-slate-800 leading-relaxed font-handwriting italic">
                  "{entry.text}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
