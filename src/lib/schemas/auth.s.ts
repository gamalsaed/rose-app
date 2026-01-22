import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "firstName.min" }),
    lastName: z.string().min(2, { message: "lastName.min" }),
    email: z.string().email({ message: "email.invalid" }),
    phone: z.string().regex(/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/, {
      message: "phone.invalid",
    }),
    gender: z.enum(["male", "female", ""], {
      message: "gender.required",
    }),
    password: z
      .string()
      .min(8, { message: "password.min" })
      .regex(/[A-Z]/, { message: "password.uppercase" })
      .regex(/[0-9]/, { message: "password.number" })
      .regex(/[^A-Za-z0-9]/, { message: "password.special" }),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "rePassword.match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
