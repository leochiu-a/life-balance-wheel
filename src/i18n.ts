import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhTW from './locales/zh-tw.json';
import { DEFAULT_LOCALE } from './constants';

const resources = {
  en: { translation: en },
  'zh-tw': { translation: zhTW },
  'zh-TW': { translation: zhTW },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ['en', 'zh-tw', 'zh-TW'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
