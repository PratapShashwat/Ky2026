"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { AuthErrorToast } from "@/components/toast/error/auth";
import { AuthSuccessToast } from "@/components/toast/success/auth";
import { ROYAL_COLORS } from "./constants";
import { BackgroundEffects } from "./BackgroundEffects";
import { MysticGateSection } from "./MysticGateSection";
import { LoginCard } from "./LoginCard";

export function LoginContent() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const searchParams = useSearchParams();

  
  // Handle error toast from URL params
  useEffect(() => {
    const defaultErrorMessage = "Something went wrong. Please try again.";
    const error = searchParams.get("error");
    if (!error) return;

    switch (error) {
      case "OAuthSignin":
        setErrorMessage("Error starting authentication.");
        break;
      case "OAuthCallback":
        setErrorMessage("Error during authentication callback.");
        break;
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
        setErrorMessage("Could not create account.");
        break;
      case "Callback":
        setErrorMessage("Authentication callback failed.");
        break;
      case "OAuthAccountNotLinked":
        setErrorMessage("Email already linked to another account.");
        break;
      case "AccessDenied":
        setErrorMessage("Access denied. You may not have permission.");
        break;
      default:
        setErrorMessage(defaultErrorMessage);
    }
  }, [searchParams]);

  // Show error toast when errorMessage changes
  useEffect(() => {
    if (!errorMessage) return;

    const toastId = toast.custom(
      () => <AuthErrorToast message={errorMessage} />,
      {
        duration: 5000,
        position: "bottom-right",
        id: "auth-error",
      },
    );

    return () => {
      setErrorMessage(undefined);
      toast.dismiss(toastId);
    };
  }, [errorMessage]);

  // Handle success toast from URL params
  useEffect(() => {
    const success = searchParams.get("success");
    if (success !== "true") return;

    const toastId = toast.custom(() => <AuthSuccessToast />, {
      duration: 4000,
      position: "bottom-right",
      id: "auth-success",
    });

    return () => {
      toast.dismiss(toastId);
    };
  }, [searchParams]);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/?auth=success" });
  };

  return (
    <>
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
          <LoginCard onGoogleLogin={handleGoogleLogin} />
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
    </>
  );
}
