"use client";
import { setPasswordFormSchema } from "@/lib/schemas/auth.schema";
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
import SubmissionFeedback from "@/components/shared/submission-feedback";
import { setPasswordFormFields } from "@/lib/types/auth";
import useResetPassword from "../_hooks/use-reset-password";

// TEMP: using test email for Forget Password step
const email = "testwork8080@gmail.com";

// TODO: setStep & setEmail will be passed from parent once forget-password flow is finalized
interface NewPasswordStepProps {
  email: string | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function NewPasswordStep() {
  //translation
  const t = useTranslations("auth");
  // hooks
  const { resetPassword, isPending, error } = useResetPassword();
  //form
  const form = useForm<setPasswordFormFields>({
    defaultValues: {
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(setPasswordFormSchema(t)),
  });
  //Functions
  const onSubmit: SubmitHandler<setPasswordFormFields> = (values) => {
    if (!email) {
      form.setError("root", { message: t("email-required") });
    }
    resetPassword({
      ...values,
      email,
    });
  };
  return (
    // TODO: headline & description will be dynamic based on current step in the flow currently using static values just for testing

    <>
      {/* Headline */}
      <div className="headline capitalize text-zinc-800 w-[25.375rem] mx-auto mb-4 dark:text-zinc-50 ">
        <h1 className="text-2xl font-semibold">
          {t("new-password-page-title")}
        </h1>
        <p className="text-base font-normal text-nowrap">
          {t("new-password-page-desc")}
        </p>
      </div>
      {/*Forget password form*/}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[25.375rem] mx-auto border-y border-zinc-200 dark:border-zinc-600"
        >
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-6 space-y-0 ">
                <FormLabel className="text-zinc-800 dark:text-zinc-50 mb-[0.375rem]">
                  {t("password")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    autoComplete="new-password"
                    type="password"
                    className="rounded-lg w-full border-b text-sm font-normal border-zinc-300 p-4 text-zinc-400 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* repassword */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-800 dark:text-zinc-50">
                  {t("re-password")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="**********"
                    {...field}
                    autoComplete="new-password"
                    type="password"
                    className="rounded-lg w-full border-b text-sm font-normal border-zinc-300 p-4 text-zinc-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/*Feedback*/}
          {error && (
            <SubmissionFeedback>
              {error.message || form.formState.errors.root?.message}
            </SubmissionFeedback>
          )}
          {/*Submit button*/}
          <Button
            loading={isPending}
            disabled={!form.formState.isValid && form.formState.isSubmitted}
            type="submit"
            variant={"default"}
            className="w-full text-white mt-5 mb-9"
          >
            {t("reset-password")}
          </Button>
        </form>
      </Form>
      {/*Footer*/}
      <p className="text-zinc-800 font-medium text-sm dark:text-zinc-50 pt-5">
        {t.rich("need-help", {
          a: (chunk) => (
            <Link
              href="/contact"
              className="text-maroon-700 font-bold  capitalize dark:text-softPink-300"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
    </>
  );
}
