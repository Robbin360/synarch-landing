import { getRequestConfig } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { locales, defaultLocale } from './i18n';

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