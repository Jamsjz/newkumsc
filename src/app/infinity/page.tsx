'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Maximize2, Volume2 } from 'lucide-react';
import Link from 'next/link';
import InfinityInteractiveBackground from './InfinityInteractiveBackground';
import LampLightCanvas from './LampLightCanvas';
import ScratchOverlay from './ScratchOverlay';

export default function InfinityPage() {
    const mainRef = useRef<HTMLElement | null>(null);
    const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [showOverlay, setShowOverlay]  = useState(true);
    const [isRevealing, setIsRevealing]  = useState(false);
    // false = room lights on (normal bg), true = room dark (only lamp lights it)
    const [lampDark, setLampDark] = useState(false);

    const handleRevealStart = () => {
        setIsRevealing(true);
        if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
        revealTimeoutRef.current = setTimeout(() => setIsRevealing(false), 1000);
    };

    return (
        <div className="h-screen bg-black p-4 flex flex-col relative overflow-hidden font-sans">

            {/* Top Navigation */}
            <nav className="absolute top-8 right-10 z-50 hidden md:flex items-center gap-10 text-[12px] font-bold tracking-[0.2em] text-white/90 uppercase">
                {[
                    'Hackathon', 'Mathematical Modeling', 'High School Workshop',
                    'Photography Competition', 'Mathematical Games', 'E-Games',
                    'Talk Show', 'Data Visualization Contest', 'Olympiad',
                    'Quiz Competition', 'Acoustic Night', 'Podcast',
                ].map((item) => (
                    <Link href="#" key={item} className="hover:text-gray-400 transition-colors py-2">
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Main Content Card */}
            <main
                className="flex-1 w-full relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                ref={mainRef}
                style={{
                    animation: isRevealing
                        ? 'infinityContentReveal 1000ms cubic-bezier(0.22,1,0.36,1) both'
                        : undefined,
                }}
            >
                {/* Background Image — always visible, lamp effect layers over it */}
                <div className="absolute inset-0">
                    <Image src="/infinity bg.png" alt="Infinity" fill priority className="object-cover" />
                </div>

                {/* Rotating Lissajous curve */}
                <div className="absolute inset-0 z-[2]">
                    <InfinityInteractiveBackground containerRef={mainRef} />
                </div>

                {/* Physically-based lamp light — only active when lampDark=true */}
                <div className="absolute inset-0 z-[3]">
                    <LampLightCanvas containerRef={mainRef} lampDark={lampDark} />
                </div>

                {/* Logo Tab (Top Left) */}
                <div className="absolute top-0 left-0 z-40 bg-black rounded-br-[3rem] px-8 py-6 pl-8 flex items-center gap-4 ring-[10px] ring-black">
                    <div className="relative h-24 w-80">
                        <Image src="/infinity-logo.png" alt="Infinity Logo" fill className="object-contain" />
                    </div>
                </div>

                {/* Lamp Toggle Button */}
                <button
                    onClick={() => setLampDark(v => !v)}
                    title={lampDark ? 'Turn room lights on' : 'Turn room lights off'}
                    className="absolute top-6 right-6 z-50 cursor-pointer select-none flex items-center gap-2"
                    style={{
                        background: lampDark
                            ? 'rgba(255,185,30,0.15)'
                            : 'rgba(255,255,255,0.08)',
                        border: lampDark
                            ? '1px solid rgba(255,185,30,0.45)'
                            : '1px solid rgba(255,255,255,0.18)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        padding: '9px 18px',
                        color: lampDark ? '#ffbf1e' : 'rgba(255,255,255,0.55)',
                        transition: 'all 0.35s ease',
                        boxShadow: lampDark ? '0 0 20px rgba(255,175,20,0.25)' : 'none',
                    }}
                >
                    {/* Lamp SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 2 L5 10 L19 10 Z" />
                        <line x1="12" y1="10" x2="12" y2="19" />
                        <line x1="8"  y1="19" x2="16" y2="19" />
                    </svg>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {lampDark ? 'Lamp On' : 'Lamp Off'}
                    </span>
                </button>

                {/* Bottom Left Info Block */}
                <div className="absolute bottom-0 left-0 z-40 bg-black text-white pt-10 pb-8 pl-10 pr-16 rounded-tr-[3rem]">
                    <h1 className="text-6xl md:text-7xl font-sans font-medium tracking-tighter leading-[0.9] mb-4">
                        KATHMANDU<br />
                        <span className="font-light">UNIVERSITY</span>
                    </h1>
                    <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-8 max-w-[300px] leading-relaxed">
                        Kathmandu University is a premier institution of higher learning dedicated to excellence in
                        education, research, and innovation since its establishment
                    </p>
                    <div className="flex items-center gap-5">
                        <button className="hover:text-white text-white/80 transition-colors cursor-pointer">
                            <Play className="w-5 h-5 fill-current" />
                        </button>
                        <span className="text-xs font-mono text-gray-400">0:02 / 1:35</span>
                        <div className="w-48 h-[2px] bg-gray-800 rounded-full mx-2 cursor-pointer relative">
                            <div className="absolute inset-y-0 left-0 w-1/3 bg-white rounded-full" />
                        </div>
                        <button className="hover:text-white text-white/80 transition-colors cursor-pointer">
                            <Volume2 className="w-4 h-4" />
                        </button>
                        <button className="hover:text-white text-white/80 transition-colors cursor-pointer">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Scratch Overlay */}
                {showOverlay && (
                    <ScratchOverlay
                        onRevealStart={handleRevealStart}
                        onComplete={() => setShowOverlay(false)}
                    />
                )}

            </main>

            <style jsx>{`
                @keyframes infinityContentReveal {
                    0%   { transform: scale(1); filter: brightness(0.98) contrast(1.06) saturate(1.05); }
                    35%  { transform: scale(1); filter: brightness(1.12) contrast(1.08) saturate(1.18); }
                    100% { transform: scale(1); filter: brightness(1) contrast(1) saturate(1); }
                }
            `}</style>
        </div>
    );
}
