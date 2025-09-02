import { getRequestConfig } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale: requestLocale }) => {
  // Handle cases where locale might be undefined (like _not-found routes)
  if (!requestLocale) {
    requestLocale = defaultLocale;
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(requestLocale as any)) {
    requestLocale = defaultLocale;
  }

  // Enable static rendering
  setRequestLocale(requestLocale);

  return {
    messages: (await import(`./messages/${requestLocale}.json`)).default
  };
});