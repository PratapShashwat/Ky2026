"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import {
  Phone,
  GraduationCap,
  ArrowRight,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import {
  COLORS,
  UserData,
  ProgressData,
  ProfileUser,
} from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE HERO SECTION
// Main profile card with avatar, name, and quick actions
// ═══════════════════════════════════════════════════════════════════

interface ProfileHeroProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
}

export function ProfileHero({ userData, user, progress }: ProfileHeroProps) {
  const initials =
    (userData?.firstName || user.name)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div
      className="relative rounded-3xl overflow-hidden mb-8"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG_WINE}80 0%, ${COLORS.BG_ROYAL}90 50%, ${COLORS.BG_WINE}80 100%)`,
        border: `2px solid ${COLORS.GOLD}30`,
        boxShadow: `
          0 0 80px ${COLORS.GOLD}10, 
          0 0 120px ${COLORS.GOLD}05,
          0 25px 50px rgba(0,0,0,0.4),
          inset 0 1px 0 ${COLORS.GOLD}20
        `,
      }}
    >
      {/* Ornate Top Border */}
      <div className="relative h-2 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: progress?.isProfileComplete
              ? `linear-gradient(90deg, transparent, ${COLORS.SUCCESS}60, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}60, transparent)`
              : `linear-gradient(90deg, transparent, ${COLORS.GOLD_DARK}, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, transparent)`,
          }}
        />
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.GOLD_SHIMMER}80 50%, transparent 100%)`,
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Mandala Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50' stroke='%23d4a853' stroke-width='0.3'/%3E%3Cpath d='M50 10 L90 50 L50 90 L10 50 Z' stroke='%23d4a853' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Diya Decoration */}
      <div className="absolute top-6 right-16 w-10 h-10 opacity-40 animate-pulse">
        <Image
          src={IMAGES.contact.floatingDiya}
          alt=""
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="relative px-8 sm:px-12 py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Avatar Section */}
          <AvatarSection
            userData={userData}
            user={user}
            progress={progress}
            initials={initials}
          />

          {/* User Info Section */}
          <UserInfoSection
            userData={userData}
            user={user}
            progress={progress}
          />
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40, ${COLORS.GOLD}60, ${COLORS.GOLD}40, transparent)`,
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// AVATAR SECTION
// ═══════════════════════════════════════════════════════════════════
function AvatarSection({
  userData,
  user,
  progress,
  initials,
}: ProfileHeroProps & { initials: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Royal Frame for Avatar */}
      <div className="relative">
        {/* Progress Ring around avatar (when incomplete) */}
        {progress && !progress.isProfileComplete && (
          <div className="absolute -inset-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={`${COLORS.GOLD}15`}
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={COLORS.GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 47}
                strokeDashoffset={
                  2 * Math.PI * 47 -
                  (progress.completionPercentage / 100) * 2 * Math.PI * 47
                }
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${COLORS.GOLD}60)`,
                }}
              />
            </svg>
          </div>
        )}

        {/* Decorative rotating ring (when complete) */}
        {progress?.isProfileComplete && (
          <div
            className="absolute -inset-3 rounded-full opacity-30"
            style={{
              background: `conic-gradient(from 0deg, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}80, ${COLORS.SUCCESS})`,
              animation: "spin 20s linear infinite",
            }}
          />
        )}

        {/* Glowing aura */}
        <div
          className="absolute -inset-2 rounded-full blur-lg"
          style={{
            background: progress?.isProfileComplete
              ? `radial-gradient(circle, ${COLORS.SUCCESS}30 0%, transparent 70%)`
              : `radial-gradient(circle, ${COLORS.GOLD}25 0%, transparent 70%)`,
          }}
        />

        {/* Main avatar container */}
        <div
          className="relative rounded-full p-[3px]"
          style={{
            background: progress?.isProfileComplete
              ? `linear-gradient(135deg, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}80, ${COLORS.SUCCESS})`
              : `linear-gradient(135deg, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT})`,
            boxShadow: `
              0 0 30px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.GOLD}30,
              0 0 60px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.GOLD}15
            `,
          }}
        >
          <div
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden flex items-center justify-center ring-4 ring-[#0a0612]"
            style={{
              background:
                userData?.avatarUrl || user.image
                  ? COLORS.BG_DEEP
                  : `linear-gradient(135deg, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_WINE} 100%)`,
            }}
          >
            {userData?.avatarUrl || user.image ? (
              <Image
                src={userData?.avatarUrl || user.image || ""}
                alt={userData?.firstName || user.name || "User"}
                width={128}
                height={128}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span
                className="text-4xl font-bold"
                style={{
                  color: COLORS.GOLD,
                  textShadow: `0 0 15px ${COLORS.GOLD}40`,
                }}
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Verified badge with glow */}
        {progress?.isProfileComplete && (
          <div
            className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`,
              boxShadow: `0 0 20px ${COLORS.SUCCESS}50`,
            }}
          >
            <BadgeCheck className="h-5 w-5 text-white" />
          </div>
        )}

        {/* Percentage badge (when incomplete) */}
        {progress && !progress.isProfileComplete && (
          <div
            className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_DEEP}, ${COLORS.BG_ROYAL})`,
              border: `2px solid ${COLORS.GOLD}`,
              boxShadow: `0 0 15px ${COLORS.GOLD}40`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: COLORS.GOLD }}>
              {progress.completionPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Royal Status Badge */}
      <div
        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
        style={{
          background: progress?.isProfileComplete
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}15, ${COLORS.SUCCESS}08)`
            : `linear-gradient(135deg, ${COLORS.WARNING}15, ${COLORS.WARNING}08)`,
          border: `1px solid ${progress?.isProfileComplete ? `${COLORS.SUCCESS}40` : `${COLORS.WARNING}40`}`,
          boxShadow: `0 2px 15px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}15`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            background: progress?.isProfileComplete
              ? COLORS.SUCCESS
              : COLORS.WARNING,
            boxShadow: `0 0 8px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}`,
          }}
        />
        <span
          className="text-sm font-medium tracking-wide"
          style={{
            color: progress?.isProfileComplete
              ? COLORS.SUCCESS
              : COLORS.WARNING,
          }}
        >
          {progress?.isProfileComplete
            ? "Verified Pilgrim"
            : "Profile Incomplete"}
        </span>
      </div>

      {/* Pending steps chips (when incomplete) */}
      {progress && !progress.isProfileComplete && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-[200px]">
          {!progress.steps.aadhaar && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              Aadhaar
            </span>
          )}
          {!progress.steps.college && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              College
            </span>
          )}
          {!progress.steps.phone && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              Phone
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// USER INFO SECTION
// ═══════════════════════════════════════════════════════════════════
function UserInfoSection({ userData, user, progress }: ProfileHeroProps) {
  return (
    <div className="flex-1 text-center lg:text-left">
      {/* Decorative Title Line */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a853]" />
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: `${COLORS.GOLD}80` }}
        >
          Yatri Profile
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a853]" />
      </div>

      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6"
        style={{
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 30%, ${COLORS.GOLD} 60%, ${COLORS.GOLD_LIGHT} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: `0 0 60px ${COLORS.GOLD}30`,
          fontFamily: "var(--font-ethereal), serif",
        }}
      >
        {userData?.firstName || user.name || "Traveler"}
      </h1>

      {/* Ornate Quick Info Pills - Phone & College only */}
      {(userData?.phone || userData?.college) && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
          {userData?.phone && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${COLORS.BG_DEEP}80, ${COLORS.BG_ROYAL}60)`,
                border: `1px solid ${COLORS.GOLD}25`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${COLORS.GOLD}10`,
              }}
            >
              <Phone className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              <span
                className="text-sm font-medium"
                style={{ color: COLORS.CREAM }}
              >
                {userData.phone}
              </span>
              {progress?.steps.phone && (
                <BadgeCheck
                  className="h-4 w-4"
                  style={{ color: COLORS.SUCCESS }}
                />
              )}
            </div>
          )}

          {userData?.college && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${COLORS.BG_DEEP}80, ${COLORS.BG_ROYAL}60)`,
                border: `1px solid ${COLORS.GOLD}25`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${COLORS.GOLD}10`,
              }}
            >
              <GraduationCap
                className="h-4 w-4"
                style={{ color: COLORS.GOLD }}
              />
              <span
                className="text-sm font-medium max-w-[200px] truncate"
                style={{ color: COLORS.CREAM }}
              >
                {userData.college}
              </span>
              {progress?.steps.college && (
                <BadgeCheck
                  className="h-4 w-4"
                  style={{ color: COLORS.SUCCESS }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Complete Profile Button - Royal CTA */}
      {!progress?.isProfileComplete && (
        <div className="flex justify-center lg:justify-start">
          <Link href="/complete-profile">
            <button
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #1a0a12 0%, #2d1520 50%, #1a0a12 100%)`,
                color: COLORS.GOLD,
                border: `2px solid ${COLORS.GOLD}60`,
                boxShadow: `
                  0 0 30px ${COLORS.GOLD}20,
                  0 8px 25px rgba(0,0,0,0.4),
                  inset 0 1px 0 ${COLORS.GOLD}20,
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `,
              }}
            >
              {/* Animated border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}10, transparent, ${COLORS.GOLD}10)`,
                  boxShadow: `inset 0 0 20px ${COLORS.GOLD}15`,
                }}
              />

              <Sparkles
                className="h-5 w-5 relative transition-transform group-hover:rotate-12"
                style={{ color: COLORS.GOLD_LIGHT }}
              />
              <span
                className="relative text-base"
                style={{
                  textShadow: `0 0 20px ${COLORS.GOLD}50`,
                }}
              >
                Complete Your Profile
              </span>
              <ArrowRight
                className="h-5 w-5 relative group-hover:translate-x-1 transition-transform"
                style={{ color: COLORS.GOLD_LIGHT }}
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
