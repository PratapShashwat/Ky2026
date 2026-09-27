import { Suspense } from "react";
import { LoginContent } from "@/components/pages/login";
import { PageLoader } from "@/components/loader";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginContent />
    </Suspense>
  );
}
