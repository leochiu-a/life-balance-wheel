import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Locale } from '../types';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const languages: Locale[] = ['en', 'zh-tw'];
  const currentLocale: Locale =
    (i18n.resolvedLanguage ?? i18n.language ?? 'en').toLowerCase().startsWith('zh') ? 'zh-tw' : 'en';

  return (
    <header className="text-center py-6 mb-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1" />
        <div className="flex gap-2 rounded-full bg-stone-100 p-1 border border-stone-200">
          {languages.map((lng) => {
            const isActive = lng === currentLocale;
            return (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                {t(`languageNames.${lng}`)}
              </button>
            );
          })}
        </div>
        <div className="flex-1" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 flex items-center justify-center gap-3">
        <Sparkles className="w-8 h-8 text-yellow-500" />
        {t('ui.title')}
        <Sparkles className="w-8 h-8 text-yellow-500" />
      </h1>
      <p className="text-xl text-slate-600 mt-2">{t('ui.subtitle')}</p>
    </header>
  );
};

export default Header;
