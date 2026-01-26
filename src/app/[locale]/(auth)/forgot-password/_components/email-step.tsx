"use client";
import { forgetPasswordFormFields } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import React from "react";
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
import useForgetPassword from "../_hooks/use-forgot-password";
import SubmissionFeedback from "@/components/shared/submission-feedback";
import { forgetPasswordFormSchema } from "@/lib/schemas/auth-schema";

// TODO: setStep & setEmail will be passed from parent once forget-password flow is finalized
interface EmailStepProps {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function EmailStep() {
 // Translation
  const t = useTranslations("auth");

  // Hooks
  // const {storedValue:otpCooldown,setValue} = useLocaleStore(OTP_COOLDOWN_KEY,null);
  const { forgetPassword, isPending, error } = useForgetPassword();

  // Form & validation
  const form = useForm<forgetPasswordFormFields>({
    defaultValues: {
      // email:email|""
      email: "",
    },
    resolver: zodResolver(forgetPasswordFormSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<forgetPasswordFormFields> = (values) => {
    // TODO: check for cooldown
    // if (otpCooldown) {
    // store email in the state of the parent component
    // setEmail(values.email);
    // move to the next step once cooldown is not experied
    // setStep(FORGOT_PASSWORD_STEPS.OTP);
    // return;
    // }

    forgetPassword(values);
    // Todo: will be required once forget-password flow is finalized
    //store email in the state of the parent component
    // setEmail(values.email);
    // Todo: set the cooldown
    //const nextAllowedTime = Date.now(Date.now() + OTP_COOLDOWN_TIME) ;
    //setValue(nextAllowedTime.toISOString());

    // TODO: move to the next step
    // setStep(FORGOT_PASSWORD_STEPS.OTP);
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
      {/* Forget password form */}
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
          {/* Feedback */}
          {error && (
            <SubmissionFeedback className="mt-4">
              {error.message}
            </SubmissionFeedback>
          )}
          {/* Submit button */}
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
      {/* Footer */}
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
