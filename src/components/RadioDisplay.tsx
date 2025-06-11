import React from 'react';

interface RadioDisplayProps {
  frequency: number;
  setFrequency: (freq: number) => void;
  isPlaying: boolean;
}

export const RadioDisplay: React.FC<RadioDisplayProps> = ({
  frequency,
  setFrequency,
  isPlaying
}) => {
  const handleFrequencyChange = (direction: 'up' | 'down') => {
    const step = 0.1;
    const newFreq = direction === 'up' 
      ? Math.min(108.0, frequency + step)
      : Math.max(88.0, frequency - step);
    setFrequency(Math.round(newFreq * 10) / 10);
  };

  const stations = [
    { freq: 89.5, name: 'RETRO FM' },
    { freq: 92.3, name: 'CLASSIC HITS' },
    { freq: 95.7, name: 'GOLDEN OLDIES' },
    { freq: 98.1, name: 'VINTAGE VIBES' },
    { freq: 101.5, name: 'NOSTALGIA 101' },
    { freq: 104.9, name: 'THROWBACK' },
    { freq: 107.2, name: 'MEMORIES FM' }
  ];

  const currentStation = stations.find(station => 
    Math.abs(station.freq - frequency) < 0.2
  );

  return (
    <div className="text-center">
      {/* Frequency Display */}
      <div className="mb-4">
        <div className="text-3xl font-mono text-walkman-red font-bold">
          {frequency.toFixed(1)}
        </div>
        <div className="text-xs text-walkman-silver">MHz FM</div>
      </div>

      {/* Station Info */}
      <div className="mb-4 h-12 flex items-center justify-center">
        {currentStation ? (
          <div className="text-walkman-silver">
            <div className="text-sm font-bold">{currentStation.name}</div>
            <div className={`text-xs mt-1 flex items-center justify-center gap-1 ${
              isPlaying ? 'animate-pulse' : ''
            }`}>
              <div className={`w-1 h-1 rounded-full ${
                isPlaying ? 'bg-walkman-red' : 'bg-walkman-silver opacity-50'
              }`}></div>
              <span>{isPlaying ? 'ON AIR' : 'TUNED'}</span>
            </div>
          </div>
        ) : (
          <div className="text-walkman-silver opacity-50">
            <div className="text-sm">~ STATIC ~</div>
            <div className="text-xs mt-1">No Signal</div>
          </div>
        )}
      </div>

      {/* Tuning Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => handleFrequencyChange('down')}
          className="bg-walkman-gray hover:bg-gray-600 text-walkman-silver px-3 py-1 rounded text-xs font-bold transition-all active:scale-95"
        >
          ◀ TUNE
        </button>
        
        <div className="flex-1 h-1 bg-walkman-gray rounded relative">
          <div 
            className="absolute top-0 h-full w-1 bg-walkman-red rounded transition-all"
            style={{ left: `${((frequency - 88) / (108 - 88)) * 100}%` }}
          ></div>
        </div>
        
        <button
          onClick={() => handleFrequencyChange('up')}
          className="bg-walkman-gray hover:bg-gray-600 text-walkman-silver px-3 py-1 rounded text-xs font-bold transition-all active:scale-95"
        >
          TUNE ▶
        </button>
      </div>

      {/* Signal Strength */}
      <div className="mt-3 flex justify-center items-center gap-1">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`w-1 rounded-full transition-all ${
              currentStation && isPlaying && bar <= 4
                ? 'bg-walkman-red h-3'
                : currentStation && bar <= 2
                ? 'bg-walkman-silver h-2'
                : 'bg-walkman-gray h-1'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};