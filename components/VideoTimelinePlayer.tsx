'use client';

import React, { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';

export interface TimelineEvent {
  id: number;
  type: string;
  confidence: number;
  start_time: number;
  end_time: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

interface VideoTimelinePlayerProps {
  videoSrc?: string;
  events: TimelineEvent[];
  duration: number;
}

export default function VideoTimelinePlayer({ videoSrc, events, duration }: VideoTimelinePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
      animId = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      setCurrentTime(newTime);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const seekTo = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onEnded = () => setIsPlaying(false);
      video.addEventListener('ended', onEnded);
      return () => {
        video.removeEventListener('ended', onEnded);
      };
    }
  }, []);

  const getSeverityColor = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-cyan-500';
    }
  };

  const activeEvent = events.find(e => currentTime >= e.start_time && currentTime <= e.end_time);

  return (
    <div ref={containerRef} className="flex flex-col bg-[#111827] border border-cyan-900/50 rounded-lg overflow-hidden shadow-2xl shadow-cyan-900/20">
      {/* Video Area */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            onClick={togglePlay}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-mono text-sm tracking-widest uppercase">Sample Video Placeholder</p>
          </div>
        )}
        
        {/* Play overlay for video */}
        {videoSrc && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
              <svg className="w-10 h-10 text-cyan-400 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Controls Area */}
      <div className="p-4 bg-[#0f1523] flex flex-col gap-3 border-t border-slate-800">
        
        {/* Timeline Event Bar */}
        <div className="relative h-6 bg-[#0a0e17] rounded cursor-pointer overflow-hidden group">
          <div 
            className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_24px,#1f2937_25px)] bg-[size:25px_100%]"
          />
          {events.map((event) => {
            const left = (event.start_time / duration) * 100;
            const width = ((event.end_time - event.start_time) / duration) * 100;
            
            return (
              <div
                key={event.id}
                className={`absolute h-full ${getSeverityColor(event.severity)} opacity-60 hover:opacity-100 transition-opacity z-10 border-r border-l border-black/20`}
                style={{ left: `${left}%`, width: `${width}%` }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => seekTo(event.start_time)}
              />
            );
          })}
          
          {/* Playhead indicator on event timeline */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-cyan-400 z-20 shadow-[0_0_8px_#22d3ee]"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Hover Tooltip */}
          {hoveredEvent && (
            <div 
              className="absolute top-0 transform -translate-y-full -mt-2 bg-[#111827] border border-cyan-900 p-2 rounded text-xs z-30 shadow-xl pointer-events-none min-w-[200px]"
              style={{ left: `${(hoveredEvent.start_time / duration) * 100}%` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${getSeverityColor(hoveredEvent.severity)}`} />
                <span className="font-bold text-slate-200 uppercase tracking-wider">{hoveredEvent.type.replace('_', ' ')}</span>
              </div>
              <div className="font-mono text-slate-400 mb-1">
                {formatTime(hoveredEvent.start_time)} - {formatTime(hoveredEvent.end_time)}
              </div>
              <div className="text-cyan-400 font-mono">Conf: {(hoveredEvent.confidence * 100).toFixed(1)}%</div>
            </div>
          )}
        </div>

        {/* Standard Progress Bar */}
        <div 
          ref={progressBarRef}
          className="relative h-2 bg-slate-800 rounded cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute h-full bg-cyan-500 rounded-l transition-all duration-75 ease-linear"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div 
            className="absolute h-3 w-3 bg-white rounded-full -mt-0.5 shadow-[0_0_10px_#22d3ee] scale-0 group-hover:scale-100 transition-transform"
            style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
          />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            
            <div className="font-mono text-sm text-slate-300 tracking-wider">
              {formatTime(currentTime)} <span className="text-slate-600">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Event Legend & Chips */}
      <div className="p-4 bg-[#0a0e17] border-t border-slate-800">
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Detected Events</h4>
        <div className="flex flex-wrap gap-2">
          {events.map(event => {
            const isActive = activeEvent?.id === event.id;
            return (
              <button
                key={event.id}
                onClick={() => seekTo(event.start_time)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded bg-[#111827] border transition-all ${
                  isActive 
                    ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${getSeverityColor(event.severity)} ${isActive ? 'animate-pulse' : ''}`} />
                <span className={`text-xs font-mono uppercase tracking-wider ${isActive ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {event.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {formatTime(event.start_time)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
