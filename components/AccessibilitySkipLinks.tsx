'use client'

import {useTranslations} from 'next-intl'

export default function AccessibilitySkipLinks() {
  const t = useTranslations('AccessibilitySkipLinks')

  return (
    <div className="sr-only">
      <a
        href="#main-content"
        className="skip-link"
        onFocus={(e) => e.currentTarget.classList.remove('sr-only')}
        onBlur={(e) => e.currentTarget.classList.add('sr-only')}
      >
        {t('skipToContent')}
      </a>
      <a
        href="#navigation"
        className="skip-link"
        onFocus={(e) => e.currentTarget.classList.remove('sr-only')}
        onBlur={(e) => e.currentTarget.classList.add('sr-only')}
      >
        {t('skipToNavigation')}
      </a>
    </div>
  )
}
