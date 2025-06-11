import React from 'react';

interface TapeDisplayProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  title: string;
  artist: string;
}

export const TapeDisplay: React.FC<TapeDisplayProps> = ({
  isPlaying,
  currentTime,
  duration,
  title,
  artist
}) => {
  return (
    <div className="text-center">
      {/* Tape Reels */}
      <div className="flex justify-center items-center gap-8 mb-4">
        <div className={`w-12 h-12 border-4 border-walkman-silver rounded-full flex items-center justify-center ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}>
          <div className="w-6 h-6 bg-walkman-silver rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-walkman-gray rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1 h-1 bg-walkman-silver relative">
          <div className={`absolute top-0 left-0 h-full bg-walkman-red transition-all ${
            isPlaying ? 'animate-pulse' : ''
          }`} style={{ width: `${(currentTime / duration) * 100}%` }}></div>
        </div>
        
        <div className={`w-12 h-12 border-4 border-walkman-silver rounded-full flex items-center justify-center ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}>
          <div className="w-6 h-6 bg-walkman-silver rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-walkman-gray rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="text-walkman-silver">
        <div className="text-lg font-bold mb-1 truncate">{title}</div>
        <div className="text-sm opacity-80 truncate">{artist}</div>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex justify-center items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          isPlaying ? 'bg-walkman-red animate-pulse' : 'bg-walkman-silver opacity-50'
        }`}></div>
        <span className="text-xs text-walkman-silver font-mono">
          {isPlaying ? 'PLAYING' : 'STOPPED'}
        </span>
      </div>
    </div>
  );
};