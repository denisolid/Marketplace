export function calculatePercentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

export function calculateValue(percentage: number, min: number, max: number, step: number): number {
  const rawValue = (percentage / 100) * (max - min) + min;
  const steppedValue = Math.round(rawValue / step) * step;
  return Math.max(min, Math.min(max, steppedValue));
}

export function getClientPosition(event: MouseEvent | TouchEvent): number {
  return 'touches' in event ? event.touches[0].clientX : event.clientX;
}