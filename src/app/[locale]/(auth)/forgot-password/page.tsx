import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import EmailStep from "./_components/email-step";
import NewPasswordStep from "./_components/new-password-step";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <NewPasswordStep />
    </main>
  );
}
