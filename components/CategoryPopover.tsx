import React from 'react';
import { createPortal } from 'react-dom';
import { CATEGORY_INFO } from '../constants';

export default function CategoryPopover(props: {
  popover: { id: string; left: number; top: number } | null;
}) {
  const { popover } = props;
  if (!popover) return null;

  const info = CATEGORY_INFO[popover.id];
  if (!info) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{ left: popover.left, top: popover.top }}
      role="tooltip"
    >
      <div className="w-[min(360px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-sans text-slate-700 shadow-lg">
        <div className="font-bold">{info.title.en}</div>
        <div className="mt-1 text-slate-600 whitespace-pre-line">{info.description.en}</div>
      </div>
    </div>,
    document.body
  );
}
