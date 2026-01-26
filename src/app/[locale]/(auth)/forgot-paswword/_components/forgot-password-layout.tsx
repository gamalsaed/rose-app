'use client';

import { Button } from "@/components/ui/button";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constants";
import { ForgotPasswordStep } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import OtpStep from "./otp-step";
import EmailStep from "./email-step";
import NewPasswordStep from "./new-password-step";

export default function ForgotPasswordLayout() {
    const t = useTranslations();
//state
   const [step, setStep] = useState<ForgotPasswordStep>(FORGOT_PASSWORD_STEPS.EMAIL);
   const [email, setEmail] = useState<string | null>(null);

   //variables 
   const steps: Record<ForgotPasswordStep, { title: string; description: string | React.ReactNode; form: React.ReactElement }> = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
        title: t('forgot your password'),
        description: t('forgot-password.steps.email.description'),
        form:<EmailStep email={email} setStep={setStep} setEmail={setEmail}  />
    },
    [FORGOT_PASSWORD_STEPS.OTP]: {
        title: t('Enter the code we sent'),
        description: t.rich("forgot-password.steps.otp.description",{
            email: email || '',
            button :(chunk)=><Button variant="link" className="w-3 text-blue-400 border-none" onClick={()=> setStep(FORGOT_PASSWORD_STEPS.EMAIL)}>{chunk}</Button>
        }),
         form: <OtpStep email={email} setStep={setStep} setEmail={setEmail}/>
    }, 
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
        title: t('Create a new password'),
        description: t("forgot-password.steps.new-password.description"),
        form:<NewPasswordStep />
    }
  }

  return <>
    {/* headline   */}
    <h1 className="text-3xl font-bold ">
        {steps[step].title}
    </h1>
    {/* description */}
    <p className="text-sm text-center text-zinc-800 dark:text-zinc-50 mt-2 mb-6 ">
        {steps[step].description}
    </p>
    {/* form  */}
    {steps[step].form}
   




  </>
}