import { z } from "zod";

export const PasswordZodSchema = z
  .object({
    password: z.string().min(5).max(12),
    repeatPass: z.string().min(5).max(12),
    oldPassword: z.string().min(5).max(12),
  })
  .refine((data) => data.password === data.repeatPass, {
    message: "Passwords Should Match",
    path: ["repeatPass"],
  });
