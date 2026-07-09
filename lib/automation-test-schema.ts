import { z } from "zod";

export const automationTestSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter a valid US phone number")
    .transform((val) => {
      const digits = val.replace(/\D/g, "");
      if (digits.length === 10) return `+1${digits}`;
      if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
      return val;
    })
    .refine((val) => /^\+1\d{10}$/.test(val), "Enter a valid US phone number"),
  mode: z.enum(["call", "sms"]),
  consent: z.literal(true, { message: "Consent is required" }),
  website: z.string().max(0).optional(),
});

export type AutomationTestData = z.infer<typeof automationTestSchema>;

export function normalizePhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
