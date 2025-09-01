import { getTranslations } from 'next-intl/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function TermsPage() {
  const t = await getTranslations('Terms')

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title', { default: 'Terms of Service' })}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle', { default: 'Please read these terms carefully' })}
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              {t('content', { 
                default: 'These terms of service govern your use of our website and services. By using our services, you agree to these terms.' 
              })}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('section1.title', { default: 'Acceptance of Terms' })}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('section1.content', { 
                default: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.' 
              })}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {t('section2.title', { default: 'Use License' })}
            </h2>
            <p className="text-gray-700 mb-6">
              {t('section2.content', { 
                default: 'Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 