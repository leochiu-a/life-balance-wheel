import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Category, Point } from '../types';
import { CHART_SIZE as BASE_CHART_SIZE, MAX_VALUE } from '../constants';
import { drawSketchyLine, drawSketchyCircle, drawScribbleSlice } from '../utils/sketchy';

interface BalanceChartProps {
  data: Category[];
  onChange: (id: string, newValue: number) => void;
  readOnly?: boolean;
  size?: number;
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data, onChange, readOnly, size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(null);

  const { chartSize, center, radius, labelOffset } = useMemo(() => {
    const chartSize = size ?? BASE_CHART_SIZE;
    const scale = chartSize / BASE_CHART_SIZE;
    const margin = 80 * scale; // room for labels
    const center = chartSize / 2;
    const radius = center - margin;
    // Keep labels comfortably off the circle on small screens
    const labelOffset = Math.max(35 * scale, 44);
    return { chartSize, center, radius, labelOffset };
  }, [size]);

  // Helper to get mouse/touch position mapped to logical chart coordinates
  const getPointerPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): Point | null => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    let clientX, clientY;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Map visual click position to the logical 600x600 coordinate system used by the logic.
    // This fixes the issue where High DPI scaling or CSS resizing caused coordinates to be offset.
    const x = (clientX - rect.left) * (chartSize / rect.width);
    const y = (clientY - rect.top) * (chartSize / rect.height);

    return { x, y };
  };

  const getSliceIndex = (pos: Point): number => {
    const dx = pos.x - center;
    const dy = pos.y - center;
    
    let angle = Math.atan2(dy, dx); 
    // Normalize to 0 -> 2PI
    if (angle < 0) angle += 2 * Math.PI;

    // Adjust for chart rotation (-90deg offset in rendering)
    // The visual chart starts at -PI/2 (12 o'clock). 
    // Our math angle 0 is at 3 o'clock.
    // So visual 0 index is at -90deg.
    let chartAngle = angle + (Math.PI / 2);
    if (chartAngle >= 2 * Math.PI) chartAngle -= 2 * Math.PI;

    const sliceAngle = (2 * Math.PI) / data.length;
    return Math.floor(chartAngle / sliceAngle);
  };

  /**
   * Calculates the value based on the projection of the mouse vector onto the slice's center vector.
   * This ensures dragging feels like pulling along a track, rather than just distance from center.
   */
  const getValueForSlice = useCallback((pos: Point, index: number): number => {
    const dx = pos.x - center;
    const dy = pos.y - center;

    const sliceAngle = (2 * Math.PI) / data.length;
    // Calculate the angle of the center of the slice
    // Start offset is -PI/2
    const angleMiddle = -Math.PI / 2 + index * sliceAngle + sliceAngle / 2;

    const unitX = Math.cos(angleMiddle);
    const unitY = Math.sin(angleMiddle);

    // Dot product: Project mouse vector onto the slice direction vector
    const projectedDistance = dx * unitX + dy * unitY;

    // Only allow positive values (outward from center)
    const d = Math.max(0, projectedDistance);

    let value = Math.ceil((d / radius) * MAX_VALUE);
    if (value < 1) value = 1;
    if (value > MAX_VALUE) value = MAX_VALUE;
    
    return value;
  }, [center, data.length, radius]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (readOnly) return;
    const pos = getPointerPos(e);
    if (!pos) return;

    const index = getSliceIndex(pos);
    if (index >= 0 && index < data.length) {
      setActiveSliceIndex(index);
      const val = getValueForSlice(pos, index);
      onChange(data[index].id, val);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (activeSliceIndex === null) return;
    const pos = getPointerPos(e);
    if (!pos) return;

    // Use the locked activeSliceIndex to calculate value
    // This allows the user to drag "wide" of the slice but still control it comfortably
    const val = getValueForSlice(pos, activeSliceIndex);
    
    if (data[activeSliceIndex].value !== val) {
      onChange(data[activeSliceIndex].id, val);
    }
  };

  const onMouseUp = () => setActiveSliceIndex(null);
  const onMouseLeave = () => setActiveSliceIndex(null);

  // Touch handling
  const onTouchStart = (e: React.TouchEvent) => {
    if (readOnly) return;
    const pos = getPointerPos(e);
    if (!pos) return;

    const index = getSliceIndex(pos);
    if (index >= 0 && index < data.length) {
      setActiveSliceIndex(index);
      const val = getValueForSlice(pos, index);
      onChange(data[index].id, val);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (activeSliceIndex === null) return;
    // e.preventDefault(); // Controlled by style touch-action: none
    const pos = getPointerPos(e);
    if (!pos) return;

    const val = getValueForSlice(pos, activeSliceIndex);
    if (data[activeSliceIndex].value !== val) {
      onChange(data[activeSliceIndex].id, val);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${chartSize}px`;
    canvas.style.height = `${chartSize}px`;
    canvas.width = chartSize * dpr;
    canvas.height = chartSize * dpr;
    ctx.scale(dpr, dpr);

    // Clear and background
    ctx.clearRect(0, 0, chartSize, chartSize);
    ctx.fillStyle = '#fdfbf7';
    ctx.fillRect(0,0, chartSize, chartSize);

    const sliceAngle = (2 * Math.PI) / data.length;
    const startOffset = -Math.PI / 2;

    // 1. Draw Grid Lines
    for (let i = 2; i <= MAX_VALUE; i += 2) {
      const r = (radius / MAX_VALUE) * i;
      drawSketchyCircle(ctx, center, center, r, '#e5e7eb', true);
    }
    // Outer boundary
    drawSketchyCircle(ctx, center, center, radius, '#374151', false); 

    // 2. Draw Axis Lines
    for (let i = 0; i < data.length; i++) {
      const angle = startOffset + i * sliceAngle;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      drawSketchyLine(ctx, { x: center, y: center }, { x, y }, '#9ca3af', 1);
    }

    // 3. Draw Data Slices
    data.forEach((item, index) => {
      const angleStart = startOffset + index * sliceAngle;
      const angleEnd = angleStart + sliceAngle;
      const r = (radius / MAX_VALUE) * item.value;

      // Highlight active slice slightly
      const isActive = index === activeSliceIndex;
      const color = isActive ? item.color : item.color; // Could modify color if needed, but bold text is enough

      // Draw Slice
      drawScribbleSlice(ctx, {x: center, y: center}, r, angleStart, angleEnd, color);
      
      // Draw Value
      if (item.value >= 1) {
        const textAngle = angleStart + sliceAngle / 2;
        // Push text slightly out if value is very small to avoid crowding center
        let textDist = r - 15;
        if (item.value < 3) textDist = r + 15; 
        
        // Clamp text position within practical bounds
        if (textDist > radius) textDist = radius + 10;
        
        const tx = center + Math.cos(textAngle) * textDist;
        const ty = center + Math.sin(textAngle) * textDist;
        
        ctx.fillStyle = '#000';
        // Bold the active slice text
        ctx.font = isActive ? 'bold 22px "Patrick Hand"' : 'bold 16px "Patrick Hand"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.value.toString(), tx, ty);
      }
    });

    // 4. Draw Labels
    ctx.fillStyle = '#1f2937';
    
    data.forEach((item, index) => {
      const isActive = index === activeSliceIndex;
      ctx.font = isActive ? 'bold 22px "Patrick Hand"' : '20px "Patrick Hand"';
      
      const angle = startOffset + index * sliceAngle + sliceAngle / 2;
      const textWidth = ctx.measureText(item.label).width;
      // Push long labels a bit further out without overshooting
      const dynamicLabelOffset = labelOffset + textWidth * 0.1;
      const labelRadius = radius + dynamicLabelOffset; 
      const x = center + Math.cos(angle) * labelRadius;
      const y = center + Math.sin(angle) * labelRadius;

      ctx.save();
      ctx.textAlign = 'center';
      
      // Keep labels inside canvas bounds so text like "Growth" isn't clipped
      const padding = 16;
      let drawX = x;

      if (drawX - textWidth / 2 < padding) drawX = padding + textWidth / 2;
      if (drawX + textWidth / 2 > chartSize - padding) drawX = chartSize - padding - textWidth / 2;

      ctx.translate(drawX, y);
      ctx.fillText(item.label, 0, 0);
      ctx.restore();
    });

  }, [activeSliceIndex, chartSize, data, getValueForSlice, labelOffset, radius, center]);

  return (
    <div className="relative touch-none select-none flex justify-center items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
        className={`max-w-full h-auto ${activeSliceIndex !== null ? 'cursor-grabbing' : 'cursor-crosshair'}`}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default BalanceChart;
