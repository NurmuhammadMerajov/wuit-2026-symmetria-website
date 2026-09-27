'use client';

import React, { useState } from 'react';

type ExpandableCardProps = {
  title: string;
  items: string[];
  accentClass: string;
  isOpenDefault?: boolean;
};

function ExpandableCard({ title, items, accentClass, isOpenDefault = false }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className={`bg-[#111827] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 mb-4 border-l-4 \${accentClass}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 focus:outline-none hover:bg-gray-800/40 transition-colors"
      >
        <h3 className="text-xl font-medium text-slate-100">{title}</h3>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 \${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`transition-all duration-500 ease-in-out \${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 border-t border-gray-800/50 mt-1">
          <ul className="space-y-3 mt-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function TechnicalReport() {
  const whatWorked = [
    "YOLOv8 achieved 94.2% mAP on custom traffic dataset",
    "DenseNet-121 feature extraction improved event classification by 23%",
    "Rule-based speed estimation within 5km/h accuracy using optical flow",
    "Multi-object tracking maintained identity across 87% of occlusion events",
    "Real-time processing at 28 FPS on NVIDIA RTX 3080"
  ];

  const whatFailed = [
    "Night-time detection accuracy dropped to 71% due to poor lighting",
    "Small object detection (cyclists at distance) had high miss rate",
    "Heavy rain/fog caused 40% increase in false positives",
    "GPU memory limitations restricted batch size during training",
    "Edge cases: unusual vehicle types (tractors, construction vehicles) poorly classified"
  ];

  const futureWork = [
    "Implement attention mechanisms for better small object detection",
    "Add weather-aware preprocessing pipeline",
    "Integrate with city traffic management APIs",
    "Deploy on edge devices (NVIDIA Jetson) for roadside units",
    "Expand event taxonomy to 12+ categories",
    "Implement federated learning for privacy-preserving model updates"
  ];

  return (
    <section id="report" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
          TECHNICAL <span className="text-cyan-400">REPORT</span>
        </h2>
        <p className="text-slate-400 text-lg">Key findings and architectural learnings from the hackathon</p>
      </div>

      <div className="space-y-6">
        <ExpandableCard 
          title="What Worked" 
          items={whatWorked} 
          accentClass="border-l-emerald-500" 
          isOpenDefault={true}
        />
        
        <ExpandableCard 
          title="What Failed" 
          items={whatFailed} 
          accentClass="border-l-red-500" 
        />
        
        <ExpandableCard 
          title="Future Work" 
          items={futureWork} 
          accentClass="border-l-amber-500" 
        />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0e17] border-t border-gray-800 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-slate-400 text-sm font-medium">
          Symmetria © 2026 · Built for HackVision 2026
        </div>
        
        <div className="text-cyan-500/80 text-xs font-mono tracking-wider bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900/50">
          Powered by YOLOv8 + DenseNet-121
        </div>
        
        <a 
          href="#" 
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="GitHub Repository"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
