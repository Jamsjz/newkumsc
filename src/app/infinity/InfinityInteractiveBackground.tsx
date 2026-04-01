'use client';

import React, { useEffect, useRef } from 'react';

export default function InfinityInteractiveBackground({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const pausedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const host = containerRef.current;
        if (!host) return;

        const resize = () => {
            const rect = host.getBoundingClientRect();
            const w = Math.max(1, Math.floor(rect.width));
            const h = Math.max(1, Math.floor(rect.height));

            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            sizeRef.current = { w, h };
        };

        resize();
        const ro = new ResizeObserver(() => resize());
        ro.observe(host);

        const updatePaused = () => {
            const paused = document.documentElement.dataset.infinityScratchActive === '1';
            if (pausedRef.current === paused) return;
            pausedRef.current = paused;
            if (paused) {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
            } else {
                if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
            }
        };

        const mo = new MutationObserver(() => updatePaused());
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-infinity-scratch-active'] });

        const draw = (now: number) => {
            if (pausedRef.current) {
                rafRef.current = null;
                return;
            }
            const w = sizeRef.current.w;
            const h = sizeRef.current.h;

            ctx.clearRect(0, 0, w, h);

            const cx = w * 0.55;
            const cy = h * 0.62;
            const scale = Math.min(w, h) * 0.22;

            const phase = now / 900;
            const aFreq = 2;
            const bFreq = 3;

            const grad = ctx.createLinearGradient(cx - scale, cy - scale, cx + scale, cy + scale);
            grad.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
            grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.85)');
            grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.75)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.0;
            ctx.beginPath();

            const steps = 420;
            for (let i = 0; i <= steps; i++) {
                const t = (i / steps) * Math.PI * 2;
                const x = Math.sin(aFreq * t + phase);
                const y = Math.sin(bFreq * t);
                const twist = 0.18 * Math.sin(t * 2 + phase);
                const xx = cx + x * scale + twist * scale * 0.35;
                const yy = cy + y * scale * 0.72;
                if (i === 0) ctx.moveTo(xx, yy);
                else ctx.lineTo(xx, yy);
            }
            ctx.stroke();

            rafRef.current = requestAnimationFrame(draw);
        };

        updatePaused();
        if (!pausedRef.current) rafRef.current = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            mo.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [containerRef]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{
                opacity: 0.8,
                mixBlendMode: 'multiply',
                filter: 'blur(0.2px)',
            }}
        />
    );
}
