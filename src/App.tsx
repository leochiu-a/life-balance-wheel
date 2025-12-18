import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BalanceChart from "./components/BalanceChart";
import Header from "./components/Header";
import AttributionFooter from "./components/AttributionFooter";
import ActionDock from "./components/ActionDock";
import { INITIAL_DATA, CHART_SIZE as BASE_CHART_SIZE } from "./constants";
import { Category, CategoryBase } from "./types";

export default function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<CategoryBase[]>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);
  const [chartSize, setChartSize] = useState(BASE_CHART_SIZE);
  const chartAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateSize = () => {
      const viewportPadding = 48; // breathing room on all sides
      const dockElement = document.getElementById("action-dock");
      const dockHeight = dockElement
        ? dockElement.getBoundingClientRect().height + 24
        : 0;
      const maxSize = BASE_CHART_SIZE;
      const minSize = 280;
      const areaWidth = chartAreaRef.current?.getBoundingClientRect().width;
      const availableWidth = (areaWidth ?? window.innerWidth) - 24;
      const availableHeight = window.innerHeight - viewportPadding - dockHeight - 240;
      const squareSize = Math.min(availableWidth, availableHeight); // keep 1:1 ratio
      const nextSize = Math.max(minSize, Math.min(maxSize, squareSize));
      setChartSize(nextSize);
    };

    calculateSize();
    window.addEventListener("resize", calculateSize);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(calculateSize)
        : null;
    if (ro && chartAreaRef.current) ro.observe(chartAreaRef.current);

    return () => {
      window.removeEventListener("resize", calculateSize);
      ro?.disconnect();
    };
  }, []);

  const handleChartChange = (id: string, newValue: number) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const localizedData: Category[] = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        label: t(`categories.labels.${item.id}`),
      })),
    [data, t, i18n.language]
  );

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-life-balance.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopy = async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.error("Failed to copy", err);
      alert(t("ui.copyUnsupported"));
    }
  };

  const usageGuide = t("usageGuide", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen pb-10 text-slate-800">
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-stone-200/70 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur md:p-10">
          <Header />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <section ref={chartAreaRef} className="min-w-0">
              <div className="rounded-2xl border border-stone-200 bg-[#fdfbf7]/80 p-4 shadow-inner md:p-6">
                <div className="mx-auto w-fit">
                  <BalanceChart
                    data={localizedData}
                    onChange={handleChartChange}
                    size={chartSize}
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-slate-500">
                {t("ui.tip")}
              </p>
            </section>

            <aside className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">
                {t("ui.guideTitle")}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {usageGuide.map((line, idx) => (
                  <li key={`${idx}-${line}`} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                    <span className="min-w-0">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50/70 p-3 text-xs text-slate-500">
                {t("ui.dockTip")}
              </div>
            </aside>
          </div>
        </div>

        <AttributionFooter />
      </main>

      <ActionDock copied={copied} onCopy={handleCopy} onDownload={handleDownload} />
    </div>
  );
}
