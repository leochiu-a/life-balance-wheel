import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="text-center">
      <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
        <Sparkles className="h-8 w-8 text-amber-400 drop-shadow-sm md:h-10 md:w-10" />
        <span>{t('ui.title')}</span>
        <Sparkles className="h-8 w-8 text-amber-400 drop-shadow-sm md:h-10 md:w-10" />
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
        {t('ui.subtitle')}
      </p>
    </header>
  );
};

export default Header;
