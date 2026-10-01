"use client";

import { Loader2, AlertTriangle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  BG_WINE: "#2a1020",
  GOLD: "#d4a853",
  GOLD_DARK: "#8b6914",
  CREAM: "#fdf6e3",
  ERROR: "#ef4444",
};

// ═══════════════════════════════════════════════════════════════════
// ERROR STATE COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div
        className="rounded-3xl p-10 sm:p-14 text-center max-w-md mx-auto"
        style={{
          background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
          border: `1px solid ${COLORS.ERROR}25`,
          boxShadow: `0 0 60px ${COLORS.ERROR}10, 0 20px 40px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Animated Icon */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${COLORS.ERROR}20, ${COLORS.ERROR}10)`,
            border: `2px solid ${COLORS.ERROR}40`,
            boxShadow: `0 0 30px ${COLORS.ERROR}20`,
          }}
        >
          <AlertTriangle 
            className="h-10 w-10" 
            style={{ color: COLORS.ERROR }} 
          />
        </div>

        <h2 
          className="text-2xl sm:text-3xl font-bold mb-3" 
          style={{ color: COLORS.CREAM }}
        >
          Failed to load profile
        </h2>
        <p 
          className="mb-8 text-base" 
          style={{ color: `${COLORS.CREAM}60` }}
        >
          We couldn&apos;t fetch your profile data. This might be a temporary issue.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
            color: COLORS.BG_DEEP,
            boxShadow: `0 10px 30px ${COLORS.GOLD}30`,
          }}
        >
          <Loader2 className="h-5 w-5" />
          Try Again
        </button>

        {/* Help text */}
        <p 
          className="mt-6 text-xs" 
          style={{ color: `${COLORS.CREAM}40` }}
        >
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
