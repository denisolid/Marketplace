import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onChange: (value: number[]) => void;
  className?: string;
}

export function Slider({ 
  min, 
  max, 
  step = 1,
  value,
  onChange,
  className 
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
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
    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(index);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current || activeThumb === null) return;

    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, 
      ((e.clientX - rect.left) / rect.width) * 100
    ));
    
    const newValue = calculateValue(percentage);
    const updatedValue = [...value];
    
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

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={trackRef}
      className={cn(
        'relative h-2 w-full rounded-full bg-gray-200',
        className
      )}
    >
      {/* Track fill */}
      <div 
        className="absolute h-full rounded-full bg-black"
        style={{ 
          left: `${calculatePercentage(value[0])}%`,
          width: `${calculatePercentage(value[1]) - calculatePercentage(value[0])}%` 
        }}
      />

      {/* Thumbs */}
      {value.map((_, index) => (
        <div
          key={index}
          onMouseDown={handleMouseDown(index)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 h-4 w-4',
            'rounded-full bg-white border border-gray-300',
            'shadow-sm cursor-pointer transition-transform',
            isDragging && activeThumb === index && 'scale-110'
          )}
          style={{ 
            left: `calc(${calculatePercentage(value[index])}% - 0.5rem)` 
          }}
        />
      ))}
    </div>
  );
}