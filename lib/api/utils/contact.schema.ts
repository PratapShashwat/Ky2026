import { z } from 'zod'

/**
 * Schema for contact form submission
 */
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

type ContactSchemaType = z.infer<typeof ContactSchema>;

/**
 * Response from backend after contact submission
 */
interface ContactResponse {
  success: boolean;
  message: string;
}

export { type ContactSchemaType, ContactSchema, type ContactResponse } 