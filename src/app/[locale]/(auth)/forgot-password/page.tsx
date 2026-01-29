import { useTranslations } from "next-intl";
import React from "react";
import ForgotPasswordLayout from "../forgot-password/_components/forgot-password-layout";
import { Link } from "@/i18n/navigation";

export default function forgotpassword() {
  const t = useTranslations("auth");

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen ">
        {/* form layout */}
        <ForgotPasswordLayout />

        {/* footer  */}
        <footer className="flex justify-center  mt-8 text-sm text-zinc-800 dark:text-zinc-50 w-full text-center ">
          <p className="text-gray-800 text-sm dark:text-gray-50 w-full">
            {t.rich("forgot-password-footer", {
              a: (chunk) => (
                <Link href="/login" className="text-blue-600 ">
                  {chunk}
                </Link>
              ),
            })}
          </p>
        </footer>
      </main>
    </>
  );
}
