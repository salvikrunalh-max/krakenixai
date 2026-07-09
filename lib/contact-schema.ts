import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(1, "Industry is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please share a bit more detail"),
  package: z.string().optional(),
  intent: z.string().optional(),
  slot: z.string().optional(),
  contactTarget: z.string().optional(),
  contactTargetEmail: z.string().email().optional(),
  contactTargetLabel: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
