import { SliderThumbProps } from './types';

export function SliderThumb({ position, isDragging }: SliderThumbProps) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border border-gray-300 shadow-sm cursor-pointer ${
        isDragging ? 'scale-110' : ''
      } transition-transform`}
      style={{ left: `calc(${position}% - 0.5rem)` }}
    />
  );
}