import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
}

export function Slider({ 
  min, 
  max, 
  value,
  onChange,
  step = 1,
  className 
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const calculatePercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const calculateValue = (percentage: number) => {
    const rawValue = (percentage / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    setIsDragging(true);
    setActiveThumb(index);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || activeThumb === null) return;

    const slider = e.currentTarget as HTMLDivElement;
    const rect = slider.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, 
      ((e.clientX - rect.left) / rect.width) * 100
    ));
    
    const newValue = calculateValue(percentage);
    const updatedValue = [...value] as [number, number];
    updatedValue[activeThumb] = newValue;

    if (activeThumb === 0) {
      updatedValue[0] = Math.min(newValue, value[1] - step);
    } else {
      updatedValue[1] = Math.max(newValue, value[0] + step);
    }

    onChange(updatedValue);
  }, [isDragging, activeThumb, value, min, max, step, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveThumb(null);
  }, []);

  const leftThumbPosition = calculatePercentage(value[0]);
  const rightThumbPosition = calculatePercentage(value[1]);

  return (
    <div 
      className={cn(
        'relative h-2 w-full rounded-full bg-gray-200',
        className
      )}
    >
      {/* Track */}
      <div 
        className="absolute h-full rounded-full bg-black"
        style={{ 
          left: `${leftThumbPosition}%`,
          width: `${rightThumbPosition - leftThumbPosition}%` 
        }}
      />

      {/* Thumbs */}
      {[leftThumbPosition, rightThumbPosition].map((position, index) => (
        <div
          key={index}
          onMouseDown={handleMouseDown(index)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 h-4 w-4',
            'rounded-full bg-white border border-gray-300',
            'shadow-sm cursor-pointer transition-transform',
            isDragging && activeThumb === index && 'scale-110'
          )}
          style={{ left: `calc(${position}% - 0.5rem)` }}
        />
      ))}
    </div>
  );
}