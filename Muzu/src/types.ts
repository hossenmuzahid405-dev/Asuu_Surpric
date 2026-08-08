export interface SlotItem {
  slotNumber: number; // 1 to 13
  slotLabel: string;  // "SLOT 01", "SLOT 02", etc.
  photoDataUrl: string | null;
  caption: string;
  date?: string;
  isFavorite?: boolean;
  updatedAt: number;
}

export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  text: string;
}

export type AppStep =
  | 'WELCOME'
  | 'INTRO'
  | 'PERSONAL_MESSAGE'
  | 'GALLERY_AND_MESSAGE'
  | 'ONE_MORE_SURPRISE'
  | 'FINAL_SCREEN';
