"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { LogOut, Loader2 } from "lucide-react";
import { COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE FOOTER SECTION
// Sign out button and decorative footer
// ═══════════════════════════════════════════════════════════════════

interface ProfileFooterProps {
  isSigningOut: boolean;
  handleSignOut: () => void;
}

export function ProfileFooter({
  isSigningOut,
  handleSignOut,
}: ProfileFooterProps) {
  return (
    <>
      {/* Sign Out Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${COLORS.ERROR}10 0%, ${COLORS.MAROON}30 100%)`,
            border: `1px solid ${COLORS.ERROR}30`,
            color: "#fca5a5",
            boxShadow: `0 4px 20px ${COLORS.ERROR}10`,
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${COLORS.ERROR}15 0%, transparent 70%)`,
            }}
          />

          <span className="relative flex items-center gap-3">
            {isSigningOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            )}
            <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
          </span>
        </button>
      </div>

      {/* Royal Footer */}
      <div className="mt-16 flex flex-col items-center">
        {/* Ornate divider */}
        <div className="flex items-center justify-center gap-5 w-full max-w-lg">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}50)`,
            }}
          />
          <div className="flex items-center gap-4">
            <span className="text-xl opacity-60">✦</span>
            <div className="w-10 h-10 relative">
              <Image
                src={IMAGES.contact.floatingDiya}
                alt=""
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl opacity-60">✦</span>
          </div>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, ${COLORS.GOLD}50, transparent)`,
            }}
          />
        </div>

        {/* Sanskrit blessing */}
        <p
          className="text-center text-sm mt-4 italic"
          style={{ color: `${COLORS.GOLD}50` }}
        >
          ॐ असतो मा सद्गमय
        </p>

        <p
          className="text-center text-xs mt-2 tracking-[0.2em] uppercase"
          style={{ color: `${COLORS.GOLD}40` }}
        >
          Kashi Yatra 2027 • IIT BHU Varanasi
        </p>
      </div>
    </>
  );
}
