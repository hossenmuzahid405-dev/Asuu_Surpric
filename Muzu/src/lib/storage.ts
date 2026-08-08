import { SlotItem, DiaryEntry } from '../types';

const DB_NAME = 'ASUU_Surprise_App_DB';
const DB_VERSION = 1;
const STORE_NAME = 'photo_slots';
const LOCAL_STORAGE_KEY = 'asuu_surprise_slots_v1';
const DIARY_LOCAL_STORAGE_KEY = 'asuu_surprise_diary_v1';

export const DEFAULT_PHOTOS: string[] = [
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
];

export const DEFAULT_CAPTIONS: string[] = [
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

export function createInitialSlots(): SlotItem[] {
  const slots: SlotItem[] = [];
  for (let i = 1; i <= 13; i++) {
    const formattedNum = i < 10 ? `0${i}` : `${i}`;
    slots.push({
      slotNumber: i,
      slotLabel: `SLOT ${formattedNum}`,
      photoDataUrl: DEFAULT_PHOTOS[i - 1] || null,
      caption: DEFAULT_CAPTIONS[i - 1] || '',
      date: '',
      isFavorite: false,
      updatedAt: Date.now(),
    });
  }
  return slots;
}

export const DEFAULT_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'diary-1',
    title: 'The First Spark ✨',
    date: 'A Special Day',
    text: 'ASUU, from the very first moment I saw your radiant smile, I knew there was nothing more beautiful than seeing you happy.',
  },
  {
    id: 'diary-2',
    title: 'Warm Memories 🌸',
    date: 'Sweet Moment',
    text: 'Every tiny moment shared with you brings a quiet kind of magic. Wherever you go, keep shining and smiling always.',
  },
  {
    id: 'diary-3',
    title: 'Always Special ❤️',
    date: 'Everyday',
    text: 'Time moves on and days pass, but certain special people stay in your heart forever. ASUU, you are truly one of a kind.',
  },
];

export function loadDiaryEntries(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(DIARY_LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_DIARY_ENTRIES;
    const parsed = JSON.parse(raw) as DiaryEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DIARY_ENTRIES;
  } catch {
    return DEFAULT_DIARY_ENTRIES;
  }
}

export function saveDiaryEntries(entries: DiaryEntry[]): void {
  try {
    localStorage.setItem(DIARY_LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.warn('Failed to save diary entries:', e);
  }
}

// Open IndexedDB safely
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'slotNumber' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Load all 13 slots from IndexedDB or LocalStorage
export async function loadSlots(): Promise<SlotItem[]> {
  const initial = createInitialSlots();

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve) => {
      request.onsuccess = () => {
        const results = request.result as SlotItem[];
        if (results && results.length > 0) {
          // Merge with initial template to guarantee exactly 13 slots ordered 1..13
          const merged = initial.map((initSlot) => {
            const found = results.find((r) => r.slotNumber === initSlot.slotNumber);
            if (!found) return initSlot;
            return {
              ...found,
              photoDataUrl: found.photoDataUrl || initSlot.photoDataUrl,
              caption: (found.caption && found.caption.trim() !== '') ? found.caption : initSlot.caption,
              isFavorite: found.isFavorite ?? false,
            };
          });
          resolve(merged);
        } else {
          resolve(initial);
        }
      };
      request.onerror = () => {
        resolve(loadFromLocalStorage(initial));
      };
    });
  } catch {
    return loadFromLocalStorage(initial);
  }
}

// Save all or individual slot to IndexedDB & LocalStorage
export async function saveSlot(slot: SlotItem): Promise<void> {
  saveSlotToLocalStorage(slot);

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(slot);
  } catch (err) {
    console.warn('IndexedDB save fallback to localStorage', err);
  }
}

// LocalStorage fallback helpers
function loadFromLocalStorage(defaultSlots: SlotItem[]): SlotItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return defaultSlots;
    const parsed = JSON.parse(raw) as SlotItem[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return defaultSlots.map((init) => {
        const found = parsed.find((p) => p.slotNumber === init.slotNumber);
        if (!found) return init;
        return {
          ...found,
          photoDataUrl: found.photoDataUrl || init.photoDataUrl,
          caption: (found.caption && found.caption.trim() !== '') ? found.caption : init.caption,
          isFavorite: found.isFavorite ?? false,
        };
      });
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return defaultSlots;
}

function saveSlotToLocalStorage(slot: SlotItem): void {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let slots = raw ? (JSON.parse(raw) as SlotItem[]) : createInitialSlots();
    const index = slots.findIndex((s) => s.slotNumber === slot.slotNumber);
    if (index >= 0) {
      slots[index] = slot;
    } else {
      slots.push(slot);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(slots));
  } catch (e) {
    console.warn('Failed saving to localStorage', e);
  }
}

