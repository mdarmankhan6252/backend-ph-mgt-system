import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
   name: z
      .string({ invalid_type_error: "Name must be string" })
      .min(2, { message: "Name must be at least two character." })
      .max(50, { message: "Name can be maximum 20 character." }),

   email: z
      .string({ invalid_type_error: "Email must be a string" })
      .email({ message: "Invalid email address formate" })
      .min(5, { message: "Email must be at least 5 characters long" })
      .max(50, { message: "Email can't be 50 character" }),

   //1 uppercase, 1 digit, min 8 character.
   password: z
      .string({ invalid_type_error: "Password must be a string" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Password must contain at least one uppercase letter and one digit" }),

   phone: z
      .string({ invalid_type_error: "Phone number must be string" })
      .regex(/^01\d{9}$/,
         "Phone number must be exactly 11 digits starting with 01")
      .optional(),

   address: z
      .string({ invalid_type_error: "Address must be string" })
      .max(200, { message: "Address can't exceed 200 characters." })
      .optional()
})


export const updateUserZodSchema = z.object({
   name: z
      .string({ invalid_type_error: "Name must be string" })
      .min(2, { message: "Name must be at least 2 character" })
      .max(50, { message: "Name cannot exceed 500 characters" })
      .optional(),

   password: z
      .string({ invalid_type_error: "Password must be string" })
      .min(8, { message: "Password must be at least 8 character" })
      .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Password must contain at least one uppercase letter and one digit" })
      .optional(),

   phone: z
      .string({ invalid_type_error: "Phone number must be string" })
      .regex(/^01\d{9}$/,
         "Phone number must be exactly 11 digits starting with 01")
      .optional(),

   address: z
      .string({ invalid_type_error: "Address must be string" })
      .max(200, { message: "Address can't exceed 200 characters." })
      .optional(),

   role: z
      .enum(Object.values(Role) as [string])
      .optional(),

   isActive: z
      .enum(Object.values(IsActive) as [string])
      .optional(),

   isDeleted: z
      .boolean({ invalid_type_error: "isDeleted must be true of false" })
      .optional(),

   isVerified: z
      .boolean({ invalid_type_error: "isVerified must be tru or false" })
      .optional()
})

