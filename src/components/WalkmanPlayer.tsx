import React, { useState, useEffect } from 'react';
import { PlayButton } from './PlayButton';
import { TapeDisplay } from './TapeDisplay';
import { VolumeControl } from './VolumeControl';
import { RadioDisplay } from './RadioDisplay';

export const WalkmanPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRadioMode, setIsRadioMode] = useState(false);
  const [frequency, setFrequency] = useState(101.5);

  const currentSong = {
    title: "Summer Breeze",
    artist: "Retro Waves",
    duration: 240
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isRadioMode) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isRadioMode, currentSong.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleFastForward = () => {
    setCurrentTime(Math.min(currentSong.duration, currentTime + 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="relative">
        {/* Main Walkman Body */}
        <div className="bg-gradient-to-b from-walkman-yellow to-walkman-orange rounded-3xl p-8 shadow-retro border-4 border-walkman-silver max-w-md w-full">
          
          {/* Brand Label */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-walkman-gray font-retro tracking-wider">
              WALKMAN
            </h1>
            <div className="text-xs text-walkman-gray opacity-70 font-mono">
              STEREO CASSETTE PLAYER
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-4">
            <div className="bg-walkman-gray rounded-full p-1 flex">
              <button
                onClick={() => setIsRadioMode(false)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  !isRadioMode 
                    ? 'bg-walkman-red text-white shadow-pressed' 
                    : 'text-walkman-silver hover:bg-gray-600'
                }`}
              >
                TAPE
              </button>
              <button
                onClick={() => setIsRadioMode(true)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isRadioMode 
                    ? 'bg-walkman-red text-white shadow-pressed' 
                    : 'text-walkman-silver hover:bg-gray-600'
                }`}
              >
                RADIO
              </button>
            </div>
          </div>

          {/* Display Area */}
          <div className="bg-black rounded-lg p-4 mb-6 border-2 border-walkman-gray">
            {isRadioMode ? (
              <RadioDisplay 
                frequency={frequency} 
                setFrequency={setFrequency}
                isPlaying={isPlaying}
              />
            ) : (
              <TapeDisplay 
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={currentSong.duration}
                title={currentSong.title}
                artist={currentSong.artist}
              />
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <button
              onClick={handleRewind}
              className="bg-walkman-gray hover:bg-gray-600 text-white p-3 rounded-full shadow-button hover:shadow-pressed transition-all active:scale-95"
              disabled={isRadioMode}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
              </svg>
            </button>

            <PlayButton 
              isPlaying={isPlaying} 
              onToggle={handlePlayPause}
              size="large"
            />

            <button
              onClick={handleStop}
              className="bg-walkman-gray hover:bg-gray-600 text-white p-3 rounded-full shadow-button hover:shadow-pressed transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"/>
              </svg>
            </button>

            <button
              onClick={handleFastForward}
              className="bg-walkman-gray hover:bg-gray-600 text-white p-3 rounded-full shadow-button hover:shadow-pressed transition-all active:scale-95"
              disabled={isRadioMode}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z"/>
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <VolumeControl volume={volume} setVolume={setVolume} />

          {/* Progress Bar (Tape Mode Only) */}
          {!isRadioMode && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-walkman-gray mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
              <div className="w-full bg-walkman-gray rounded-full h-2">
                <div 
                  className="bg-walkman-red h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Headphone Wire */}
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-1 h-32 bg-black rounded-full opacity-60"></div>
          <div className="w-8 h-8 bg-black rounded-full mt-2 opacity-60 flex items-center justify-center">
            <div className="w-4 h-4 bg-walkman-silver rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};