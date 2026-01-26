"use server";

import {
  forgetPasswordFormFields,
  ForgotPasswordResponse,
  resetPasswordResponse,
} from "@/lib/types/auth";

export async function resetPasswordAction(values: {email:string, newPassword:string}) {
  const res = await fetch(`${process.env.BASE_API}auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<resetPasswordResponse> = await res.json();

  return payload;
}
