// import React from 'react';
// import { Volume2, VolumeX, Pause } from 'lucide-react';

// interface SpeakerButtonProps {
//   isPlaying: boolean;
//   isPaused: boolean;
//   onToggle: () => void;
//   onStop?: () => void;
//   className?: string;
//   showStopButton?: boolean;
// }

// export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
//   isPlaying,
//   isPaused,
//   onToggle,
//   onStop,
//   className = '',
//   showStopButton = true
// }) => {
//   return (
//     <div className={`flex items-center gap-2 ${className}`}>
//       <button
//         onClick={onToggle}
//         className={`p-2 rounded-full transition-all duration-200 ${
//           isPlaying
//             ? 'bg-blue-500 hover:bg-blue-600 text-white scale-110'
//             : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//         }`}
//         title={isPlaying ? 'Pause reading' : isPaused ? 'Resume reading' : 'Read aloud'}
//       >
//         {isPlaying ? (
//           <Pause className="w-5 h-5" />
//         ) : (
//           <Volume2 className="w-5 h-5" />
//         )}
//       </button>
      
//       {(isPlaying || isPaused) && showStopButton && onStop && (
//         <button
//           onClick={onStop}
//           className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200"
//           title="Stop reading"
//         >
//           <VolumeX className="w-5 h-5" />
//         </button>
//       )}
      
//       {isPlaying && (
//         <span className="text-xs text-blue-600 font-medium animate-pulse">
//           Reading...
//         </span>
//       )}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Volume2, VolumeX, Pause, Play, Settings, X } from 'lucide-react';

interface SpeakerButtonProps {
  isPlaying: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onStop?: () => void;
  className?: string;
  showStopButton?: boolean;
  // New props for voice and speed
  availableVoices?: SpeechSynthesisVoice[];
  currentVoice?: SpeechSynthesisVoice | null;
  speed?: number;
  onVoiceChange?: (voice: SpeechSynthesisVoice) => void;
  onSpeedChange?: (speed: number) => void;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  isPlaying,
  isPaused,
  onToggle,
  onStop,
  className = '',
  showStopButton = true,
  availableVoices = [],
  currentVoice = null,
  speed = 1.0,
  onVoiceChange,
  onSpeedChange,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  // Filter for better voice selection (prioritize female voices)
  const femaleVoices = availableVoices.filter(
    voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('victoria') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('susan') ||
      voice.lang.includes('en')
  );

  const maleVoices = availableVoices.filter(
    voice => 
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('man') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('alex')
  );

  const otherVoices = availableVoices.filter(
    voice => !femaleVoices.includes(voice) && !maleVoices.includes(voice)
  );

  const speedOptions = [
    { label: '0.5x (Very Slow)', value: 0.5 },
    { label: '0.75x (Slow)', value: 0.75 },
    { label: '1x (Normal)', value: 1.0 },
    { label: '1.25x (Fast)', value: 1.25 },
    { label: '1.5x (Very Fast)', value: 1.5 },
    { label: '2x (Maximum)', value: 2.0 },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Main play/pause button */}
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

      {/* Settings button */}
      {(availableVoices && availableVoices.length > 0 || onSpeedChange) && (
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
          title="Voice & Speed Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}
      
      {/* Stop button */}
      {(isPlaying || isPaused) && showStopButton && onStop && (
        <button
          onClick={onStop}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200"
          title="Stop reading"
        >
          <VolumeX className="w-5 h-5" />
        </button>
      )}
      
      {/* Reading indicator */}
      {isPlaying && (
        <span className="text-xs text-blue-600 font-medium animate-pulse">
          Reading...
        </span>
      )}

      {/* Settings Popup */}
      {showSettings && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowSettings(false)}
          />
          
          {/* Settings Panel */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 w-96 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                Voice & Speed Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Speed Control */}
            {onSpeedChange && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Reading Speed
                </label>
                <div className="space-y-2">
                  {speedOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSpeedChange(option.value);
                        // Don't close settings, let user adjust multiple times
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        speed === option.value
                          ? 'bg-blue-500 text-white font-semibold shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Voice Selection */}
            {onVoiceChange && availableVoices.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Voice Selection
                </label>
                
                {/* Female Voices */}
                {femaleVoices.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                      Female Voices
                    </p>
                    <div className="space-y-1">
                      {femaleVoices.map((voice, index) => (
                        <button
                          key={`female-${index}`}
                          onClick={() => {
                            onVoiceChange(voice);
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                            currentVoice?.name === voice.name
                              ? 'bg-pink-500 text-white font-semibold shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-pink-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{voice.name}</span>
                            <span className="text-xs opacity-70">{voice.lang}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Male Voices */}
                {maleVoices.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                      Male Voices
                    </p>
                    <div className="space-y-1">
                      {maleVoices.map((voice, index) => (
                        <button
                          key={`male-${index}`}
                          onClick={() => {
                            onVoiceChange(voice);
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                            currentVoice?.name === voice.name
                              ? 'bg-blue-500 text-white font-semibold shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{voice.name}</span>
                            <span className="text-xs opacity-70">{voice.lang}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Voices */}
                {otherVoices.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                      Other Voices
                    </p>
                    <div className="space-y-1">
                      {otherVoices.slice(0, 5).map((voice, index) => (
                        <button
                          key={`other-${index}`}
                          onClick={() => {
                            onVoiceChange(voice);
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                            currentVoice?.name === voice.name
                              ? 'bg-purple-500 text-white font-semibold shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{voice.name}</span>
                            <span className="text-xs opacity-70">{voice.lang}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Current Selection Display */}
            {currentVoice && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Currently Selected:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {currentVoice.name} ({speed}x)
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};