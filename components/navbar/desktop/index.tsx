"use client";

import { memo } from "react";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useNavbar } from "../config/NavbarContext";
import { SpiritualIcon } from "./SpiritualIcon";
import { ShineIcon } from "./ShineIcon";
import { UserAvatarDropdown } from "../common/UserAvatarDropdown";

/**
 * Desktop Navbar - Primary nav links and secondary links
 * Hidden on mobile (sm:flex)
 */
export const NavbarDesktop = memo(function NavbarDesktop() {
  const { 
    isActive, 
    isSessionLoading,
    isAuthenticated, 
    user, 
    primaryLinks, 
    secondaryLinks 
  } = useNavbar();

  return (
    <>
      {/* PRIMARY NAV — centered on the bar midline */}
      <nav
        className="absolute left-[22%] right-[26%] inset-y-0 hidden sm:flex items-center justify-center gap-4 z-10"
        aria-label="Primary"
        style={{ transform: "translateY(8%)" }}
      >
        {primaryLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className="nav-pill group flex items-center gap-1 lg:gap-1.5
                         px-2 lg:px-3 py-0.5 lg:py-1 rounded-full
                         tracking-[0.1em] uppercase whitespace-nowrap
                         transition-all duration-300 hover:scale-[1.05]"
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(10px, 0.85vw, 14px)",
                color: active ? "#3a1505" : "#3a1505",
                background: active
                  ? "linear-gradient(135deg, rgba(255,215,0,0.85) 0%, rgba(255,180,0,0.75) 30%, rgba(255,230,100,0.9) 50%, rgba(255,180,0,0.75) 70%, rgba(255,215,0,0.85) 100%)"
                  : "linear-gradient(135deg, rgba(255,215,0,0.28) 0%, rgba(212,168,83,0.18) 50%, rgba(184,134,11,0.28) 100%)",
                border: active
                  ? "2px solid rgba(255,230,100,1)"
                  : "1px solid rgba(255,215,0,0.55)",
                boxShadow: active
                  ? "0 0 25px rgba(255,215,0,0.9), 0 0 50px rgba(255,180,0,0.7), 0 0 80px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,255,200,0.5), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,245,200,0.35)",
                textShadow: active
                  ? "0 0 8px rgba(255,215,0,0.8), 0 0 15px rgba(255,180,0,0.6), 0 1px 1px rgba(255,245,215,0.9)"
                  : "0 1px 1px rgba(255,245,215,0.7)",
                transform: active ? "scale(1.08)" : undefined,
              }}
            >
              <ShineIcon />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* SECONDARY LINKS (CONTACT + LOGIN/Avatar) with spiritual icons */}
      <div
        className={`absolute inset-y-0 hidden sm:flex items-center gap-4 z-10 ${isAuthenticated ? "right-[0.5%]" : "right-[3%]"}`}
        style={{ transform: "translateY(11%)" }}
      >
        {secondaryLinks.map((link) => {
          const active = isActive(link.href);
          const isLoginLink = link.label === "LOGIN";

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex items-center gap-1.5 lg:gap-2 tracking-[0.1em] uppercase whitespace-nowrap
                         transition-all duration-300 hover:scale-[1.08] ${isLoginLink ? "ml-3" : ""}`}
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(10px, 0.85vw, 14px)",
                color: active ? "#5c1a08" : "#3a1505",
                textShadow: active
                  ? "0 0 12px rgba(255,100,50,0.7), 0 0 25px rgba(255,80,30,0.5)"
                  : "0 1px 1px rgba(255,245,215,0.7)",
                filter: active
                  ? "drop-shadow(0 0 6px rgba(255,120,50,0.6))"
                  : undefined,
              }}
            >
              <SpiritualIcon kind={link.icon} className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
              <span className="transition-all duration-300 group-hover:text-[#5c1a08] group-hover:drop-shadow-[0_0_10px_rgba(255,180,0,0.6)]">
                {isLoginLink && isSessionLoading ? (
                  <Spinner className="size-3" />
                ) : (
                  link.label
                )}
              </span>
            </Link>
          );
        })}

        {/* User Avatar (shown when logged in) */}
        {isSessionLoading ? null : isAuthenticated && user ? (
          <div className="ml-3">
            <UserAvatarDropdown user={user} />
          </div>
        ) : null}
      </div>
    </>
  );
});
