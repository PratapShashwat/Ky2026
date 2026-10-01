"use client";

import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { ProfileLoader } from "@/components/loader";
import { useMyAccount, useSignOut } from "@/lib/api/hooks";
import { ProfileHero, DetailedInfo, ProfileFooter } from "./sections";
import { ErrorState } from "./error";
import { COLORS, ProfileUser } from "./constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE CONTENT
// Main container that composes all profile sections
// ═══════════════════════════════════════════════════════════════════

interface ProfilePageContentProps {
  user: ProfileUser;
}

export function ProfilePageContent({ user }: ProfilePageContentProps) {
  const { isSigningOut, handleSignOut } = useSignOut();
  
  // Fetch account data via GraphQL - returns profile + progress
  const {
    profile: userData,
    progress,
    isLoading,
    isError,
  } = useMyAccount();

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <ProfileLoader />
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {/* Hero Section - Avatar, Name, Status */}
              <ProfileHero 
                userData={userData} 
                user={user} 
                progress={progress} 
              />

              {/* Detailed Info Section - Cards & Verification */}
              <DetailedInfo 
                userData={userData} 
                user={user} 
                progress={progress} 
              />

              {/* Footer Section - Sign Out & Decorative */}
              <ProfileFooter 
                isSigningOut={isSigningOut} 
                handleSignOut={handleSignOut} 
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
