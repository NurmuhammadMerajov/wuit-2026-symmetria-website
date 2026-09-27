'use client';

import React from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  callsign: string;
  githubUrl: string;
  linkedinUrl: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Chen',
    role: 'ML Engineer',
    bio: 'YOLO & DenseNet pipeline architecture',
    initials: 'AC',
    callsign: 'OP-CH-01',
    githubUrl: '#',
    linkedinUrl: '#',
  },
  {
    id: 'member-2',
    name: 'Sarah Kim',
    role: 'Computer Vision Lead',
    bio: 'Object tracking & motion analysis',
    initials: 'SK',
    callsign: 'OP-KM-02',
    githubUrl: '#',
    linkedinUrl: '#',
  },
  {
    id: 'member-3',
    name: 'Marcus Rivera',
    role: 'Full-Stack Developer',
    bio: 'System integration & deployment',
    initials: 'MR',
    callsign: 'OP-RV-03',
    githubUrl: '#',
    linkedinUrl: '#',
  },
];

export interface TeamSectionProps {
  className?: string;
}

export default function TeamSection({ className = '' }: TeamSectionProps) {
  return (
    <section
      id="team"
      aria-label="The Team"
      className={`relative w-full bg-[#0a0e17] text-slate-100 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-900 overflow-hidden ${className}`}
    >
      {/* Background ambient subtle glow & grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Personnel Clearance Roster
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-slate-100 uppercase">
            THE TEAM
          </h2>

          {/* Cyan Accent Underline */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="h-0.5 w-6 bg-cyan-500/40 rounded-full" />
            <span className="h-1 w-20 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            <span className="h-0.5 w-6 bg-cyan-500/40 rounded-full" />
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-sans">
            Engineers and researchers behind Symmetria&apos;s real-time computer vision inference engine.
          </p>
        </div>

        {/* Team Grid: 1 col on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group relative bg-[#111827] border border-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.25)] flex flex-col justify-between"
            >
              {/* Corner HUD reticle lines */}
              <div 
                className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-gray-700 group-hover:border-cyan-400/80 transition-colors pointer-events-none" 
                aria-hidden="true"
              />
              <div 
                className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-gray-700 group-hover:border-cyan-400/80 transition-colors pointer-events-none" 
                aria-hidden="true"
              />

              {/* Card Body */}
              <div>
                {/* Callsign / Status HUD Pill */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-6">
                  <span className="text-slate-500 group-hover:text-cyan-400/80 transition-colors">
                    {member.callsign}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[10px] text-emerald-400 group-hover:border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Avatar Placeholder */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Pulsing ring on hover */}
                    <div 
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-40 blur transition-opacity duration-300" 
                      aria-hidden="true" 
                    />
                    
                    {/* Circular div with initials & gradient */}
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-100 font-mono font-bold text-2xl tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] border-2 border-cyan-300/40 group-hover:scale-105 transition-transform duration-300">
                      {member.initials}
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center">
                  <h3 className="text-xl font-bold font-sans text-slate-100 group-hover:text-white transition-colors">
                    {member.name}
                  </h3>
                  <div className="mt-1 inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                    {member.role}
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-slate-400 text-center font-sans leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Card Footer: Social Links */}
              <div className="mt-8 pt-5 border-t border-gray-800/80 flex items-center justify-center gap-4">
                {/* GitHub Link */}
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub profile`}
                  className="p-2 rounded-lg bg-gray-900/60 border border-gray-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-gray-800/80 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* LinkedIn Link */}
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  className="p-2 rounded-lg bg-gray-900/60 border border-gray-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-gray-800/80 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
