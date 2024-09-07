import { Role } from "@prisma/client";
import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters.").max(255),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(255),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(255),
    confirmPassword: z.string(),
    role: z.nativeEnum(Role).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export const userPatchSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters.").max(255),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(255),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(255)
      .optional(),
    confirmPassword: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });
