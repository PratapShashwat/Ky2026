"use client";

import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig } from "../constants";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface OtpSendData {
  info: string;
}

export interface OtpVerifyData {
  info: string;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMAS
// ═══════════════════════════════════════════════════════════════════

const SendOtpSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
});

const VerifyOtpSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
  otp: z.string().length(6),
});

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for sending OTP to phone number
 */
export function useSendOtp() {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<OtpSendData>({
    url: "/user/otp/getOtp",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: SendOtpSchema },
    toastConfig: {
      successConfig: { message: "OTP sent to your phone!" },
      errorConfig: { message: "Failed to send OTP. Please try again." },
    },
  });

  return {
    sendOtp: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
}

/**
 * Hook for verifying OTP
 * @param userId - User ID for cache invalidation
 */
export function useVerifyOtp(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<OtpVerifyData>({
    url: "/user/otp/verifyOtp",
    method: "post",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: VerifyOtpSchema },
    invalidateQueryName: ["account-progress", userId!],
    toastConfig: {
      successConfig: { message: "Phone verified successfully!" },
      errorConfig: { message: "Invalid OTP. Please try again." },
    },
  });

  return {
    verifyOtp: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
