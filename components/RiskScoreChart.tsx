'use client';

import React, { useState, useRef, MouseEvent } from 'react';

const mockData = [
  {time:0,score:0.12},{time:5,score:0.10},{time:10,score:0.15},{time:15,score:0.18},
  {time:20,score:0.45},{time:23,score:0.72},{time:25,score:0.92},{time:28,score:0.88},
  {time:31,score:0.65},{time:35,score:0.38},{time:40,score:0.22},{time:45,score:0.18},
  {time:50,score:0.22},{time:54,score:0.58},{time:56,score:0.71},{time:59,score:0.52},
  {time:65,score:0.30},{time:75,score:0.15},{time:85,score:0.18},{time:95,score:0.25},
  {time:100,score:0.42},{time:105,score:0.68},{time:108,score:0.62},{time:112,score:0.45},
  {time:120,score:0.25},{time:130,score:0.20},{time:140,score:0.40},{time:145,score:0.78},
  {time:148,score:0.97},{time:152,score:0.82},{time:158,score:0.45},{time:165,score:0.30},
  {time:170,score:0.48},{time:175,score:0.42},{time:180,score:0.35},{time:185,score:0.22},
  {time:190,score:0.15},{time:195,score:0.18}
];

export default function RiskScoreChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverData, setHoverData] = useState<{ x: number, y: number, data: typeof mockData[0] } | null>(null);

  const viewBox = { width: 800, height: 300 };
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = viewBox.width - padding.left - padding.right;
  const chartHeight = viewBox.height - padding.top - padding.bottom;

  const maxTime = Math.max(...mockData.map(d => d.time));
  
  const getX = (time: number) => padding.left + (time / maxTime) * chartWidth;
  const getY = (score: number) => padding.top + chartHeight - (score * chartHeight);

  // Generate SVG path for line
  const linePath = mockData.map((d, i) => {
    const x = getX(d.time);
    const y = getY(d.score);
    return `\${i === 0 ? 'M' : 'L'} \${x} \${y}`;
  }).join(' ');

  // Generate SVG path for area (gradient fill)
  const areaPath = `\${linePath} L \${getX(mockData[mockData.length-1].time)} \${getY(0)} L \${getX(mockData[0].time)} \${getY(0)} Z`;

  const yGridLines = [0.25, 0.5, 0.75, 1.0];
  const xLabels = Array.from({length: Math.ceil(maxTime / 30) + 1}, (_, i) => i * 30).filter(t => t <= maxTime);

  const handleMouseMove = (e: MouseEvent) => {
    if (!svgRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    // Calculate mouse X relative to viewBox coordinate system
    const mouseX = ((e.clientX - svgRect.left) / svgRect.width) * viewBox.width;
    
    // Find closest data point based on X coordinate
    const chartX = mouseX - padding.left;
    const timeAtMouse = (chartX / chartWidth) * maxTime;
    
    if (timeAtMouse < 0 || timeAtMouse > maxTime) {
      setHoverData(null);
      return;
    }

    let closest = mockData[0];
    let minDiff = Math.abs(mockData[0].time - timeAtMouse);
    
    for (let i = 1; i < mockData.length; i++) {
      const diff = Math.abs(mockData[i].time - timeAtMouse);
      if (diff < minDiff) {
        minDiff = diff;
        closest = mockData[i];
      }
    }

    setHoverData({
      x: getX(closest.time),
      y: getY(closest.score),
      data: closest
    });
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `\${m}:\${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-cyan-400 font-mono text-lg font-semibold mb-4">Risk Score Over Time</h3>
      <div className="flex-1 relative min-h-[250px]">
        <svg 
          ref={svgRef}
          viewBox={`0 0 \${viewBox.width} \${viewBox.height}`}
          className="w-full h-full overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Background zones */}
            <rect id="dangerZone" x={padding.left} y={getY(1.0)} width={chartWidth} height={getY(0.7) - getY(1.0)} />
            <rect id="warningZone" x={padding.left} y={getY(0.7)} width={chartWidth} height={getY(0.5) - getY(0.7)} />
          </defs>

          {/* Zones */}
          <use href="#dangerZone" fill="#ef4444" fillOpacity="0.1" />
          <use href="#warningZone" fill="#f59e0b" fillOpacity="0.1" />

          {/* Y-axis grid and labels */}
          {yGridLines.map(score => (
            <g key={score}>
              <line 
                x1={padding.left} 
                y1={getY(score)} 
                x2={viewBox.width - padding.right} 
                y2={getY(score)} 
                stroke="#374151" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <text 
                x={padding.left - 10} 
                y={getY(score)} 
                fill="#9ca3af" 
                fontSize="12" 
                fontFamily="JetBrains Mono, monospace" 
                textAnchor="end" 
                alignmentBaseline="middle"
              >
                {score.toFixed(2)}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {xLabels.map(time => (
            <text 
              key={time}
              x={getX(time)} 
              y={viewBox.height - 10} 
              fill="#9ca3af" 
              fontSize="12" 
              fontFamily="JetBrains Mono, monospace" 
              textAnchor="middle"
            >
              {formatTime(time)}
            </text>
          ))}
          
          {/* Base axes */}
          <line x1={padding.left} y1={getY(0)} x2={viewBox.width - padding.right} y2={getY(0)} stroke="#4b5563" strokeWidth="2" />
          <line x1={padding.left} y1={getY(0)} x2={padding.left} y2={getY(1.0)} stroke="#4b5563" strokeWidth="2" />

          {/* Data Path */}
          <path d={areaPath} fill="url(#areaGradient)" />
          <path d={linePath} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Danger Markers */}
          {mockData.filter(d => d.score > 0.7).map((d, i) => (
            <circle 
              key={`danger-\${i}`}
              cx={getX(d.time)} 
              cy={getY(d.score)} 
              r="4" 
              fill="#ef4444" 
              stroke="#111827" 
              strokeWidth="1"
            />
          ))}

          {/* Hover Crosshair and Dot */}
          {hoverData && (
            <g>
              <line x1={hoverData.x} y1={padding.top} x2={hoverData.x} y2={getY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={padding.left} y1={hoverData.y} x2={viewBox.width - padding.right} y2={hoverData.y} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={hoverData.x} cy={hoverData.y} r="5" fill="#22d3ee" stroke="#111827" strokeWidth="2" className="animate-pulse" />
            </g>
          )}
        </svg>

        {/* HTML Tooltip (overlaying SVG) */}
        {hoverData && (
          <div 
            className="absolute bg-gray-900 border border-gray-700 shadow-xl rounded px-3 py-2 pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
            style={{ 
              left: `\${(hoverData.x / viewBox.width) * 100}%`, 
              top: `\${(hoverData.y / viewBox.height) * 100}%` 
            }}
          >
            <div className="text-xs text-gray-400 font-mono mb-1">Time: {formatTime(hoverData.data.time)}</div>
            <div className="text-sm font-bold text-cyan-400 font-mono">Score: {hoverData.data.score.toFixed(2)}</div>
            {hoverData.data.score > 0.7 && <div className="text-xs text-red-400 mt-1 font-semibold">CRITICAL RISK</div>}
          </div>
        )}
      </div>
    </div>
  );
}
