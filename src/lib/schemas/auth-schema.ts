import { Translations } from "../types/globals";
import { z } from "zod";

export const OtpStepSchema = (t: Translations) =>
  z.object({ otp: z.string().min(6, t("otp-is-required")) });

//schema from menna
export const forgetPasswordFormSchema = (t: Translations) =>
  z.object({
    email: z
      .string()
      .nonempty(t("email-required"))
      .email({ message: t("invalid-email") }),
  });

export const setPasswordFormSchema = (t: Translations) =>
  z
    .object({
      password: z
        .string()
        .nonempty(t("password-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          t("invalid-password"),
        ),
      rePassword: z
        .string()
        .nonempty(t("repassword-required"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          t("invalid-password"),
        ),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("passwords-match"),
      path: ["rePassword"],
    });
