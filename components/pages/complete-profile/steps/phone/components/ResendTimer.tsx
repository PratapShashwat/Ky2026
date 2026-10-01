import { Loader2, RefreshCw } from "lucide-react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface ResendTimerProps {
  countdown: number;
  onResend: () => void;
  isLoading: boolean;
}

export function ResendTimer({ countdown, onResend, isLoading }: ResendTimerProps) {
  if (countdown > 0) {
    return (
      <p style={{ color: `${COLORS.CREAM}50` }}>
        Resend OTP in{" "}
        <span style={{ color: COLORS.GOLD }} className="font-semibold">
          {countdown}s
        </span>
      </p>
    );
  }

  return (
    <button
      onClick={onResend}
      disabled={isLoading}
      className="flex items-center gap-2 mx-auto text-sm font-medium transition-all hover:scale-105"
      style={{ color: COLORS.GOLD }}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}
      Resend OTP
    </button>
  );
}
