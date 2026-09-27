"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { AuthErrorToast } from "@/components/toast/error/auth";
import { AuthSuccessToast } from "@/components/toast/success/auth";
import { ROYAL_COLORS } from "./constants";
import { BackgroundEffects } from "./BackgroundEffects";
import { MysticGateSection } from "./MysticGateSection";
import { LoginCard } from "./LoginCard";
import { PageLoader } from "@/components/loader";

export function LoginContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  // Check for error or success in URL params (NextAuth redirects with error)
  useEffect(() => {
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      let message = "Something went wrong. Please try again.";
      if (error === "OAuthSignin") message = "Error starting authentication.";
      if (error === "OAuthCallback")
        message = "Error during authentication callback.";
      if (error === "OAuthCreateAccount") message = "Could not create account.";
      if (error === "EmailCreateAccount") message = "Could not create account.";
      if (error === "Callback") message = "Authentication callback failed.";
      if (error === "OAuthAccountNotLinked")
        message = "Email already linked to another account.";
      if (error === "AccessDenied")
        message = "Access denied. You may not have permission.";

      toast.custom(() => <AuthErrorToast message={message} />, {
        duration: 5000,
        position: "bottom-right",
      });
    }

    if (success === "true") {
      toast.custom(() => <AuthSuccessToast />, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/?auth=success" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed. Please try again.";
      toast.custom(() => <AuthErrorToast message={message} />, {
        duration: 5000,
        position: "bottom-right",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Toaster />

      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 flex items-center justify-center"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${ROYAL_COLORS.ROYAL_PURPLE}15 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${ROYAL_COLORS.DEEP_MAGENTA}12 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${ROYAL_COLORS.HOT_PINK}08 0%, transparent 60%),
            linear-gradient(180deg, ${ROYAL_COLORS.BG_DEEP} 0%, ${ROYAL_COLORS.BG_ROYAL} 30%, ${ROYAL_COLORS.BG_WINE} 70%, ${ROYAL_COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <BackgroundEffects />

        {/* Main Content Container */}
        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <MysticGateSection />
          <LoginCard isLoading={isLoading} onGoogleLogin={handleGoogleLogin} />
        </div>

        {/* Bottom decorative text - Desktop only */}
        <div className="hidden sm:block fixed bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: `${ROYAL_COLORS.GOLD}40` }}
          >
            14th–17th January 2027 • Varanasi
          </p>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  );
}
