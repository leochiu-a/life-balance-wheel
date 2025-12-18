import React from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy, Download, Languages } from "lucide-react";
import { Dock, DockIcon } from "./ui/dock";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

  const baseButton =
    "h-full w-full cursor-pointer rounded-full bg-white/60 text-slate-800 hover:bg-white/80 focus-visible:ring-slate-300";

  return (
    <div
      id="action-dock"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4"
    >
      <TooltipProvider delayDuration={120}>
        <Dock
          className="mt-0 border-0 bg-white/55 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)]"
          iconSize={42}
          iconMagnification={54}
          iconDistance={150}
          direction="middle"
        >
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleLanguage}
                  className={`${baseButton} text-amber-700`}
                  aria-label={t("ui.switchLanguage")}
                >
                  <Languages className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <p>{t("ui.switchLanguage")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDownload}
                  className={`${baseButton} text-blue-700`}
                  aria-label={t("ui.save")}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <p>{t("ui.save")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCopy}
                  className={
                    copied
                      ? "h-full w-full cursor-pointer rounded-full bg-emerald-500 text-white hover:bg-emerald-500 focus-visible:ring-emerald-300"
                      : baseButton
                  }
                  aria-label={copied ? t("ui.copied") : t("ui.copy")}
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <p>{copied ? t("ui.copied") : t("ui.copy")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
