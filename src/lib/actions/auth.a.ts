"use server";

import { registerSchema, RegisterFormValues } from "@/lib/schemas/auth.s";

export async function registerAction(data: RegisterFormValues) {
  // Zod validation in server
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: `${parsed.error.issues.map((issue) => `${issue.message}\n`)}`,
    };
  }

  try {
    // Calling backend / API
    const res = await fetch(`${process.env.BASE_API}auth/signupp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
