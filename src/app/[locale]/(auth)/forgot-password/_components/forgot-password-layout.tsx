"use client";

import { Button } from "@/components/ui/button";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constants";
import { ForgotPasswordStep } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";

import NewPasswordStep from "./new-password-step";
import VerifyOtpStep from "./otp-step";
import EmailStep from "./email-step";

export default function ForgotPasswordLayout() {
  const t = useTranslations("auth");
  //state
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEPS.EMAIL,
  );
  const [email, setEmail] = useState<string | null>(null);

  //variables
  const steps: Record<
    ForgotPasswordStep,
    {
      title: string;
      description: string | React.ReactNode;
      form: React.ReactElement;
    }
  > = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("forgot your password"),
      description: t("forgot-password.steps.email.description"),
      form: <EmailStep email={email} setStep={setStep} setEmail={setEmail} />,
    },
    [FORGOT_PASSWORD_STEPS.OTP]: {
      title: t("Enter the code we sent"),
      description: t.rich("forgot-password.steps.otp.description", {
        email: email || "",
        button: (chunk) => (
          <Button
            variant="link"
            className="w-3 text-blue-400 border-none"
            onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
          >
            {chunk}
          </Button>
        ),
      }),
      form: (
        <VerifyOtpStep email={email} setStep={setStep} setEmail={setEmail} />
      ),
    },
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("Create a new password"),
      description: t("forgot-password.steps.new-password.description"),
      form: <NewPasswordStep email={email} setStep={setStep} />,
    },
  };
  //   as const;

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
