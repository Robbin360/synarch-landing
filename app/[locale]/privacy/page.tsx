'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('Privacy')

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title', { default: 'Privacy Policy' })}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle', { default: 'How we protect your information' })}
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              {t('content', { 
                default: 'This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.' 
              })}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('section1.title', { default: 'Information We Collect' })}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('section1.content', { 
                default: 'We collect information you provide directly to us, such as when you contact us or sign up for our services.' 
              })}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('section2.title', { default: 'How We Use Your Information' })}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('section2.content', { 
                default: 'We use the information we collect to provide, maintain, and improve our services, and to communicate with you.' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
