
import ForgotPasswordLayout from "./_components/forgot-password-layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale }}: Pick<RouteProps,'params'>) {
  const t = await getTranslations({locale});
  return {
    title: t("auth.forgot-password-meta-title"),
  };
}

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col justify-center items-center">
      <ForgotPasswordLayout />
    </main>
  );
}