import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  CATEGORY_INFO,
  CATEGORY_LABELS,
  DEFAULT_LOCALE,
  LANGUAGE_LABELS,
  USAGE_GUIDE,
} from './constants';
import { Locale } from './types';

const buildCategoryLabels = (locale: Locale) => {
  const labels: Record<string, string> = {};
  Object.entries(CATEGORY_LABELS).forEach(([id, translation]) => {
    labels[id] = translation[locale];
  });
  return labels;
};

const buildCategoryInfo = (locale: Locale) => {
  const info: Record<string, { title: string; description: string }> = {};
  Object.entries(CATEGORY_INFO).forEach(([id, entry]) => {
    info[id] = {
      title: entry.title[locale],
      description: entry.description[locale],
    };
  });
  return info;
};

const resources = {
  en: {
    translation: {
      ui: {
        title: 'Life Balance Wheel',
        subtitle: 'How is your life going? Drag the slices to reflect your current state.',
        save: 'Save',
        copy: 'Copy',
        copied: 'Copied! ✨',
        tip: 'Tip: Click and drag on the wheel to paint your life balance.',
        copyUnsupported: "Browser doesn't support direct image copy. Please use Download instead.",
      },
      footer: {
        source: 'source',
        madeBy: 'made with ❤️ by {{author}}',
      },
      usageGuide: USAGE_GUIDE.en,
      categories: {
        labels: buildCategoryLabels('en'),
        info: buildCategoryInfo('en'),
      },
      languageNames: LANGUAGE_LABELS,
    },
  },
  zh: {
    translation: {
      ui: {
        title: '人生平衡輪',
        subtitle: '你的生活過得怎麼樣？拖拉輪盤的切片，畫出現在的狀態。',
        save: '下載圖片',
        copy: '複製圖片',
        copied: '已複製！✨',
        tip: '提示：點擊並拖曳輪盤，就能畫出你的生活平衡。',
        copyUnsupported: '瀏覽器不支援直接複製圖片，請改用下載。',
      },
      footer: {
        source: '原始碼',
        madeBy: '由 {{author}} 滿滿的 ❤️ 製作',
      },
      usageGuide: USAGE_GUIDE.zh,
      categories: {
        labels: buildCategoryLabels('zh'),
        info: buildCategoryInfo('zh'),
      },
      languageNames: LANGUAGE_LABELS,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
