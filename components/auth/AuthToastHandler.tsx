"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { AuthSuccessToast } from "@/components/toast/success/auth";

export function AuthToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "success") {
      toast.custom(() => <AuthSuccessToast />, {
        duration: 4000,
        position: "bottom-right",
      });

      // Clean up the URL by removing the auth param
      const url = new URL(window.location.href);
      url.searchParams.delete("auth");
      router.replace(url.pathname, { scroll: false });
    }
  }, [searchParams, router]);

  return <Toaster />;
}
