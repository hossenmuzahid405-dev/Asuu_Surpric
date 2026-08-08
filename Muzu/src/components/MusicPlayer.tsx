import React, { useEffect, useRef } from 'react';

/* ========================================================================
   🎵 EASY MUSIC FILE CUSTOMIZATION
   Replace MUSIC_URL below with your custom music file path or URL.
   Example: export const MUSIC_URL = "/music/asuu_song.mp3";
   ======================================================================== */
export const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-11488.mp3";

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const hasStartedRef = useRef<boolean>(false);

  // Fallback Web Audio API synth ambient chime chords if custom audio file fails
  const playSynthMelody = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

      const playChime = () => {
        if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;
        const note = notes[Math.floor(Math.random() * notes.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.1);
      };

      playChime();
      if (!timerRef.current) {
        timerRef.current = window.setInterval(playChime, 1400);
      }
    } catch (e) {
      console.warn('Synth player note error:', e);
    }
  };

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          hasStartedRef.current = true;
        })
        .catch((err) => {
          console.log('Audio autoplay blocked or error, trying synth:', err);
          playSynthMelody();
        });
    } else {
      playSynthMelody();
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    // Try playing immediately
    startMusic();

    // Event listener for user interaction to trigger audio if browser blocked initial autoplay
    const handleInteraction = () => {
      startMusic();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      audio.pause();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.suspend();
    };
  }, []);

  // Invisible background music - NO visible controls or UI elements
  return null;
};
