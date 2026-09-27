'use client';

import React from 'react';

export default function EDASection() {
  const objectCategories = ['Car', 'Truck', 'Bus', 'Motorcycle', 'Pedestrian', 'Bicycle', 'Van', 'SUV'];
  const objectCounts = [342, 128, 87, 156, 234, 67, 95, 189];
  const maxCount = Math.max(...objectCounts);

  // 8x6 grid for heatmap
  const heatmapData = Array.from({ length: 6 }, () =>
    Array.from({ length: 8 }, () => Math.random()) // Mock random intensity
  );
  // Setting up a recognizable pattern for the heatmap (middle focus)
  const heatmapPattern = [
    [0.1, 0.2, 0.3, 0.3, 0.2, 0.1, 0.1, 0.1],
    [0.2, 0.4, 0.6, 0.5, 0.3, 0.2, 0.1, 0.2],
    [0.3, 0.6, 0.9, 0.8, 0.5, 0.3, 0.2, 0.1],
    [0.3, 0.7, 1.0, 0.9, 0.6, 0.4, 0.2, 0.1],
    [0.2, 0.5, 0.8, 0.7, 0.4, 0.2, 0.1, 0.1],
    [0.1, 0.3, 0.4, 0.3, 0.2, 0.1, 0.1, 0.1],
  ];

  const trafficData = [
    { h: 0, v: 12 }, { h: 2, v: 8 }, { h: 4, v: 5 }, { h: 6, v: 25 },
    { h: 8, v: 85 }, { h: 10, v: 65 }, { h: 12, v: 72 }, { h: 14, v: 60 },
    { h: 16, v: 70 }, { h: 18, v: 90 }, { h: 20, v: 55 }, { h: 22, v: 30 },
    { h: 24, v: 15 }
  ];

  // Helper for generating line path
  const maxV = 100;
  const generatePath = () => {
    let path = `M 0,${100 - (trafficData[0].v / maxV) * 100}`;
    trafficData.forEach((point, i) => {
      if (i > 0) {
        const x = (point.h / 24) * 100;
        const y = 100 - (point.v / maxV) * 100;
        path += ` L ${x},${y}`;
      }
    });
    return path;
  };

  const linePath = generatePath();
  const areaPath = `${linePath} L 100,100 L 0,100 Z`;

  return (
    <section id="eda" className="bg-[#0a0e17] py-20 px-6 sm:px-12 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-l-4 border-cyan-400 pl-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            DATA INSIGHTS
          </h2>
          <p className="text-slate-400 font-mono text-lg">
            Exploratory analysis of our training dataset
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart 1: Bar Chart */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col hover:border-gray-700 transition-colors">
            <h3 className="font-mono text-sm text-cyan-400 mb-6 uppercase tracking-wider">
              Object Counts Over Time
            </h3>
            <div className="flex-1 w-full flex flex-col justify-end min-h-[200px] relative">
              <div className="flex justify-between items-end h-[160px] w-full gap-2 px-2">
                {objectCounts.map((count, i) => {
                  const heightPercent = (count / maxCount) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 group">
                      <div className="w-full relative flex justify-center">
                        <div 
                          className="w-full max-w-[24px] bg-cyan-400/80 rounded-t-sm group-hover:bg-cyan-300 transition-colors duration-300 relative"
                          style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-xs font-mono px-1 rounded transition-opacity pointer-events-none">
                            {count}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between w-full mt-2 border-t border-gray-800 pt-2 px-2 text-[10px] text-gray-500 font-mono">
                {objectCategories.map((cat, i) => (
                  <div key={i} className="-rotate-45 origin-top-left transform translate-y-2 translate-x-2 truncate w-8 text-center">
                    {cat.substring(0,3)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 2: Grid Heatmap */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col hover:border-gray-700 transition-colors">
            <h3 className="font-mono text-sm text-cyan-400 mb-6 uppercase tracking-wider">
              Motion Heatmap
            </h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="grid grid-cols-8 gap-1 w-full max-w-[240px] aspect-[4/3]">
                {heatmapPattern.map((row, rIdx) => 
                  row.map((val, cIdx) => {
                    // Color mapping: low (dark blue) -> high (red/yellow)
                    // For simplicity, we'll map value to a color scale using hsl or a mix of colors.
                    // Let's use a simple opacity on a red/orange base, or mix blue/red.
                    const r = Math.floor(val * 255);
                    const b = Math.floor((1 - val) * 200 + 55); // Minimum blue for background
                    const g = Math.floor(val > 0.5 ? (val - 0.5) * 2 * 200 : 0);
                    
                    return (
                      <div 
                        key={`${rIdx}-${cIdx}`}
                        className="w-full h-full rounded-[2px] transition-all hover:scale-110 cursor-crosshair"
                        style={{
                          backgroundColor: `rgb(${r}, ${g}, ${b})`,
                          opacity: val * 0.8 + 0.2
                        }}
                        title={`Intensity: ${(val*100).toFixed(0)}%`}
                      />
                    );
                  })
                )}
              </div>
              <p className="text-xs text-gray-500 font-mono mt-4 text-center">
                Spatial distribution of detected motion
              </p>
            </div>
          </div>

          {/* Chart 3: Line Chart */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col hover:border-gray-700 transition-colors">
            <h3 className="font-mono text-sm text-cyan-400 mb-6 uppercase tracking-wider">
              Traffic Density
            </h3>
            <div className="flex-1 w-full flex flex-col justify-end min-h-[200px]">
              <div className="w-full relative h-[160px]">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(34 211 238 / 0.5)" />
                      <stop offset="100%" stopColor="rgb(34 211 238 / 0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2" />
                  
                  {/* Data path */}
                  <path d={areaPath} fill="url(#lineGrad)" />
                  <path d={linePath} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Data points */}
                  {trafficData.map((point, i) => (
                    <circle 
                      key={i}
                      cx={(point.h / 24) * 100} 
                      cy={100 - (point.v / maxV) * 100} 
                      r="1.5" 
                      fill="#0a0e17" 
                      stroke="#22d3ee" 
                      strokeWidth="1"
                      className="transition-all hover:r-[3] cursor-pointer"
                    >
                      <title>{`Time: ${point.h}h, Density: ${point.v}`}</title>
                    </circle>
                  ))}
                </svg>
              </div>
              <div className="flex justify-between w-full mt-2 border-t border-gray-800 pt-2 text-xs text-gray-500 font-mono">
                <span>0h</span>
                <span>4h</span>
                <span>8h</span>
                <span>12h</span>
                <span>16h</span>
                <span>20h</span>
                <span>24h</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
