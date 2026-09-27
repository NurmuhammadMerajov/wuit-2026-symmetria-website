'use client';

import React from 'react';

export default function ProblemApproach() {
  return (
    <section id="approach" className="bg-[#0a0e17] text-slate-100 py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center sm:text-left border-l-4 border-cyan-400 pl-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            PROBLEM <span className="text-cyan-400">&</span> APPROACH
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg font-mono">
            Automating traffic incident detection for safer, smarter roads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Problem Statement */}
          <div className="bg-[#111827] rounded-xl p-8 border border-gray-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl text-white pointer-events-none">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              The Problem
            </h3>
            <p className="text-slate-400 leading-relaxed font-sans mb-6">
              Traffic accidents cause millions of deaths and injuries globally every year. 
              Current monitoring systems rely heavily on manual observation, which is insufficient, 
              slow, and prone to human error. There is a critical need for automated, real-time 
              detection systems that can instantly identify accidents, anomalies, and dangerous 
              driving behaviors to alert emergency services faster.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 font-mono text-sm text-red-400">
              <span className="block font-bold mb-1">CRITICAL METRIC:</span>
              Manual monitoring has an average response delay of 12 minutes.
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-[#111827] rounded-xl p-8 border border-gray-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl text-white pointer-events-none">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Our Approach
            </h3>
            <p className="text-slate-400 leading-relaxed font-sans mb-6">
              We developed a robust AI pipeline for real-time traffic event detection. 
              By combining state-of-the-art learned components with fast, rule-based 
              heuristics, our system achieves high accuracy while maintaining low 
              inference latency suitable for deployment on edge devices near traffic cameras.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 font-mono text-sm text-emerald-400">
              <span className="block font-bold mb-1">TARGET METRIC:</span>
              Automated detection reduces response delay to &lt; 30 seconds.
            </div>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="space-y-8 pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-slate-100 font-mono border-b border-gray-800 pb-2 inline-block">
            Detection Pipeline
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm w-full py-8">
            {/* Step 1 */}
            <div className="flex-1 w-full md:w-auto flex flex-col items-center">
              <div className="w-full bg-gray-800 border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                </svg>
                <span className="text-gray-300 font-bold text-center">Input Video</span>
                <span className="text-[10px] text-gray-500 mt-1 uppercase">CCTV Feed</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-gray-600">
              <svg className="hidden md:block w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="block md:hidden w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex-1 w-full md:w-auto flex flex-col items-center">
              <div className="w-full bg-cyan-950/30 border-2 border-cyan-500/50 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-cyan-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h2m14 0h2M12 3v2m0 14v2m-6.364-11.636l1.414 1.414m8.486 8.486l1.414 1.414M6.364 17.636l1.414-1.414m8.486-8.486l1.414-1.414M12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span className="text-cyan-400 font-bold text-center">YOLO v8 Detection</span>
                <span className="text-[10px] bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded mt-1 border border-cyan-800">LEARNED</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-gray-600">
              <svg className="hidden md:block w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="block md:hidden w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex-1 w-full md:w-auto flex flex-col items-center">
              <div className="w-full bg-blue-950/30 border-2 border-blue-500/50 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-blue-400 font-bold text-center">DenseNet Features</span>
                <span className="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded mt-1 border border-blue-800">LEARNED</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-gray-600">
              <svg className="hidden md:block w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg className="block md:hidden w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex-1 w-full md:w-auto flex flex-col items-center">
              <div className="w-full bg-emerald-950/30 border-2 border-emerald-500/50 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px] shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-transform hover:scale-105">
                <svg className="w-8 h-8 text-emerald-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-emerald-400 font-bold text-center">Event Classification</span>
                <span className="text-[10px] bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded mt-1 border border-emerald-800 text-center">RULE-BASED + LEARNED</span>
              </div>
            </div>
          </div>

          {/* Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[#111827] rounded-xl p-6 border-l-4 border-amber-500 shadow-lg">
              <h4 className="text-amber-500 font-mono font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Rule-Based Components
              </h4>
              <ul className="space-y-3 text-sm text-slate-400 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">▸</span>
                  <span><strong>Speed Estimation:</strong> Optical flow analysis for velocity approximation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">▸</span>
                  <span><strong>Zone Violation:</strong> Polygon intersection testing for restricted areas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">▸</span>
                  <span><strong>Trajectory Analysis:</strong> Sudden acceleration/deceleration detection.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 border-l-4 border-cyan-500 shadow-lg">
              <h4 className="text-cyan-500 font-mono font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Learned Components
              </h4>
              <ul className="space-y-3 text-sm text-slate-400 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">▸</span>
                  <span><strong>Object Detection:</strong> YOLOv8 tuned for vehicles and pedestrians.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">▸</span>
                  <span><strong>Feature Extraction:</strong> DenseNet-121 for rich spatial features.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">▸</span>
                  <span><strong>Anomaly Scoring:</strong> Custom classifier trained on synthetic accident data.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="mt-16 w-full border-2 border-dashed border-gray-600 bg-gray-900/50 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[300px] text-gray-500 group hover:border-cyan-500/50 hover:bg-gray-800/50 transition-all cursor-crosshair">
          <svg className="w-16 h-16 mb-4 text-gray-600 group-hover:text-cyan-500/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <h4 className="text-lg font-mono font-semibold text-gray-400 group-hover:text-gray-300">Architecture Diagram</h4>
          <p className="text-sm font-sans mt-2 max-w-md text-center">
            Detailed system architecture diagram illustrating data flow from edge devices to the central processing node.
          </p>
        </div>
      </div>
    </section>
  );
}
