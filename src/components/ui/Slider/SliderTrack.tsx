import { SliderTrackProps } from './types';

export function SliderTrack({ startPercentage, endPercentage }: SliderTrackProps) {
  return (
    <div 
      className="absolute h-full rounded-full bg-black"
      style={{ 
        left: `${startPercentage}%`,
        width: `${endPercentage - startPercentage}%` 
      }}
    />
  );
}