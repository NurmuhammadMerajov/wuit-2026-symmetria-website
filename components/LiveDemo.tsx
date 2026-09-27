'use client';

import React, { useState, useRef, useEffect } from 'react';
import RiskScoreChart from './RiskScoreChart';
import EventTable from './EventTable';

export default function LiveDemo() {
  const [state, setState] = useState<'idle' | 'uploaded' | 'analyzing' | 'results'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const phases = [
    'Detecting objects...',
    'Extracting features...',
    'Classifying events...',
    'Computing risk scores...'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (validTypes.includes(file.type) || ['mp4', 'avi', 'mov'].includes(extension || '')) {
      setFile(file);
      setError(null);
      setState('uploaded');
    } else {
      setError('Invalid file type. Please upload .mp4, .avi, or .mov');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    setState('analyzing');
    setProgress(0);
    setPhaseIndex(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'analyzing') {
      const totalTime = 4000;
      const step = 50;
      const totalSteps = totalTime / step;
      let currentStep = 0;

      interval = setInterval(() => {
        currentStep++;
        const newProgress = (currentStep / totalSteps) * 100;
        setProgress(newProgress);
        setPhaseIndex(Math.min(Math.floor((currentStep / totalSteps) * phases.length), phases.length - 1));

        if (currentStep >= totalSteps) {
          clearInterval(interval);
          setState('results');
        }
      }, step);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state, phases.length]);

  return (
    <section id="demo" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
          <span className="text-cyan-400">LIVE</span> DEMO
        </h2>
        <p className="text-slate-400 text-lg">Upload a video for AI-powered traffic analysis</p>
      </div>

      {state === 'idle' && (
        <div 
          className={`relative max-w-2xl mx-auto border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-cyan-400 bg-cyan-950/20' 
              : 'border-gray-600 bg-[#111827] hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".mp4,.avi,.mov"
            className="hidden"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg className={`w-16 h-16 ${dragActive ? 'text-cyan-400' : 'text-gray-400'} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-slate-200 text-xl font-medium">
              Drag & drop your video file here
            </div>
            <div className="text-slate-400">or</div>
            <button 
              onClick={() => inputRef.current?.click()}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-slate-200 rounded-lg transition-colors font-medium border border-gray-700"
            >
              click to browse
            </button>
            <div className="text-sm text-slate-500 mt-4">
              Supports .mp4, .avi, .mov
            </div>
            {error && (
              <div className="text-red-400 text-sm mt-2 bg-red-950/30 px-3 py-1 rounded-md border border-red-900/50">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {state === 'uploaded' && file && (
        <div className="max-w-2xl mx-auto bg-[#111827] border border-gray-800 rounded-xl p-8 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-cyan-950/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-900/50">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-slate-200 mb-1">{file.name}</h3>
          <p className="text-slate-400 mb-8">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setState('idle')}
              className="px-6 py-2.5 bg-transparent border border-gray-700 text-slate-300 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={startAnalysis}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg transition-colors font-semibold shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              Analyze Video
            </button>
          </div>
        </div>
      )}

      {state === 'analyzing' && (
        <div className="max-w-2xl mx-auto bg-[#111827] border border-gray-800 rounded-xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 animate-pulse rounded-xl"></div>
          <h3 className="text-2xl font-mono text-cyan-400 mb-8 relative z-10">{phases[phaseIndex]}</h3>
          
          <div className="relative z-10 w-full bg-gray-800 rounded-full h-4 mb-4 border border-gray-700 overflow-hidden">
            <div 
              className="bg-cyan-500 h-4 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(34,211,238,0.8)] relative"
              style={{ width: `\${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1s_infinite] -skew-x-12"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm font-mono text-slate-400 relative z-10">
            <span>Analyzing frame {Math.floor((progress / 100) * 300)}/300...</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>
      )}

      {state === 'results' && (
        <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-100 border-l-4 border-cyan-500 pl-4">Analysis Results</h3>
            <button 
              onClick={() => {
                setState('idle');
                setFile(null);
                setProgress(0);
              }}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-slate-300 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="w-full h-[350px]">
              <RiskScoreChart />
            </div>
            <div className="w-full">
              <EventTable />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
