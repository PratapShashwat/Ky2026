import { useState, useEffect, useCallback } from "react";

export function useCountdown(initialValue: number = 0) {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const startCountdown = useCallback((seconds: number) => {
    setCountdown(seconds);
  }, []);

  const resetCountdown = useCallback(() => {
    setCountdown(0);
  }, []);

  return { countdown, startCountdown, resetCountdown };
}
