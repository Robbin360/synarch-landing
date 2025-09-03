'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('title', { default: 'Page not found' })}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('description', { default: 'Sorry, we couldn\'t find the page you\'re looking for.' })}
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('backHome', { default: 'Back to home' })}
          </Link>
        </div>
      </div>
    </div>
  )
}
