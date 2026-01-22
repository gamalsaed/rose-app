import RegisterForm from "@/components/layout/app/register/register-form";
import { useTranslations } from "next-intl";
export default function Page() {
  const t = useTranslations("register");
  return (
    <div className="w-full  text-zinc-800 dark:text-zinc-50 font-medium">
      <h1 className="text-center font-edwardian p-0 mb-8 w-full font-normal text-5xl text-maroon-500 dark:text-softPink-300">
        {t("register-title")}
      </h1>
      <RegisterForm />
    </div>
  );
}
