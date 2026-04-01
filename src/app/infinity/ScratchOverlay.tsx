'use client';

import React, { useCallback, useEffect, useRef } from 'react';

interface ScratchOverlayProps {
    onComplete: () => void;
    onRevealStart?: () => void;
}

export default function ScratchOverlay({ onComplete, onRevealStart }: ScratchOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const scratchPointsRef = useRef<Array<{ x: number; y: number }>>([]);
    const dissolvingRef = useRef(false);
    const isScratchingRef = useRef(false);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);
    const lastScratchAtRef = useRef<number>(0);

    // Dissolve animation - Organic dissolve reveal
    const startDissolve = useCallback(() => {
        if (dissolvingRef.current) return;
        dissolvingRef.current = true;
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
        isScratchingRef.current = false;
        lastPointRef.current = null;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = ctxRef.current;
        if (!ctx) return;

        const duration = 1100;
        const startTime = performance.now();

        const pointsSnapshot = scratchPointsRef.current.slice();
        const pickHotspots = (target: number) => {
            if (pointsSnapshot.length === 0) return [] as Array<{ x: number; y: number; seed: number }>;
            const step = Math.max(1, Math.floor(pointsSnapshot.length / target));
            const out: Array<{ x: number; y: number; seed: number }> = [];
            for (let i = 0; i < pointsSnapshot.length && out.length < target; i += step) {
                const p = pointsSnapshot[i];
                out.push({ x: p.x, y: p.y, seed: Math.random() * 1000 });
            }
            return out;
        };

        const hotspots = pickHotspots(14);
        const recentTrail = pointsSnapshot.slice(-90);

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing (ease-out-quart)
            const eased = 1 - Math.pow(1 - progress, 4);

            ctx.globalCompositeOperation = 'destination-out';

            const w = canvas.width;
            const h = canvas.height;
            const bloomSpread = 40 + eased * 260;
            const bloomRadiusBase = 26 + eased * 70;

            // 1) Soft bloom that grows out of scratched regions (unique + blends with scratch)
            const bloomCount = Math.floor(22 + eased * 70);
            for (let i = 0; i < bloomCount; i++) {
                const useHotspot = hotspots.length > 0 && Math.random() < 0.9;
                const base = useHotspot ? hotspots[Math.floor(Math.random() * hotspots.length)] : null;

                const x0 = base ? base.x : Math.random() * w;
                const y0 = base ? base.y : Math.random() * h;
                const seed = base ? base.seed : Math.random() * 1000;

                const driftX = Math.sin(eased * 3.6 + seed) * (12 + eased * 46);
                const driftY = Math.cos(eased * 3.1 + seed) * (10 + eased * 38) - eased * 34;

                const x = x0 + driftX + (Math.random() - 0.5) * bloomSpread;
                const y = y0 + driftY + (Math.random() - 0.5) * bloomSpread;

                const r = bloomRadiusBase * (0.6 + Math.random() * 0.9);
                const strength = 0.38 + eased * 0.55;

                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, `rgba(0, 0, 0, ${strength})`);
                grad.addColorStop(0.55, `rgba(0, 0, 0, ${strength * 0.25})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2) Expand along the last scratched trail so it feels like the scratch naturally finishes the reveal
            if (recentTrail.length > 0) {
                const trailCount = Math.floor(8 + eased * 26);
                for (let i = 0; i < trailCount; i++) {
                    const p = recentTrail[Math.floor(Math.random() * recentTrail.length)];
                    const r = 34 + eased * 140;
                    const strength = 0.55 + eased * 0.35;
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
                    grad.addColorStop(0, `rgba(0, 0, 0, ${strength})`);
                    grad.addColorStop(0.7, `rgba(0, 0, 0, ${strength * 0.14})`);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 3) Light grain wipe to ensure remaining overlay dissolves evenly (kept subtle)
            const grainCount = Math.floor(18 + eased * 40);
            for (let i = 0; i < grainCount; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const r = 8 + Math.random() * (14 + eased * 28);
                const strength = 0.06 + eased * 0.22;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, `rgba(0, 0, 0, ${strength})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4) Final soft clear so nothing remains (no directional curtain)
            if (progress > 0.82) {
                const fadeProgress = (progress - 0.82) / 0.18;
                ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, fadeProgress)})`;
                ctx.fillRect(0, 0, w, h);
            }

            ctx.globalCompositeOperation = 'source-over';

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                onRevealStart?.();
                onComplete();
            }
        };

        requestAnimationFrame(animate);
    }, [onComplete, onRevealStart]);

    // Handle scratching
    const scheduleInactivityCheck = useCallback(() => {
        lastScratchAtRef.current = performance.now();
        if (inactivityTimerRef.current) return;

        const tick = () => {
            const elapsed = performance.now() - lastScratchAtRef.current;
            if (elapsed >= 500) {
                inactivityTimerRef.current = null;
                startDissolve();
                return;
            }
            inactivityTimerRef.current = setTimeout(tick, Math.max(0, 500 - elapsed));
        };

        inactivityTimerRef.current = setTimeout(tick, 500);
    }, [startDissolve]);

    const scratchMany = useCallback((points: Array<{ x: number; y: number }>) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx || dissolvingRef.current) return;

        if (points.length === 0) return;

        let last = lastPointRef.current;
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (last) {
                ctx.moveTo(last.x, last.y);
                ctx.lineTo(p.x, p.y);
            } else {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x, p.y);
            }
            last = { x: p.x, y: p.y };
            scratchPointsRef.current.push({ x: p.x, y: p.y });
        }
        ctx.stroke();

        lastPointRef.current = last;
        if (scratchPointsRef.current.length > 250) {
            scratchPointsRef.current.splice(0, scratchPointsRef.current.length - 250);
        }

        scheduleInactivityCheck();
    }, [scheduleInactivityCheck]);

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx =
            (canvas.getContext('2d', { desynchronized: true } as unknown as CanvasRenderingContext2DSettings) as CanvasRenderingContext2D | null) ||
            canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawInitialOverlay();
        };

        const drawInitialOverlay = () => {
            // Fill with white
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add text
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.font = 'bold 48px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Scratch to see Infinity', canvas.width / 2, canvas.height / 2);
        };

        const onDown = (e: PointerEvent) => {
            if (dissolvingRef.current) return;
            isScratchingRef.current = true;
            lastPointRef.current = null;
            document.documentElement.dataset.infinityScratchActive = '1';
            try {
                canvas.setPointerCapture(e.pointerId);
            } catch {
                // ignore
            }
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 80;
            scratchMany([{ x: e.clientX, y: e.clientY }]);
        };

        const onUp = (e: PointerEvent) => {
            isScratchingRef.current = false;
            lastPointRef.current = null;
            delete document.documentElement.dataset.infinityScratchActive;
            try {
                canvas.releasePointerCapture(e.pointerId);
            } catch {
                // ignore
            }
            ctx.globalCompositeOperation = 'source-over';
        };

        const onMove = (e: PointerEvent) => {
            if (!isScratchingRef.current || dissolvingRef.current) return;
            const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
            const pts: Array<{ x: number; y: number }> = [];
            for (let i = 0; i < events.length; i++) {
                const ev = events[i];
                pts.push({ x: ev.clientX, y: ev.clientY });
            }
            scratchMany(pts);
        };

        const onRawUpdate = (e: Event) => {
            onMove(e as PointerEvent);
        };

        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('pointerdown', onDown);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('pointercancel', onUp);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerrawupdate', onRawUpdate);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('pointerdown', onDown);
            canvas.removeEventListener('pointerup', onUp);
            canvas.removeEventListener('pointercancel', onUp);
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerrawupdate', onRawUpdate);
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            delete document.documentElement.dataset.infinityScratchActive;
        };
    }, [scratchMany]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[100] cursor-crosshair touch-none"
        />
    );
}
