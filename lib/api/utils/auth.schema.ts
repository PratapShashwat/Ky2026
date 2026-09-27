import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// AUTHENTICATION SCHEMAS
// Based on NextAuth Google Provider
// ═══════════════════════════════════════════════════════════════════

/**
 * User data received from Google OAuth
 */
const GoogleUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName : z.string().optional(),
  avatarUrl: z.url().optional(),
});

type GoogleUserSchemaType = z.infer<typeof GoogleUserSchema>;

export { type GoogleUserSchemaType, GoogleUserSchema };
