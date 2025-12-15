import React, { useState, useRef, useEffect } from "react";
import BalanceChart from "./components/BalanceChart";
import Header from "./components/Header";
import { INITIAL_DATA, CHART_SIZE as BASE_CHART_SIZE } from "./constants";
import { Category } from "./types";
import { Download, Copy } from "lucide-react";

export default function App() {
  const [data, setData] = useState<Category[]>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);
  const [chartSize, setChartSize] = useState(BASE_CHART_SIZE);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateSize = () => {
      const viewportPadding = 48; // breathing room on all sides
      const maxSize = BASE_CHART_SIZE;
      const minSize = 320;
      const availableWidth = window.innerWidth - viewportPadding;
      const availableHeight = window.innerHeight - viewportPadding;
      const squareSize = Math.min(availableWidth, availableHeight); // keep 1:1 ratio
      const nextSize = Math.max(minSize, Math.min(maxSize, squareSize));
      setChartSize(nextSize);
    };

    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  const handleChartChange = (id: string, newValue: number) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

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
      alert(
        "Browser doesn't support direct image copy. Please use Download instead."
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 font-sans text-slate-800">
      <div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-10 border-2 border-stone-200"
        ref={chartContainerRef}
      >
        <Header />

        <div className="flex flex-col items-center">
          <div className="bg-[#fdfbf7] p-4 rounded-lg shadow-inner border border-stone-100 mb-8 w-full flex justify-center overflow-x-auto">
            <BalanceChart
              data={data}
              onChange={handleChartChange}
              size={chartSize}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full font-semibold transition-colors shadow-sm min-w-[140px]"
            >
              <Download size={20} /> Save
            </button>

            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold transition-all shadow-sm min-w-[140px] ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {copied ? (
                <>Copied! ✨</>
              ) : (
                <>
                  <Copy size={20} /> Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Tip: Click and drag on the wheel to paint your life balance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
