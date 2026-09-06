import { z } from "zod";

export const GENDERS = ["male", "female"] as const;

export type Gender = (typeof GENDERS)[number];

export const RegisterSchema = z.object({
  phoneNumber: z
    .string()
    .min(14, "Enter a valid Nigerian phone number (+234…)")
    .max(14, "Enter a valid Nigerian phone number (+234…)")
    .regex(/^\+234[789]\d{9}$/, "Enter a valid Nigerian phone number (+234…)"),

  dateOfBirth: z
    .date({
      error: "Date of birth is required",
    })
    .refine((date) => {
      const cutoff = new Date(date);
      cutoff.setFullYear(cutoff.getFullYear() + 13);
      return cutoff <= new Date();
    }, {
      message: "You must be at least 13 years old to register",
    }),

  gender: z.enum(GENDERS, {
    error: "Please select your gender",
  }),
});


export type TRegisterSchema = z.infer<typeof RegisterSchema>;
