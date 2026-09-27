"use client";

import {
  GoogleUserSchema,
  type GoogleUserSchemaType,
} from "@/lib/api/utils/auth.schema";
import { useScratchMutation } from "wire-axon/hooks";
import { BACKEND_URL } from "../constants";


/**
 * Response from backend after authentication
 */
interface AuthenticateResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    avatarUrl: string | null;
    role: "USER" | "ADMIN" | "ORGANIZER";
    createdAt: string;
    updatedAt: string;
  };
  isNewUser: boolean;
}
export function useAuthenticate() {
  const { makeRequest } = useScratchMutation({
    baseURL: BACKEND_URL,
  });

  const authenticate = (googleUser: GoogleUserSchemaType) => {
    makeRequest<AuthenticateResponse>({
      method: "post",
      url: "/auth",
      data: { googleUser },
      bodyValidator: { bodySchema: GoogleUserSchema },
    });
  };

  return {
    authenticate,
  };
}
