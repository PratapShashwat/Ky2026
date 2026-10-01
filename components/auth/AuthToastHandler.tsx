"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AuthSuccessToast,
  AuthErrorToast,
  SignoutSuccessToast,
  SignoutErrorToast,
  AlreadyLoggedInToast,
} from "@/components/toast";

/**
 * Maps NextAuth error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "OAuthSignin":
      return "Error starting authentication.";
    case "OAuthCallback":
      return "Error during authentication callback.";
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
      return "Could not create account.";
    case "Callback":
      return "Authentication callback failed.";
    case "OAuthAccountNotLinked":
      return "Email already linked to another account.";
    case "AccessDenied":
      return "Access denied. You may not have permission.";
    case "NetworkError":
      return "Network error. Please check your connection.";
    case "unknown":
      return "An unexpected error occurred.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// Toast IDs
const TOAST_IDS = {
  AUTH_SUCCESS: "auth-success",
  AUTH_ERROR: "auth-error",
  SIGNOUT_SUCCESS: "signout-success",
  SIGNOUT_ERROR: "signout-error",
  ALREADY_LOGGED_IN: "already-logged-in",
} as const;

/**
 * Centralized auth toast handler for home page.
 * 
 * Uses 5 separate useEffects for each case:
 * 1. Sign-in success (?auth=success)
 * 2. Sign-in error (?auth=<error_code> or ?error=<code>)
 * 3. Sign-out success (?signout=success)
 * 4. Sign-out error (?signout=failure)
 * 5. Already logged in info (?info=already-logged-in)
 * 
 * Must be wrapped in Suspense when used in a page component.
 */
export function AuthToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Track which toasts have been shown to prevent duplicates
  const shownToasts = useRef<Set<string>>(new Set());

  // 1. Handle sign-in success
  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth !== "success") return;
    if (shownToasts.current.has(TOAST_IDS.AUTH_SUCCESS)) return;

    shownToasts.current.add(TOAST_IDS.AUTH_SUCCESS);
    
    toast.custom(() => <AuthSuccessToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.AUTH_SUCCESS,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [searchParams, router]);

  // 2. Handle sign-in error (from ?auth=<error> or ?error=<code>)
  useEffect(() => {
    const auth = searchParams.get("auth");
    const error = searchParams.get("error");

    if (auth === "success" || (!auth && !error)) return;
    
    const errorCode = auth || error;
    if (!errorCode) return;
    if (shownToasts.current.has(TOAST_IDS.AUTH_ERROR)) return;

    shownToasts.current.add(TOAST_IDS.AUTH_ERROR);

    toast.custom(() => <AuthErrorToast message={getAuthErrorMessage(errorCode)} />, {
      duration: 5000,
      position: "bottom-right",
      id: TOAST_IDS.AUTH_ERROR,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [searchParams, router]);

  // 3. Handle sign-out success
  useEffect(() => {
    const signout = searchParams.get("signout");
    if (signout !== "success") return;
    if (shownToasts.current.has(TOAST_IDS.SIGNOUT_SUCCESS)) return;

    shownToasts.current.add(TOAST_IDS.SIGNOUT_SUCCESS);

    toast.custom(() => <SignoutSuccessToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.SIGNOUT_SUCCESS,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [searchParams, router]);

  // 4. Handle sign-out error
  useEffect(() => {
    const signout = searchParams.get("signout");
    if (signout !== "failure") return;
    if (shownToasts.current.has(TOAST_IDS.SIGNOUT_ERROR)) return;

    shownToasts.current.add(TOAST_IDS.SIGNOUT_ERROR);

    toast.custom(() => <SignoutErrorToast />, {
      duration: 5000,
      position: "bottom-right",
      id: TOAST_IDS.SIGNOUT_ERROR,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [searchParams, router]);

  // 5. Handle already logged in info
  useEffect(() => {
    const info = searchParams.get("info");
    if (info !== "already-logged-in") return;
    if (shownToasts.current.has(TOAST_IDS.ALREADY_LOGGED_IN)) return;

    shownToasts.current.add(TOAST_IDS.ALREADY_LOGGED_IN);

    toast.custom(() => <AlreadyLoggedInToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.ALREADY_LOGGED_IN,
    });

    router.replace("/", { scroll: false });
    router.refresh();
  }, [searchParams, router]);

  return null;
}
