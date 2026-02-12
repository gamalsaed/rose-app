import { useTranslations } from 'next-intl';
import RegisterForm from './_components/register-form';
import { Link } from '@/i18n/navigation';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  // Translation
  const t = useTranslations('register');

  return (
    <div className="w-full  text-zinc-800 dark:text-zinc-50 font-medium">
      <h1 className="text-center text-5xl text-maroon-700 dark:text-softPink-300 font-edwardian mb-4">
        {t('register-title')}
      </h1>

      <Separator className="w-full mt-4 mb-6" />
      <RegisterForm />
      <Separator className="w-full mt-9 mb-5" />

      <p className="text-center mt-3">
        {t('registerMsg')}{' '}
        <Link href="/login" className="text-maroon-700 dark:text-softPink-300">
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
