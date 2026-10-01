"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

/**
 * Intro phases:
 * - idle: Show stage background with Enter button
 * - loading: User is holding the Enter button (audio loading)
 * - blasting: Explosion effect playing
 * - video: Video playing with Continue button visible
 * - complete: Intro done, show Hero and rest of site
 */
type IntroPhase = "idle" | "loading" | "blasting" | "video" | "complete";

interface IntroContextType {
  phase: IntroPhase;
  loadProgress: number; // 0-100 for the hold-to-enter loading
  isIntroComplete: boolean;
  startLoading: () => void;
  cancelLoading: () => void;
  startBlast: () => void;
  startVideo: () => void;
  completeIntro: () => void;
  skipIntro: () => void;
  setLoadProgress: (progress: number) => void;
}

const IntroContext = createContext<IntroContextType | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Always show intro on every page load
  useEffect(() => {
    setHasCheckedStorage(true);
  }, []);

  const startLoading = useCallback(() => {
    setPhase("loading");
    setLoadProgress(0);
  }, []);

  const cancelLoading = useCallback(() => {
    setPhase("idle");
    setLoadProgress(0);
  }, []);

  const startBlast = useCallback(() => {
    setPhase("blasting");
    setLoadProgress(0);
  }, []);

  const startVideo = useCallback(() => {
    setPhase("video");
  }, []);

  const completeIntro = useCallback(() => {
    setPhase("complete");
  }, []);

  const skipIntro = useCallback(() => {
    setPhase("complete");
  }, []);

  const isIntroComplete = phase === "complete";

  // Don't render children until we've checked storage
  if (!hasCheckedStorage) {
    return null;
  }

  return (
    <IntroContext.Provider
      value={{
        phase,
        loadProgress,
        isIntroComplete,
        startLoading,
        cancelLoading,
        startBlast,
        startVideo,
        completeIntro,
        skipIntro,
        setLoadProgress,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
