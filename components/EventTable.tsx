'use client';

import React from 'react';

const mockEvents = [
  { id: 1, type: "speeding", startTime: 10, endTime: 15, confidence: 0.85, severity: "medium" },
  { id: 2, type: "accident", startTime: 23, endTime: 31, confidence: 0.95, severity: "critical" },
  { id: 3, type: "jaywalking", startTime: 54, endTime: 59, confidence: 0.72, severity: "high" },
  { id: 4, type: "wrong_way", startTime: 105, endTime: 112, confidence: 0.88, severity: "critical" },
  { id: 5, type: "illegal_parking", startTime: 145, endTime: 152, confidence: 0.92, severity: "medium" }
];

export default function EventTable() {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}`;
  };

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case 'accident': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'jaywalking': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'speeding': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'wrong_way': return 'bg-red-600/20 text-red-300 border-red-600/30';
      case 'illegal_parking': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatEventType = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-amber-500';
      case 'medium': return 'text-orange-400';
      case 'low': return 'text-emerald-500';
      default: return 'text-gray-400';
    }
  };

  const getConfidenceBarColor = (conf: number) => {
    if (conf >= 0.9) return 'bg-emerald-500';
    if (conf >= 0.75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-cyan-400 font-mono text-lg font-semibold">Detected Events</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 text-slate-400 text-sm uppercase tracking-wider font-medium">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Event Type</th>
              <th className="px-6 py-4">Start Time</th>
              <th className="px-6 py-4">End Time</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {mockEvents.map((event, index) => (
              <tr key={event.id} className="hover:bg-gray-800/30 transition-colors group">
                <td className="px-6 py-4 text-slate-500 font-mono text-sm group-hover:text-cyan-400 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border \${getEventTypeStyles(event.type)}`}>
                    {formatEventType(event.type)}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300 font-mono text-sm">
                  {formatTime(event.startTime)}
                </td>
                <td className="px-6 py-4 text-slate-300 font-mono text-sm">
                  {formatTime(event.endTime)}
                </td>
                <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                  {event.endTime - event.startTime}s
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 font-mono text-sm">{(event.confidence * 100).toFixed(0)}%</span>
                    <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full \${getConfidenceBarColor(event.confidence)}`} 
                        style={{ width: `\${event.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold capitalize flex items-center gap-1.5 \${getSeverityColor(event.severity)}`}>
                    <span className={`w-2 h-2 rounded-full \${
                      event.severity === 'critical' ? 'bg-red-500 animate-pulse' : 
                      event.severity === 'high' ? 'bg-amber-500' : 'bg-orange-400'
                    }`}></span>
                    {event.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mockEvents.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No events detected.
          </div>
        )}
      </div>
    </div>
  );
}
