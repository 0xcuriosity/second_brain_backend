import { z } from "zod";

export const userValidator = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});
