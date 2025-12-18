import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhTW from './locales/zh-tw.json';
import { DEFAULT_LOCALE } from './constants';
import type { Locale } from './types';

const LOCALE_STORAGE_KEY = 'life-balance-wheel:locale';

function normalizeLocale(language: string | undefined): Locale {
  return (language ?? DEFAULT_LOCALE).toLowerCase().startsWith('zh')
    ? 'zh-tw'
    : 'en';
}

function readStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (value === 'en' || value === 'zh-tw') return value;
    return null;
  } catch {
    return null;
  }
}

const resources = {
  en: { translation: en },
  'zh-tw': { translation: zhTW },
  'zh-TW': { translation: zhTW },
};

const initialLocale = readStoredLocale() ?? DEFAULT_LOCALE;

const initPromise = i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ['en', 'zh-tw', 'zh-TW'],
  interpolation: {
    escapeValue: false,
  },
});

const applyLocaleSideEffects = () => {
  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore
  }
  document.documentElement.lang = locale === 'zh-tw' ? 'zh-TW' : 'en';
};

initPromise.then(() => {
  applyLocaleSideEffects();
  i18n.on('languageChanged', applyLocaleSideEffects);
});

export default i18n;
