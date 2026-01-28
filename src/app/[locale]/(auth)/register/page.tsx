
import { useTranslations } from "next-intl";
import RegisterForm from "./_components/register-form";

export default function Page() {
  const t = useTranslations("register");
  return (
    <div className="w-full  text-zinc-800 dark:text-zinc-50 font-medium">
      <h1 className="text-center text-5xl text-maroon-700 dark:text-softPink-300 font-edwardian mb-4">
        {t("register-title")}
      </h1>
      <RegisterForm />
    </div>
  );
}
