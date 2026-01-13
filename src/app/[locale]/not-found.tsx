import { useTranslations } from "next-intl";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFoundPage() {
  // Translation
  const t = useTranslations();

  return (
    <Empty className="mt-12">
      <EmptyHeader>
        <EmptyTitle>{t("not-found.title")}</EmptyTitle>

        <EmptyDescription>{t("not-found.description")}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
