"use server";

import {
  forgetPasswordFormFields,
  ForgotPasswordResponse,
} from "@/lib/types/auth";

export async function handleForgetPassword(values: forgetPasswordFormFields) {
  const res = await fetch(`${process.env.BASE_API}auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<ForgotPasswordResponse> = await res.json();

  return payload;
}
