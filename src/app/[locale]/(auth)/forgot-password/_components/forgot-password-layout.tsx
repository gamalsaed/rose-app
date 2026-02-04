"use client";

import { Button } from "@/components/ui/button";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { ForgotPasswordStep } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import EmailStep from "./email-step";
import VerifyOtpStep from "./otp-step";
import NewPasswordStep from "./new-password-step";

export default function ForgotPasswordLayout() {
  // translations
  const t = useTranslations();

  // state
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string | null>("");

  // variables
  const steps = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("forgot-password-step-one-title"),
      description: t("forgot-password-step-one-description"),
      form: <EmailStep email={email} setEmail={setEmail} setStep={setStep} />,
    },
    [FORGOT_PASSWORD_STEPS.OTP]: {
      title: t("forgot-password-step-two-title"),
      description: t.rich("forgot-password-step-two-description", {
        email: email || "",
        button: (chunk) => (
          <Button
            variant="Link"
            className="text-base inline"
            onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
          >
            {chunk}
          </Button>
        ),
      }),
      form: <VerifyOtpStep setStep={setStep} />,
    },
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("forgot-password-step-three-title"),
      description: t("forgot-password-step-three-description"),
      form: <NewPasswordStep email={email} setStep={setStep} />,
    },
  } as const;

  return (
    <>
      {/* heading */}
      <h1 className="text-2xl text-zinc-800 dark:text-zinc-50  font-semibold mb-1 leading-[100%] text-left">
        {steps[step].title}
      </h1>
      <p className="text-base font-normal leading-[100%] text-zinc-800 dark:text-zinc-50 pb-4 mb-6 border-b-[1px] border-zinc-200 dark:border-zinc-700  text-left">
        {steps[step].description}
      </p>

      {/* form */}
      {steps[step].form}
    </>
  );
}
