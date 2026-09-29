"use client";

import {
  GoogleUserSchema,
  type GoogleUserSchemaType,
} from "@/lib/api/utils/auth.schema";
import { useScratchMutation } from "wire-axon/hooks";
import { BACKEND_URL } from "../constants";

/**
 * Response from backend after authentication
 * SYNC WITH: backend/controller/user.controller.ts
 */
interface AuthenticateResponse {
  info: string;
  user: {
    email: string;
    slugName: string;
  };
  isNewUser: boolean;
}

export function useAuthenticate() {
  const { makeRequest } = useScratchMutation({
    baseURL: BACKEND_URL,
  });

  const authenticate = (googleUser: GoogleUserSchemaType) => {
    // Send googleUser fields directly as body (not nested under googleUser key)
    makeRequest<AuthenticateResponse>({
      method: "post",
      url: "/user/auth",
      data: googleUser,
      bodyValidator: { bodySchema: GoogleUserSchema },
    });
  };

  return {
    authenticate,
  };
}
