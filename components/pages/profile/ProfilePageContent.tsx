"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { LogOut, Mail, User, Shield, Calendar } from "lucide-react";

const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  BG_WINE: "#2a1020",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#f0d890",
  GOLD_DARK: "#8b6914",
  CREAM: "#fdf6e3",
};

interface ProfilePageContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfilePageContent({ user }: ProfilePageContentProps) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

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
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.08) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section with Avatar */}
          <div 
            className="relative rounded-3xl overflow-hidden mb-8"
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_WINE}90 0%, ${COLORS.BG_ROYAL}95 50%, ${COLORS.BG_WINE}90 100%)`,
              border: `1px solid ${COLORS.GOLD}30`,
              boxShadow: `0 0 80px ${COLORS.GOLD}10, 0 25px 50px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Top Glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32"
              style={{
                background: `radial-gradient(ellipse at center, ${COLORS.GOLD}15 0%, transparent 70%)`,
              }}
            />

            <div className="relative px-6 sm:px-12 py-10 sm:py-14">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                
                {/* Avatar with Glow */}
                <div className="relative">
                  {/* Animated glow ring */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD})`,
                      padding: "3px",
                      animation: "spin 8s linear infinite",
                      filter: `blur(2px)`,
                      opacity: 0.6,
                      transform: "scale(1.05)",
                    }}
                  />
                  <div 
                    className="relative rounded-full p-[3px]"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK})`,
                      boxShadow: `0 0 40px ${COLORS.GOLD}40, 0 0 80px ${COLORS.GOLD}20`,
                    }}
                  >
                    <div 
                      className="h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden flex items-center justify-center ring-4 ring-[#0a0612]"
                      style={{
                        background: user.image ? "#0a0612" : `linear-gradient(135deg, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_WINE} 100%)`,
                      }}
                    >
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={144}
                          height={144}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span 
                          className="text-4xl sm:text-5xl font-bold"
                          style={{ color: COLORS.GOLD }}
                        >
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left flex-1">
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 50%, ${COLORS.GOLD} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: `0 0 40px ${COLORS.GOLD}30`,
                    }}
                  >
                    {user.name || "Traveler"}
                  </h1>
                  <p 
                    className="text-sm sm:text-base mb-4"
                    style={{ color: `${COLORS.CREAM}70` }}
                  >
                    {user.email}
                  </p>
                  
                  {/* Status Badge */}
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.1) 100%)`,
                      border: "1px solid rgba(34,197,94,0.4)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Verified Pilgrim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            
            {/* Email Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}80 0%, ${COLORS.BG_WINE}60 100%)`,
                border: `1px solid ${COLORS.GOLD}20`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
                    border: `1px solid ${COLORS.GOLD}30`,
                  }}
                >
                  <Mail className="h-6 w-6" style={{ color: COLORS.GOLD }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${COLORS.GOLD}80` }}>
                    Email Address
                  </p>
                  <p className="text-base font-medium truncate" style={{ color: COLORS.CREAM }}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Account ID Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}80 0%, ${COLORS.BG_WINE}60 100%)`,
                border: `1px solid ${COLORS.GOLD}20`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
                    border: `1px solid ${COLORS.GOLD}30`,
                  }}
                >
                  <Shield className="h-6 w-6" style={{ color: COLORS.GOLD }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${COLORS.GOLD}80` }}>
                    Account ID
                  </p>
                  <p className="text-sm font-mono truncate" style={{ color: `${COLORS.CREAM}80` }}>
                    {user.id || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Since Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}80 0%, ${COLORS.BG_WINE}60 100%)`,
                border: `1px solid ${COLORS.GOLD}20`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
                    border: `1px solid ${COLORS.GOLD}30`,
                  }}
                >
                  <Calendar className="h-6 w-6" style={{ color: COLORS.GOLD }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${COLORS.GOLD}80` }}>
                    Member Since
                  </p>
                  <p className="text-base font-medium" style={{ color: COLORS.CREAM }}>
                    September 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Role Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}80 0%, ${COLORS.BG_WINE}60 100%)`,
                border: `1px solid ${COLORS.GOLD}20`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
                    border: `1px solid ${COLORS.GOLD}30`,
                  }}
                >
                  <User className="h-6 w-6" style={{ color: COLORS.GOLD }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${COLORS.GOLD}80` }}>
                    Role
                  </p>
                  <p className="text-base font-medium" style={{ color: COLORS.CREAM }}>
                    Pilgrim
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSignOut}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(153,27,27,0.3) 100%)`,
                border: "1px solid rgba(220,38,38,0.4)",
                color: "#fca5a5",
                boxShadow: "0 10px 40px rgba(220,38,38,0.1)",
              }}
            >
              <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Footer Decoration */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div 
              className="h-px w-20"
              style={{ background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40)` }}
            />
            <span className="text-2xl">🪔</span>
            <div 
              className="h-px w-20"
              style={{ background: `linear-gradient(90deg, ${COLORS.GOLD}40, transparent)` }}
            />
          </div>
          <p 
            className="text-center text-xs mt-3 tracking-widest uppercase"
            style={{ color: `${COLORS.GOLD}50` }}
          >
            Kashi Yatra 2027 • IIT BHU Varanasi
          </p>
        </div>
      </main>
    </>
  );
}
