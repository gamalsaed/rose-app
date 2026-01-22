"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Selector } from "@/components/shared/selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/schemas/auth.s";
import { PhoneInput } from "@/components/shared/phone-input";
import { Input } from "@/components/ui/input";
import PassInput from "@/components/shared/pass-input";
import InputWrapper from "@/components/shared/input-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth.a";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("register");

  const { register, handleSubmit, formState, control } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        rePassword: "",
      },
    });

  // Submit Handler
  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    const res = await registerAction(data);

    if ("error" in res) {
      setServerError(res.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      {/* First & Last name */}
      <div className="flex w-full gap-5">
        <InputWrapper
          label={t("firstName.label")}
          errorMessage={
            t(formState.errors?.firstName?.message as any) || undefined
          }
        >
          <Input
            {...register("firstName")}
            error={formState.errors.firstName && true}
            placeholder={t("firstName.placeholder")}
          />
        </InputWrapper>
        <InputWrapper
          label={t("lastName.label")}
          errorMessage={
            t(formState.errors?.lastName?.message as any) || undefined
          }
        >
          <Input
            {...register("lastName")}
            error={formState.errors.lastName && true}
            placeholder={t("lastName.placeholder")}
          />
        </InputWrapper>
      </div>

      {/* Email */}
      <InputWrapper
        label={t("email.label")}
        errorMessage={t(formState.errors?.email?.message as any) || undefined}
      >
        <Input
          {...register("email")}
          error={formState.errors.email && true}
          placeholder={t("email.placeholder")}
        />
      </InputWrapper>
      {/* Phone Input */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => {
          return (
            <PhoneInput
              onChange={field.onChange}
              value={field.value}
              errorMessage={
                t(formState.errors?.phone?.message as any) || undefined
              }
              placeholder={t("phone.placeholder")}
            />
          );
        }}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => {
          return (
            <div>
              <Selector
                label={t("gender.label")}
                placeholder={t("gender.placeholder")}
                data={["Male", "Female"]}
                value={field.value}
                onValueChange={field.onChange}
                errorMessage={
                  t(formState.errors?.gender?.message as any) || undefined
                }
              />
            </div>
          );
        }}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <InputWrapper
              label={t("password.label")}
              errorMessage={
                t(formState.errors?.password?.message as any) || undefined
              }
            >
              <PassInput
                error={formState.errors.password && true}
                onChange={field.onChange}
                value={field.value}
              />
            </InputWrapper>
          );
        }}
      />

      {/* Confirm Password */}
      <Controller
        name="rePassword"
        control={control}
        render={({ field }) => {
          return (
            <InputWrapper
              label={t("rePassword.label")}
              errorMessage={
                t(formState.errors?.rePassword?.message as any) || undefined
              }
            >
              <PassInput
                error={formState.errors.rePassword && true}
                onChange={field.onChange}
                value={field.value}
              />
            </InputWrapper>
          );
        }}
      />

      {/* Server Erros just a placeholder */}
      <pre>{serverError}</pre>

      {/* Submit */}
      <Button type="submit" className=" capitalize">
        {t("createAcc")}
      </Button>

      <p className="text-center">
        {t("registerMsg")}{" "}
        <Link href="/login" className="text-maroon-700 dark:text-softPink-300">
          {t("login")}
        </Link>
      </p>
    </form>
  );
}
