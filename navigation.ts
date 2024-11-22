export const locales = ['en', 'es', 'zh'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export function getLocaleDisplayName(locale: Locale): string {
  const names = {
    en: 'English',
    es: 'Español',
    zh: '中文'
  };
  return names[locale];
}