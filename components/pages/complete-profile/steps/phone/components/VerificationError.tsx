import { AlertCircle } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface VerificationErrorProps {
  message: string;
}

export function VerificationError({ message }: VerificationErrorProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl"
      style={{
        background: `${COLORS.ERROR}15`,
        border: `1px solid ${COLORS.ERROR}30`,
      }}
    >
      <AlertCircle className="h-5 w-5 shrink-0" style={{ color: COLORS.ERROR }} />
      <p className="text-sm" style={{ color: COLORS.ERROR }}>
        {message}
      </p>
    </div>
  );
}
