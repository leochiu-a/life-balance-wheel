import { useTranslation } from "react-i18next";
import { Copy, Download, Languages } from "lucide-react";
import { Dock, DockIcon } from "./ui/dock";
import { Locale } from "../types";

function getCurrentLocale(language: string | undefined): Locale {
  return (language ?? "en").toLowerCase().startsWith("zh") ? "zh-tw" : "en";
}

export default function ActionDock({
  copied,
  onCopy,
  onDownload,
}: {
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}) {
  const { t, i18n } = useTranslation();
  const currentLocale = getCurrentLocale(
    i18n.resolvedLanguage ?? i18n.language
  );
  const nextLocale: Locale = currentLocale === "en" ? "zh-tw" : "en";

  const handleToggleLanguage = () => {
    i18n.changeLanguage(nextLocale);
  };

  const baseIcon = "text-slate-700 ring-stone-200/70";

  return (
    <>
      <div
        id="action-dock"
        className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 px-4"
      >
        <Dock
          className="mt-0 border-stone-200/70 bg-white/70 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)]"
          iconSize={42}
          iconMagnification={54}
          iconDistance={150}
          direction="middle"
        >
          <DockIcon
            onClick={handleToggleLanguage}
            role="button"
            tabIndex={0}
            title={t("ui.switchLanguage")}
            aria-label={t("ui.switchLanguage")}
            className={`${baseIcon} text-amber-700`}
          >
            <Languages className="h-5 w-5" />
          </DockIcon>
          <DockIcon
            onClick={onDownload}
            role="button"
            tabIndex={0}
            title={t("ui.save")}
            aria-label={t("ui.save")}
            className={`${baseIcon} text-blue-700`}
          >
            <Download className="h-5 w-5" />
          </DockIcon>
          <DockIcon
            onClick={onCopy}
            role="button"
            tabIndex={0}
            title={copied ? t("ui.copied") : t("ui.copy")}
            aria-label={copied ? t("ui.copied") : t("ui.copy")}
            className={`${baseIcon} text-slate-800`}
          >
            <Copy className="h-5 w-5" />
          </DockIcon>
        </Dock>
      </div>
    </>
  );
}
