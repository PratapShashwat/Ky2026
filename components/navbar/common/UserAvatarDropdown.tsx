"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Loader2 } from "lucide-react";
import { useSignOut } from "@/lib/api/hooks";

interface UserAvatarDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  const [imageError, setImageError] = useState(false);
  const { isSigningOut, handleSignOut } = useSignOut();

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // Get slug from email (part before @) and truncate to 10 chars
  const slugName = user.email?.split("@")[0] || "user";
  const displaySlug =
    slugName.length > 10 ? `${slugName.slice(0, 10)}..` : slugName;

  const showImage = user.image && !imageError;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-3 rounded-full focus:outline-none transition-all duration-300 hover:scale-105 px-3 py-1.5 group"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(212,168,83,0.2) 50%, rgba(184,134,11,0.25) 100%)",
            border: "2px solid rgba(255,215,0,0.6)",
            boxShadow:
              "0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,180,0,0.2), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,245,200,0.4)",
          }}
        >
          {/* Glow ring around avatar */}
          <div
            className="relative"
            style={{
              padding: "2px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #ffd700 0%, #d4a853 50%, #8b6914 100%)",
              boxShadow:
                "0 0 12px rgba(255,215,0,0.6), 0 0 20px rgba(255,180,0,0.3)",
            }}
          >
            <div
              className="h-8 w-8 lg:h-9 lg:w-9 rounded-full overflow-hidden ring-2 ring-[#1a0a05] flex items-center justify-center"
              style={{
                background: showImage
                  ? "transparent"
                  : "linear-gradient(135deg, #d4a853 0%, #b8860b 50%, #8b6914 100%)",
              }}
            >
              {showImage ? (
                <Image
                  src={user.image!}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span
                  className="text-xs font-bold"
                  style={{ color: "#1a0a05" }}
                >
                  {initials}
                </span>
              )}
            </div>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-wide hidden lg:block"
            style={{
              color: "#3a1505",
              fontFamily: "var(--font-ethereal), serif",
              textShadow: "0 1px 1px rgba(255,245,215,0.7)",
            }}
          >
            {displaySlug}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 z-[300] dropdown-animate"
        style={{
          background:
            "linear-gradient(145deg, #1a0a05 0%, #2d1810 50%, #1a0a05 100%)",
          border: "1px solid rgba(255,215,0,0.4)",
          boxShadow:
            "0 0 30px rgba(255,215,0,0.2), 0 10px 40px rgba(0,0,0,0.5)",
          borderRadius: "12px",
        }}
      >
        {/* User Info Header */}
        <div className="px-3 py-2">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "#d4a853" }}
          >
            {user.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "rgba(255,245,215,0.6)" }}
          >
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator style={{ background: "rgba(255,215,0,0.2)" }} />

        {/* Profile Link */}
        <DropdownMenuItem
          asChild
          className="focus:bg-[rgba(255,215,0,0.1)] rounded-md mx-1"
        >
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer px-3 py-2 transition-colors"
            style={{ color: "rgba(255,245,215,0.9)" }}
          >
            <User className="h-4 w-4" style={{ color: "#d4a853" }} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator style={{ background: "rgba(255,215,0,0.2)" }} />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 transition-colors focus:bg-[rgba(255,100,100,0.1)] rounded-md mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: "rgba(255,100,100,0.9)" }}
        >
          {isSigningOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>{isSigningOut ? "Signing out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
