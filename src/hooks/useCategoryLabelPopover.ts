import { useCallback, useRef, useState } from 'react';
import { Category, Point } from '../types';

type HoverPopover =
  | {
      id: string;
      left: number;
      top: number;
    }
  | null;

export function useCategoryLabelPopover(params: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  chartSize: number;
  data: Category[];
  center: number;
  radius: number;
  labelOffset: number;
}) {
  const { canvasRef, chartSize, data, center, radius, labelOffset } = params;
  const [popover, setPopover] = useState<HoverPopover>(null);
  const hoveredLabelIdRef = useRef<string | null>(null);

  const getLabelHitBox = useCallback(
    (ctx: CanvasRenderingContext2D, index: number) => {
      const sliceAngle = (2 * Math.PI) / data.length;
      const startOffset = -Math.PI / 2;

      const angle = startOffset + index * sliceAngle + sliceAngle / 2;
      const label = data[index]?.label ?? '';
      const textWidth = ctx.measureText(label).width;
      const dynamicLabelOffset = labelOffset + textWidth * 0.1;
      const labelRadius = radius + dynamicLabelOffset;
      const x = center + Math.cos(angle) * labelRadius;
      const y = center + Math.sin(angle) * labelRadius;

      const padding = 16;
      let drawX = x;
      if (drawX - textWidth / 2 < padding) drawX = padding + textWidth / 2;
      if (drawX + textWidth / 2 > chartSize - padding) drawX = chartSize - padding - textWidth / 2;

      const halfHeight = 14;
      const extra = 6;

      return {
        left: drawX - textWidth / 2 - extra,
        right: drawX + textWidth / 2 + extra,
        top: y - halfHeight - extra,
        bottom: y + halfHeight + extra,
        anchorX: drawX,
        anchorY: y,
      };
    },
    [center, chartSize, data, labelOffset, radius]
  );

  const clear = useCallback(() => {
    hoveredLabelIdRef.current = null;
    setPopover(null);
  }, []);

  const updateFromPointer = useCallback(
    (pos: Point) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.font = '20px "Patrick Hand"';

      let nextHoveredId: string | null = null;
      let nextAnchor: { x: number; y: number } | null = null;

      for (let i = 0; i < data.length; i++) {
        const hit = getLabelHitBox(ctx, i);
        const isHoveringLabel =
          pos.x >= hit.left && pos.x <= hit.right && pos.y >= hit.top && pos.y <= hit.bottom;
        if (isHoveringLabel) {
          nextHoveredId = data[i].id;
          nextAnchor = { x: hit.anchorX, y: hit.anchorY };
          break;
        }
      }

      if (!nextHoveredId || !nextAnchor) {
        if (hoveredLabelIdRef.current !== null) clear();
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();
      const scaleX = canvasRect.width / chartSize;
      const scaleY = canvasRect.height / chartSize;

      const next = {
        id: nextHoveredId,
        left: canvasRect.left + nextAnchor.x * scaleX,
        top: canvasRect.top + nextAnchor.y * scaleY - 8,
      };

      hoveredLabelIdRef.current = nextHoveredId;
      setPopover((prev) => {
        if (
          prev &&
          prev.id === next.id &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.top - next.top) < 0.5
        ) {
          return prev;
        }
        return next;
      });
    },
    [canvasRef, chartSize, clear, data, getLabelHitBox]
  );

  return { popover, updateFromPointer, clear };
}
