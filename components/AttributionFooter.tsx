import React from 'react';

const SOURCE_URL = 'https://github.com/leochiu-a/life-balance-wheel';

export default function AttributionFooter() {
  return (
    <footer className="mt-6 flex items-center justify-center px-4 pb-6 text-xs text-slate-500">
      <div className="text-center">
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-700 hover:text-blue-800 hover:underline focus-visible:underline underline-offset-2"
        >
          source
        </a>
        <span className="text-slate-400"> · </span>
        <span>
          made with <span aria-hidden="true">❤️</span>
          <span className="sr-only">love</span> by @leochiu
        </span>
      </div>
    </footer>
  );
}
