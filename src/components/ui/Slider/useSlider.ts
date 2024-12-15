import { useState, useCallback, useRef } from 'react';
import { calculateValue, getClientPosition } from './utils';

interface UseSliderProps {
  min: number;
  max: number;
  step: number;
  onChange: (value: [number, number]) => void;
  value: [number, number];
}

export function useSlider({ min, max, step, onChange, value }: UseSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [startValue, endValue] = value;

  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging || !trackRef.current || activeThumb === null) return;

    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const clientX = getClientPosition(event);
    
    const percentage = Math.max(0, Math.min(100, 
      ((clientX - rect.left) / rect.width) * 100
    ));
    
    const newValue = calculateValue(percentage, min, max, step);

    if (activeThumb === 0) {
      onChange([Math.min(newValue, endValue), endValue]);
    } else {
      onChange([startValue, Math.max(newValue, startValue)]);
    }
  }, [isDragging, activeThumb, min, max, step, onChange, startValue, endValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveThumb(null);
  }, []);

  const startDragging = useCallback((index: number) => {
    setIsDragging(true);
    setActiveThumb(index);
  }, []);

  return {
    isDragging,
    trackRef,
    handleMove,
    handleMouseUp,
    startDragging,
    activeThumb
  };
}