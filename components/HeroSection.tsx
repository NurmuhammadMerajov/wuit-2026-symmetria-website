'use client';

import React, { useState, useEffect } from 'react';

export interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Symmetria Hero Section"
      className={`relative min-h-screen w-full flex flex-col justify-between items-center bg-[#0a0e17] text-slate-100 overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-16 select-none ${className}`}
    >
      {/* ================= BACKGROUND GRID & RADIAL GLOW ================= */}
      {/* Radial ambient glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(6,182,212,0.18),transparent_75%)]" 
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.12),transparent_70%)]" 
        aria-hidden="true"
      />

      {/* Cybernetic High-Tech Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle CCTV Scanlines Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.7) 2px, rgba(0, 0, 0, 0.7) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Animated CCTV Scanning Laser Line */}
      <div 
        className="pointer-events-none absolute left-0 right-0 z-10 h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-70 animate-scanline"
        style={{
          animationDuration: '6s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        }}
        aria-hidden="true"
      />

      {/* ================= CCTV HUD CORNER RETICLES ================= */}
      <div className="pointer-events-none absolute top-6 left-6 z-20 hidden sm:flex flex-col gap-1 text-[10px] font-mono text-cyan-500/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          <span>CAM-01 // LAT: 37.7749° N</span>
        </div>
        <div className="pl-3 text-slate-500 text-[9px]">SENSORS_ARMED: 100%</div>
      </div>

      <div className="pointer-events-none absolute top-6 right-6 z-20 hidden sm:flex flex-col items-end gap-1 text-[10px] font-mono text-cyan-500/70">
        <div className="flex items-center gap-1.5">
          <span>FEED: ENCRYPTED_H265</span>
          <span className="w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
        </div>
        <div className="pr-3 text-slate-500 text-[9px]">{timestamp || 'LIVE_FEED_CONNECTING'}</div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden sm:flex items-end gap-1.5 text-[10px] font-mono text-cyan-500/50">
        <span className="w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
        <span>SYS: ONLINE // BUFFER: OK</span>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden sm:flex items-end gap-1.5 text-[10px] font-mono text-cyan-500/50">
        <span>INFERENCE_ENGINE: v2.4.0</span>
        <span className="w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
      </div>

      {/* ================= TOP SURVEILLANCE STATUS PILL ================= */}
      <div className="relative z-20 pt-4 md:pt-8 w-full flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gray-900/90 border border-cyan-500/30 backdrop-blur-md text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400/60 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_#ef4444]" />
          </span>
          <span className="text-red-400 font-semibold uppercase tracking-widest text-[11px]">REC</span>
          <span className="text-gray-600">|</span>
          <span className="text-cyan-400 font-medium">NEURAL SURVEILLANCE LIVE</span>
          <span className="text-gray-600 hidden xs:inline">|</span>
          <span className="text-slate-400 hidden xs:inline text-[11px]">FOV: 120° DUAL-SENSOR</span>
        </div>
      </div>

      {/* ================= CENTER HERO CONTENT ================= */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto my-auto px-2">
        {/* Optical Target Bracket Icon */}
        <div className="mb-4 inline-flex items-center justify-center p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
            <path strokeWidth="1.5" strokeLinecap="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
          </svg>
          <span className="ml-2 text-xs font-mono uppercase tracking-widest text-cyan-300">
            Automated Traffic Intelligence
          </span>
        </div>

        {/* Main Title: SYMMETRIA */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-extrabold tracking-tighter uppercase drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
            SYMMETRIA
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-slate-300 max-w-2xl font-sans">
          AI-Powered Traffic Event Detection
        </h2>

        {/* Brief description */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-sans font-normal">
          Harnessing computer vision and deep convolutional neural networks to continuously detect, 
          classify, and pinpoint critical traffic events in real-time — turning ubiquitous urban camera 
          streams into actionable safety telemetry.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary CTA: Try Demo */}
          <button
            type="button"
            onClick={() => handleScroll('demo')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm sm:text-base font-semibold font-mono tracking-wide text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:shadow-[0_0_35px_rgba(6,182,212,0.85)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
          >
            {/* Gloss shine reflection on hover */}
            <span 
              className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" 
              aria-hidden="true"
            />
            <svg
              className="w-4 h-4 mr-2 text-black transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <polygon points="5 3 19 10 5 17 5 3" />
            </svg>
            <span>Try Demo</span>
          </button>

          {/* Secondary CTA: View Report */}
          <button
            type="button"
            onClick={() => handleScroll('report')}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm sm:text-base font-semibold font-mono tracking-wide text-cyan-300 hover:text-white bg-gray-900/80 hover:bg-gray-800/90 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-2 text-cyan-400 group-hover:text-cyan-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>View Report</span>
          </button>
        </div>
      </div>

      {/* ================= STATS ROW AT BOTTOM ================= */}
      <div className="relative z-20 w-full max-w-5xl mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {/* Stat 1 */}
          <div className="group relative bg-[#111827]/80 hover:bg-[#111827] border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Classification Matrix
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              4 Event Types
            </div>
            <p className="mt-1 text-xs text-slate-400 font-sans">
              Accidents, congestion, stalled vehicles &amp; lane violations
            </p>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-500/40">
              #01
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group relative bg-[#111827]/80 hover:bg-[#111827] border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Model Precision
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
              95% Accuracy
            </div>
            <p className="mt-1 text-xs text-slate-400 font-sans">
              Validated on edge-case CCTV weather &amp; nocturnal streams
            </p>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-500/40">
              #02
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group relative bg-[#111827]/80 hover:bg-[#111827] border border-gray-800 hover:border-cyan-500/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Processing Speed
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              Real-time
            </div>
            <p className="mt-1 text-xs text-slate-400 font-sans">
              Sub-35ms pipeline latency running on TensorRT edge accelerators
            </p>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-500/40">
              #03
            </div>
          </div>
        </div>

        {/* Scroll indicator chevron */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => handleScroll('demo')}
            aria-label="Scroll to demo section"
            className="text-slate-500 hover:text-cyan-400 transition-colors duration-200 cursor-pointer animate-bounce p-1 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
