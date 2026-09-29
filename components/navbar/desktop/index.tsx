"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { primaryLinks, secondaryLinks } from "../config/links.config";
import { SpiritualIcon } from "./SpiritualIcon";
import { ShineIcon } from "./ShineIcon";
import { UserAvatarDropdown } from "../common/UserAvatarDropdown";

/**
 * Desktop Navbar - Primary nav links and secondary links
 * Hidden on mobile (sm:flex)
 */
export const NavbarDesktop = memo(function NavbarDesktop() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Filter out LOGIN link if user is authenticated
  const filteredSecondaryLinks = session
    ? secondaryLinks.filter((link) => link.label !== "LOGIN")
    : secondaryLinks;

  return (
    <>
      {/* PRIMARY NAV — centered on the bar midline */}
      <nav
        className="absolute left-[19%] right-[26%] inset-y-0 hidden sm:flex items-center justify-center gap-4 z-10"
        aria-label="Primary"
        style={{ transform: "translateY(8%)" }}
      >
        {primaryLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className="nav-pill group flex items-center gap-1.5 lg:gap-2
                         px-3 lg:px-4 py-1 lg:py-1.5 rounded-full
                         tracking-[0.12em] uppercase whitespace-nowrap
                         transition-all duration-300 hover:scale-[1.05]"
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(12px, 1.05vw, 18px)",
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
        className={`absolute inset-y-0 hidden sm:flex items-center gap-4 z-10 ${session ? "right-[0.5%]" : "right-[3%]"}`}
        style={{ transform: "translateY(11%)" }}
      >
        {filteredSecondaryLinks.map((link) => {
          const active = isActive(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex items-center gap-1.5 lg:gap-2 tracking-[0.1em] uppercase whitespace-nowrap
                         transition-all duration-300 ${link.label === "LOGIN" ? "ml-3" : ""}`}
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(12px, 1vw, 17px)",
                color: active ? "#5c1a08" : "#3a1505",
                textShadow: active
                  ? "0 0 12px rgba(255,100,50,0.7), 0 0 25px rgba(255,80,30,0.5)"
                  : "0 1px 1px rgba(255,245,215,0.7)",
                filter: active
                  ? "drop-shadow(0 0 6px rgba(255,120,50,0.6))"
                  : undefined,
              }}
            >
              <SpiritualIcon kind={link.icon} />
              {link.label}
            </Link>
          );
        })}

        {/* User Avatar (shown when logged in) */}
        {session?.user && (
          <div className="ml-3">
            <UserAvatarDropdown user={session.user} />
          </div>
        )}
      </div>
    </>
  );
});
