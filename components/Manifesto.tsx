'use client'

import { useTranslations } from 'next-intl'

export default function Manifesto() {
  const t = useTranslations('Manifesto')

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title', { default: 'Our Manifesto' })}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle', { default: 'The principles that guide our vision' })}
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {t('section1.title', { default: 'Vision' })}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('section1.content', { 
                default: 'We envision a future where technology serves humanity, not the other way around. Our mission is to create systems that enhance human potential while preserving our core values and dignity.' 
              })}
            </p>
            
            <h2 className="text-2xl font-semibold mb-6">
              {t('section2.title', { default: 'Principles' })}
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>{t('section2.principle1', { default: 'Human-centered design' })}</li>
              <li>{t('section2.principle2', { default: 'Ethical technology development' })}</li>
              <li>{t('section2.principle3', { default: 'Sustainable innovation' })}</li>
              <li>{t('section2.principle4', { default: 'Transparency and accountability' })}</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-6">
              {t('section3.title', { default: 'Commitment' })}
            </h2>
            <p className="text-gray-700">
              {t('section3.content', { 
                default: 'We commit to building technology that respects human rights, promotes equality, and contributes to a better world for future generations.' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 