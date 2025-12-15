import { Point } from '../types';

/**
 * Adds a "shake" to a number to simulate hand-drawing imperfection
 */
const rough = (val: number, intensity: number = 1.5) => {
  return val + (Math.random() - 0.5) * intensity;
};

/**
 * Draws a "sketchy" line between two points
 */
export const drawSketchyLine = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  color: string,
  width: number = 2
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw main stroke
  ctx.moveTo(rough(p1.x), rough(p1.y));
  ctx.lineTo(rough(p2.x), rough(p2.y));
  ctx.stroke();

  // Draw a second lighter stroke for the "sketch" effect
  ctx.beginPath();
  ctx.lineWidth = width * 0.7;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.6;
  ctx.moveTo(rough(p1.x, 3), rough(p1.y, 3));
  ctx.lineTo(rough(p2.x, 3), rough(p2.y, 3));
  ctx.stroke();
  ctx.globalAlpha = 1.0;
};

/**
 * Draws a "sketchy" circle
 */
export const drawSketchyCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
  dashed: boolean = false
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = dashed ? 1.5 : 2;
  if (dashed) ctx.setLineDash([10, 10]);
  
  // Approximate circle with bezier or many small lines for roughness
  const steps = 40;
  const stepAngle = (Math.PI * 2) / steps;
  
  for (let i = 0; i <= steps; i++) {
    const angle = i * stepAngle;
    const px = x + Math.cos(angle) * (r + (Math.random() - 0.5) * 2);
    const py = y + Math.sin(angle) * (r + (Math.random() - 0.5) * 2);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  
  ctx.stroke();
  ctx.setLineDash([]);
};

/**
 * Fills a slice with a "scribble" pattern
 */
export const drawScribbleSlice = (
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string
) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.arc(center.x, center.y, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.clip(); // Clip to the slice shape

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;

  // Scribble lines
  const bounds = radius * 2;
  // Scribble density
  const density = 6; 
  
  ctx.beginPath();
  for (let i = -bounds; i < bounds; i += density) {
    // Randomize angle of scribble slightly per slice
    const offset = Math.random() * 5;
    const x1 = center.x - radius + offset; 
    const y1 = center.y - radius + i + (Math.random() * 5);
    const x2 = center.x + radius + offset; 
    const y2 = center.y - radius + i + (Math.random() * 5) - 20; // Angled scribble

    // Draw rough line inside clip
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
  
  ctx.restore();
  
  // Draw outline of the slice
  ctx.beginPath();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.moveTo(center.x, center.y);
  // Line to arc start
  ctx.lineTo(
    center.x + Math.cos(startAngle) * radius,
    center.y + Math.sin(startAngle) * radius
  );
  // Arc
  // We manually draw arc roughly
  const arcSteps = 10;
  for(let i=0; i<=arcSteps; i++) {
     const a = startAngle + (endAngle - startAngle) * (i/arcSteps);
     const rNoise = rough(radius, 2);
     ctx.lineTo(center.x + Math.cos(a) * rNoise, center.y + Math.sin(a) * rNoise);
  }
  // Line back to center
  ctx.lineTo(center.x, center.y);
  ctx.stroke();
};
