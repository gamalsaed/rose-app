import { useTranslations } from 'next-intl'
import React from 'react'

export default function PageSummary() {
  // Translation
  const t = useTranslations();
  return <>
   <aside className=" bottom-0 left-0  bg-gradient-to-r shadow-lg z-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">{t('Summary')}</h2>

  {/* TODO :: summary section */}
        </div>
    </aside> 
    </>
}