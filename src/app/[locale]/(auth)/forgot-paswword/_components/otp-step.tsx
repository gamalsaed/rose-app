"use client";

import { useTranslations } from "use-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ForgotPasswordStep, OtpStepField } from "@/lib/types/auth";
import { OtpStepSchema } from "@/lib/schemas/auth-schema";
import useVerifyOtp from "./_hooks/use-verify-otp";
import SubmissionFeedback from "@/components/shared/submission-feedback";
import {
  FORGOT_PASSWORD_STEPS,
  OTP_COOLDOWN_KEY,
  OTP_COOLDOWN_TIME,
} from "@/lib/constants/auth.constants";
import useForgetPassword from "./_hooks/use-forgot-password";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";
import { Link } from "@/i18n/navigation";

interface OtpStepProps {
  email: string | null;
  setStep: Dispatch<SetStateAction<ForgotPasswordStep>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

export default function OtpStep({ email, setStep }: OtpStepProps) {
  //translation
  const t = useTranslations();
  //mutation
  const {
    verifyOtp,
    isPending: isVerfingOtp,
    error: verfiyOtpError,
  } = useVerifyOtp();

  const form = useForm<OtpStepField>({
    resolver: zodResolver(OtpStepSchema(t)),
    defaultValues: {
      otp: "",
    },
  });
  //   functions
  const onsubmit: SubmitHandler<OtpStepField> = (values) => {
    verifyOtp(values, {
      onSuccess: () => {
        setStep(FORGOT_PASSWORD_STEPS.NEW_PASSWORD);
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-12 space-x-12"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">{t("otp.label")}</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* Resend otp */}

          <ResendOtp email={email} />

          {/*Feedback*/}
          <SubmissionFeedback className="mt-4">
            {verfiyOtpError?.message}
          </SubmissionFeedback>

          {/* Submit  */}
          <Button
            loading={isVerfingOtp}
            disabled={!form.formState.isValid && form.formState.isSubmitted}
            type="submit"
            className="mt-6 w-full bg-maroon-700"
          >
            {t("otp.verfiy")}
          </Button>
        </form>
      </Form>
      <footer className="flex justify-center  mt-8 text-sm text-zinc-800 dark:text-zinc-50 w-full text-center ">
        <p className="text-gray-800 text-sm dark:text-gray-50 w-full">
          {t.rich("forgot-password.footer", {
            a: (chunk) => (
              <Link href="/login" className="text-blue-600 ">
                {chunk}
              </Link>
            ),
          })}
        </p>
      </footer>
    </>
  );
}

function ResendOtp({ email }: { email: string | null }) {
  //translation
  const t = useTranslations();
  //hooks
  const [otpCooldown, setValue, removeValue] = useLocalStorage(
    OTP_COOLDOWN_KEY,
    new Date(Date.now() + OTP_COOLDOWN_TIME).toISOString(),
  );

  // state
  const [countdown, setCountdown] = useState<number>(() => {
    if (!otpCooldown) return 0;

    const cooldown = new Date(otpCooldown);
    const remainingTime = Math.floor(
      (cooldown.getTime() - new Date().getTime()) / 1000,
    );
    return remainingTime;
  });
  //mutation
  const { sendOtp, isPending: isResendingOtp } = useForgetPassword();

  // function
  const setCooldown = (cooldown: Date) => {
    const nextAllowedTime = new Date(cooldown.getTime() + OTP_COOLDOWN_TIME);
    setValue(nextAllowedTime.toISOString());
    setCountdown(OTP_COOLDOWN_TIME / 1000);
  };

  const handleResendOtp = () => {
    if (!email) return;
    sendOtp(
      { email },
      {
        onSuccess: () => {
          setCooldown(new Date());
          toast.success(t("try-send-it-again"));
        },
        onError: (error) => {
          toast.error(t("try-send-it-again"));
        },
      },
    );
  };

  // effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpCooldown) {
      interval = setInterval(() => {
        setCountdown((prev: number) => {
          if (prev <= 0) {
            clearInterval(interval);
            removeValue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpCooldown, removeValue]);

  if (countdown > 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        {t("request-another-code")} ({countdown}s)
      </p>
    );
  }

  return (
    <p className="text-muted-foreground text-center">
      {t.rich("resend-otp", {
        button: (chunk: any) => (
          <Button
            type="button"
            loading={isResendingOtp}
            onClick={handleResendOtp}
            variant="link"
            className="text-primary w-fit text-blue-400 border-none"
          >
            {chunk}
          </Button>
        ),
      })}
    </p>
  );
}
