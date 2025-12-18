import { z } from "zod";

// AUTH SCHEMAS
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must be digits only"),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// INCOME SCHEMA
export const incomeSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z .string() .max(255, "Description is too long").optional().or(z.literal("")),
  date: z.string().min(1, "Date is required"),
});


// AUTH SCHEMA TYPES
export type LoginSchema = z.infer<typeof loginSchema>;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
export type ForgetSchema = z.infer<typeof forgetSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;

// INCOME SCHEMA TYPE
export type IncomeSchema = z.infer<typeof incomeSchema>;