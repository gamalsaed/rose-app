"use client";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OTPInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export function OTPInput({ value, onChange, disabled }: OTPInputProps) {
  return (
    <InputOTP
      value={value}
      onChange={onChange}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      disabled={disabled}
    >
      <InputOTPGroup className="flex gap-2.5">
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot
            className="rounded-md shadow-none dark:bg-zinc-700 "
            key={i}
            index={i}
            disabled={disabled}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
