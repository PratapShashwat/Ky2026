"use client";

import PhoneInputWithCountry from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";

interface PhoneInputProps {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  disabled?: boolean;
}

export function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  return (
    <div
      className="phone-input-wrapper rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_DEEP}80 0%, ${COLORS.BG_ROYAL}80 100%)`,
        border: `1px solid ${COLORS.GOLD}30`,
      }}
    >
      <PhoneInputWithCountry
        international
        defaultCountry="IN"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-4 bg-transparent outline-none text-lg"
      />
      <style jsx global>{`
        .phone-input-wrapper .PhoneInput {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .phone-input-wrapper .PhoneInputCountry {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .phone-input-wrapper .PhoneInputCountryIcon {
          width: 24px;
          height: 18px;
          border-radius: 2px;
          overflow: hidden;
        }
        .phone-input-wrapper .PhoneInputCountrySelectArrow {
          color: ${COLORS.GOLD};
          opacity: 0.6;
        }
        .phone-input-wrapper .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          color: ${COLORS.CREAM};
          cursor: pointer;
        }
        .phone-input-wrapper .PhoneInputCountrySelect option {
          background: ${COLORS.BG_ROYAL};
          color: ${COLORS.CREAM};
        }
        .phone-input-wrapper .PhoneInputInput {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: ${COLORS.CREAM};
          font-size: 1.125rem;
        }
        .phone-input-wrapper .PhoneInputInput::placeholder {
          color: ${COLORS.CREAM}60;
        }
      `}</style>
    </div>
  );
}
