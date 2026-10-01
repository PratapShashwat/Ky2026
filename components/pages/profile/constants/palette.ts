// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE - SHARED TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  BG_WINE: "#2a1020",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#f0d890",
  GOLD_DARK: "#8b6914",
  GOLD_SHIMMER: "#ffd700",
  CREAM: "#fdf6e3",
  SUCCESS: "#22c55e",
  ERROR: "#ef4444",
  WARNING: "#f59e0b",
  MAROON: "#5c1a1a",
  PURPLE_DEEP: "#2d1b4e",
} as const;

export interface UserData {
  id?: string;
  firstName?: string | null;
  email?: string | null;
  phone?: string | null;
  college?: string | null;
  gender?: string | null;
  aadhaarLast4?: string | null;
  avatarUrl?: string | null;
  createdAt?: string | null;
}

export interface ProgressData {
  isProfileComplete: boolean;
  completionPercentage: number;
  steps: {
    aadhaar: boolean;
    college: boolean;
    phone: boolean;
  };
}

export interface ProfileUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
