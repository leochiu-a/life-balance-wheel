import React from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

export default function CategoryPopover(props: {
  popover: { id: string; left: number; top: number } | null;
}) {
  const { popover } = props;
  if (!popover) return null;

  const { t } = useTranslation();

  const title = t(`categories.info.${popover.id}.title`);
  const description = t(`categories.info.${popover.id}.description`);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{ left: popover.left, top: popover.top }}
      role="tooltip"
    >
      <div className="w-[min(360px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-sans text-slate-700 shadow-lg">
        <div className="font-bold">{title}</div>
        <div
          className="mt-1 text-slate-600"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>,
    document.body
  );
}
