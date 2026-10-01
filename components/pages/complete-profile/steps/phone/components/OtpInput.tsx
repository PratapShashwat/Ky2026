"use client";

import { useRef } from "react";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

const OTP_LENGTH = 6;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;

    const newOtp = value.split("");
    newOtp[index] = digit.slice(-1);
    const newValue = newOtp.join("");
    onChange(newValue.slice(0, OTP_LENGTH));

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    onChange(pastedData.slice(0, OTP_LENGTH));
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold
            rounded-xl outline-none transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : "focus:scale-105"}
          `}
          style={{
            background: `${COLORS.BG_DEEP}80`,
            border: `2px solid ${value[index] ? COLORS.GOLD : `${COLORS.GOLD}30`}`,
            color: COLORS.CREAM,
            boxShadow: value[index] ? `0 0 20px ${COLORS.GOLD}20` : "none",
          }}
        />
      ))}
    </div>
  );
}

export { OTP_LENGTH };
