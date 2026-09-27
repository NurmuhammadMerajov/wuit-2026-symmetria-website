'use client';

import React from 'react';
import VideoTimelinePlayer, { TimelineEvent } from './VideoTimelinePlayer';

export default function ResultsTimeline() {
  const events: TimelineEvent[] = [
    { id: 1, type: 'accident', confidence: 0.92, start_time: 23.4, end_time: 31.2, severity: 'high', description: 'Rear-end collision detected at intersection' },
    { id: 2, type: 'jaywalking', confidence: 0.87, start_time: 54.1, end_time: 58.8, severity: 'medium', description: 'Pedestrian crossing outside designated crosswalk' },
    { id: 3, type: 'speeding', confidence: 0.78, start_time: 102.5, end_time: 110.3, severity: 'medium', description: 'Vehicle exceeding speed limit by 20km/h' },
    { id: 4, type: 'wrong_way', confidence: 0.95, start_time: 145.0, end_time: 152.7, severity: 'critical', description: 'Vehicle driving against traffic flow' },
    { id: 5, type: 'illegal_parking', confidence: 0.83, start_time: 168.2, end_time: 180.5, severity: 'low', description: 'Vehicle parked in no-parking zone' }
  ];

  const duration = 195;

  return (
    <section id="results" className="py-16 bg-[#0a0e17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
            <h2 className="text-2xl font-mono font-bold text-slate-100 tracking-wider">
              RESULTS & TIMELINE
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm ml-4.5 pl-4 border-l border-slate-800">
            Sample detection results from our traffic monitoring pipeline
          </p>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <VideoTimelinePlayer 
            events={events} 
            duration={duration} 
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-lg flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Total Events</span>
            <span className="text-2xl font-mono text-cyan-400">{events.length}</span>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-lg flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">High Risk</span>
            <span className="text-2xl font-mono text-red-500">
              {events.filter(e => e.severity === 'high' || e.severity === 'critical').length}
            </span>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-lg flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Avg Confidence</span>
            <span className="text-2xl font-mono text-emerald-400">
              {Math.round(events.reduce((acc, curr) => acc + curr.confidence, 0) / events.length * 100)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
