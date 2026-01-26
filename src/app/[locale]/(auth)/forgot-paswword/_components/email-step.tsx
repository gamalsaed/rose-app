"use client";
import { forgetPasswordFormFields, ForgotPasswordStep } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useForgetPassword from "./_hooks/use-forgot-password";
import SubmissionFeedback from "@/components/shared/submission-feedback";
import { forgetPasswordFormSchema } from "@/lib/schemas/auth-schema";
import { FORGOT_PASSWORD_STEPS, OTP_COOLDOWN_KEY, OTP_COOLDOWN_TIME } from "@/lib/constants/auth.constants";
import { useLocalStorage } from "@/hooks/shared/use-local-storage";

// Ensure setStep is defined in the props
interface EmailStepProps {
  email: string | null;
  setStep: Dispatch<SetStateAction<ForgotPasswordStep>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

export default function EmailStep({ email , setStep, setEmail }: EmailStepProps) {
  //translation
  const t = useTranslations();
  // hooks
const [otpCooldown, setOtpCooldown] = useLocalStorage(OTP_COOLDOWN_KEY, null);

  //const {storedValue:otpCooldown,setValue} = useLocaleStore(OTP_COOLDOWN_KEY,null);
  const { sendOtp, isPending, error } = useForgetPassword();
  //form
  const form = useForm<forgetPasswordFormFields>({
    resolver: zodResolver(forgetPasswordFormSchema(t)),
    defaultValues: {
      email: email || "",
    },
  });
  //Functions
  const onSubmit: SubmitHandler<forgetPasswordFormFields> = (values) => {
    // check for cooldown
    if (otpCooldown) {
      //store email in the state of the parent component
      setEmail(values.email);
      //   move to the next step once cooldown is not experied
        setStep(FORGOT_PASSWORD_STEPS.OTP);
          return;
    }

    sendOtp(values.email,{
      onSuccess : ()=>{
        setEmail(values.email);
        // set the cooldown
       const nextAllowedTime = new Date(Date.now() + OTP_COOLDOWN_TIME);
        setOtpCooldown(nextAllowedTime.toISOString());
        setStep(FORGOT_PASSWORD_STEPS.OTP)
      },
    })
  
  };
  return (
    // TODO: headline & description will be dynamic based on current step in the flow currently using static values just for testing

    <>
      {/* Headline */}
      <div className="headline capitalize text-zinc-800 w-[25.375rem] mx-auto mb-6 dark:text-zinc-50 ">
        <h1 className="text-2xl font-semibold">
          {t("forgot-password-page-title")}
        </h1>
        <p className="text-base font-normal text-nowrap">
          {t("forgot-password-page-desc")}
        </p>
      </div>
      {/*Forget password form*/}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  w-[25.375rem] mx-auto  border-y border-zinc-200 dark:border-zinc-600"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0 mt-6">
                <FormLabel className="text-zinc-800 dark:text-zinc-50 mb-[0.375rem]">
                  {t("email")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@example.com"
                    {...field}
                    autoComplete="email"
                    className="rounded-lg w-full border-b text-sm font-normal border-zinc-300 p-4 text-zinc-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/*Feedback*/}
          {error && (
            <SubmissionFeedback className="mt-4">
              {error.message}
            </SubmissionFeedback>
          )}
          {/*Submit button*/}
          <Button
            loading={isPending}
            disabled={!form.formState.isValid && form.formState.isSubmitted}
            type="submit"
            variant={"default"}
            className="w-full text-white my-9"
          >
            {t("continue")}
          </Button>
        </form>
      </Form>
      {/*Footer*/}
      <p className="text-zinc-800 font-medium  text-sm dark:text-zinc-50 mt-5">
        {t.rich("forgot-password-page-footer", {
          a: (chunk) => (
            <Link
              href="/register"
              className="text-maroon-700 capitalize font-bold dark:text-softPink-300"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
    </>
  );
}