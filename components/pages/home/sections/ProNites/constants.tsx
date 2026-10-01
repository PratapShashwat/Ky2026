// ═══════════════════════════════════════════════════════════════════
// PRONITES CONSTANTS
// Re-exports colors from main palette + artist data
// ═══════════════════════════════════════════════════════════════════

import { IMAGES } from "@/lib/images";

// Import from centralized palette
export {
  CONCERT_COLORS,
  GRADIENT_STAGE,
} from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// ARTIST DATA (placeholder - replace with real data)
// ═══════════════════════════════════════════════════════════════════
export interface Artist {
  id: string;
  name: string;
  genre: string;
  image?: string;
  isHeadliner?: boolean;
  isRevealed?: boolean;
  accentColor?: string;
}

export const ARTISTS: Artist[] = [
  {
    id: "1",
    name: "???",
    genre: "Headliner",
    isHeadliner: true,
    isRevealed: false,
    accentColor: "#FFD700",
  },
  {
    id: "2",
    name: "???",
    genre: "Bollywood",
    isHeadliner: true,
    isRevealed: false,
    accentColor: "#FF1493",
  },
  {
    id: "3",
    name: "Jubin Nautiyal",
    genre: "EDM",
    image: IMAGES.singers.jubinNautiyal,
    isRevealed: true,
    accentColor: "#00FFFF",
  },
  {
    id: "4",
    name: "Darshan Raval",
    genre: "Indie",
    image: IMAGES.singers.darshanRawal,
    isRevealed: true,
    accentColor: "#FF6B9D",
  },
  {
    id: "5",
    name: "Mohit Chauhan",
    genre: "Rock",
    image: IMAGES.singers.mohitChauhan,
    isRevealed: true,
    accentColor: "#9D4EDD",
  },
  {
    id: "6",
    name: "Vishal-Shekhar",
    genre: "Hip-Hop",
    image: IMAGES.singers.vishalShekhar,
    isRevealed: true,
    accentColor: "#FF8C42",
  },
  {
    id: "7",
    name: "Raftaar",
    genre: "Rap",
    image: IMAGES.singers.raftaar,
    isRevealed: true,
    accentColor: "#FF1493",
  },
  {
    id: "8",
    name: "Ritviz",
    genre: "EDM",
    image: IMAGES.singers.ritviz,
    isRevealed: true,
    accentColor: "#00FFFF",
  },
  {
    id: "9",
    name: "Anubhav Bassi",
    genre: "Comedy",
    image: IMAGES.singers.anubhavBassi,
    isRevealed: true,
    accentColor: "#FFD700",
  },
  {
    id: "10",
    name: "MJ5",
    genre: "Dance",
    image: IMAGES.singers.mj5,
    isRevealed: true,
    accentColor: "#9D4EDD",
  },
];
