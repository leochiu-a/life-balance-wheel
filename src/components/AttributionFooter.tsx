import React from "react";
import { useTranslation } from "react-i18next";

const SOURCE_URL = "https://github.com/leochiu-a/life-balance-wheel";

export default function AttributionFooter() {
  const { t } = useTranslation();

  return (
    <footer className="mt-8 flex items-center justify-center px-4 pb-2 text-sm text-slate-600 md:text-base">
      <div className="text-center">
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-700 hover:text-blue-800 hover:underline focus-visible:underline underline-offset-2"
        >
          {t("footer.source")}
        </a>
        <span className="mx-2 text-slate-400">·</span>
        <span>{t("footer.madeBy", { author: "@leochiu" })}</span>
      </div>
    </footer>
  );
}
