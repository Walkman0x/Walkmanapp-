import React from 'react';

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume }) => {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-4 h-4 text-walkman-gray" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793z" clipRule="evenodd"/>
      </svg>
      
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full h-2 bg-walkman-gray rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #DC143C 0%, #DC143C ${volume}%, #2C2C2C ${volume}%, #2C2C2C 100%)`
          }}
        />
      </div>
      
      <div className="text-xs text-walkman-gray font-mono w-8 text-right">
        {volume}
      </div>
    </div>
  );
};