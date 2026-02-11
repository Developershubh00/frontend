import React from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';

interface SpeakerButtonProps {
  isPlaying: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onStop?: () => void;
  className?: string;
  showStopButton?: boolean;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  isPlaying,
  isPaused,
  onToggle,
  onStop,
  className = '',
  showStopButton = true
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onToggle}
        className={`p-2 rounded-full transition-all duration-200 ${
          isPlaying
            ? 'bg-blue-500 hover:bg-blue-600 text-white scale-110'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        title={isPlaying ? 'Pause reading' : isPaused ? 'Resume reading' : 'Read aloud'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      
      {(isPlaying || isPaused) && showStopButton && onStop && (
        <button
          onClick={onStop}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200"
          title="Stop reading"
        >
          <VolumeX className="w-5 h-5" />
        </button>
      )}
      
      {isPlaying && (
        <span className="text-xs text-blue-600 font-medium animate-pulse">
          Reading...
        </span>
      )}
    </div>
  );
};