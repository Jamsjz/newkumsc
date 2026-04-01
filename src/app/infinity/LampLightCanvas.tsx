'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Props {
    containerRef: React.RefObject<HTMLElement | null>;
    lampDark: boolean; // true = room dark, lamp is the only light source
}

type Mote = {
    x: number; y: number; r: number;
    vx: number; vy: number;
    life: number; maxLife: number; alpha: number;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function spawnMote(lx: number, ly: number, dx: number, dy: number): Mote {
    // Pick a random position along the center axis (t from 0 to 1) 
    const t = Math.random() * Math.random(); // Skew spawning closer to the bulb
    const bx = lx + (dx - lx) * t;
    const by = ly + (dy - ly) * t;
    
    // Spread out radially from the center axis. The cone gets wider as t approaches 1.
    const coneDist = Math.sqrt((dx-lx)**2 + (dy-ly)**2);
    const maxSpreadAtBottom = coneDist * 0.45; 
    const spread = 8 + (maxSpreadAtBottom * t * (Math.random() * 0.8 + 0.2));
    const angle = Math.random() * Math.PI * 2;
    
    return {
        x: bx + Math.cos(angle) * spread,
        y: by + Math.sin(angle) * spread * 0.8, // Slightly squished vertical spread locally
        r: 0.4 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -0.01 - Math.random() * 0.08,
        life: Math.random() * 300,
        maxLife: 280 + Math.random() * 600,
        alpha: 0.03 + Math.random() * 0.35,
    };
}

export default function LampLightCanvas({ containerRef, lampDark }: Props) {
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const rafRef      = useRef<number | null>(null);
    const alphaRef    = useRef({ v: 0 }); // master opacity, driven by GSAP
    const flickerRef  = useRef({ v: 1 }); // brightness flicker, driven by GSAP
    const motesRef    = useRef<Mote[]>([]);
    const sizeRef     = useRef({ w: 0, h: 0 });

    //  ── GSAP fade when lampDark toggles ──
    useEffect(() => {
        gsap.killTweensOf([alphaRef.current, flickerRef.current]);
        if (lampDark) {
            // Room goes dark: smooth fade in
            gsap.to(alphaRef.current,  { v: 1.0, duration: 0.75, ease: 'power2.inOut' });
            gsap.to(flickerRef.current,{ v: 1.0, duration: 0.5,  ease: 'power2.out' });
        } else {
            // Lamp turns off: smooth fade out
            gsap.to(alphaRef.current,  { v: 0,   duration: 0.60, ease: 'power2.inOut' });
            gsap.to(flickerRef.current,{ v: 1.0, duration: 0.4 });
        }
    }, [lampDark]);

    //  ── Canvas setup + animation loop ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const host = containerRef.current;
        if (!host) return;

        const imgAspect = 1328 / 744; // Original image dimensions
        const getMapped = (w: number, h: number, px: number, py: number) => {
            let renderW, renderH;
            if (w / h > imgAspect) {
                renderW = w;
                renderH = w / imgAspect;
            } else {
                renderH = h;
                renderW = h * imgAspect;
            }
            return {
                x: w/2 + (px - 0.5) * renderW,
                y: h/2 + (py - 0.5) * renderH
            };
        };

        // Fractional coordinates targeting the absolute pixels inside the 1328x744 image
        // (Reverse-calculated based on a 2.04 screen aspect ratio where 91% x 63% was perfect)
        const lampPx = 0.910; 
        const lampPy = 0.614; 
        const deskPx = 0.780; 
        const deskPy = 0.840; 

        const lampX = (w: number, h: number) => getMapped(w, h, lampPx, lampPy).x;
        const lampY = (w: number, h: number) => getMapped(w, h, lampPx, lampPy).y;
        const deskX = (w: number, h: number) => getMapped(w, h, deskPx, deskPy).x;
        const deskY = (w: number, h: number) => getMapped(w, h, deskPx, deskPy).y;

        const resize = () => {
            const { width: rw, height: rh } = host.getBoundingClientRect();
            const w   = Math.max(1, Math.floor(rw));
            const h   = Math.max(1, Math.floor(rh));
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            canvas.width  = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width  = '100%';
            canvas.style.height = '100%';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            // Seed motes inside the light beam
            const lx = lampX(w, h);
            const ly = lampY(w, h);
            const dx = deskX(w, h);
            const dy = deskY(w, h);
            const n  = clamp(Math.floor((w * h) / 9000), 18, 50);
            motesRef.current = Array.from({ length: n }, () => spawnMote(lx, ly, dx, dy));
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        const draw = (now: number) => {
            const { w, h } = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            const ma = clamp(alphaRef.current.v,  0, 1);
            const fl = clamp(flickerRef.current.v, 0, 1.5);

            if (ma < 0.004) { rafRef.current = requestAnimationFrame(draw); return; }

            // ─── Lamp head & target coordinates ────────
            const lx    = lampX(w, h);
            const ly    = lampY(w, h);
            // Notebook on the desk where light should hit (down and left from lamp)
            const dx    = deskX(w, h);
            const dy    = deskY(w, h);
            const t     = now * 0.001;

            // ── 1. DARK ROOM BASE ─────────────────────────────────────────
            ctx.save();
            ctx.globalAlpha = ma * 0.93;
            ctx.fillStyle   = '#000';
            ctx.fillRect(0, 0, w, h);
            ctx.restore();

            // Very faint cool-ambient (dark room never totally pitch black)
            ctx.save();
            ctx.globalAlpha = ma * 0.45;
            const roomAmb = ctx.createRadialGradient(w*0.5,h*0.4,0, w*0.5,h*0.5,w*0.75);
            roomAmb.addColorStop(0, 'rgba(12,9,22,0.55)');
            roomAmb.addColorStop(1, 'rgba(0,0,0,0.75)');
            ctx.fillStyle = roomAmb;
            ctx.fillRect(0,0,w,h);
            ctx.restore();

            // ── 2. VOLUMETRIC LAMP CONE ─────────────────────────────────────────
            // Beam originates at the lamp opening and sweeps diagonally down/left 
            const vecX = dx - lx;
            const vecY = dy - ly;
            const beamDist = Math.sqrt(vecX*vecX + vecY*vecY);
            const beamAngle = Math.atan2(vecY, vecX);

            ctx.save();
            ctx.globalAlpha = ma * fl;
            ctx.translate(lx, ly);
            // Rotate local rendering space to perfectly match the angled light ray
            ctx.rotate(beamAngle - Math.PI / 2);
            // Squish horizontally to create a directional cone spread 
            ctx.scale(0.55, 1.0);

            // GEOMETRIC OFFSET RADIAL GRADIENT:
            // Math tricks: Inner circle sits at (0,0) (the bright bulb at lamp opening).
            // Outer circle is shifted massively downward to (0, gl). We set its outer radius
            // only incrementally larger (gl * 1.05). This forces the gradient to interpolate
            // in a teardrop shape! It extends hugely forwards (+Y) down towards the desk,
            // but hits mathematical 0% opacity immediately backwards (-Y) within 0.05 * gl.
            // Result: Zero sharp diagonal geometry cutoffs, and light perfectly contours 
            // inside the metal edge without bleeding up or backwards.
            const gl = beamDist * 1.3; 
            const primary = ctx.createRadialGradient(0, 0, 0, 0, gl, gl * 1.05);
            primary.addColorStop(0.00, `rgba(255,245,180, ${0.98 * fl})`);
            primary.addColorStop(0.12, `rgba(255,225,110, ${0.70 * fl})`);
            primary.addColorStop(0.35, `rgba(240,165, 40, ${0.25 * fl})`);
            primary.addColorStop(0.70, `rgba(180, 75,   5, ${0.05 * fl})`);
            primary.addColorStop(1.00, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = primary;
            // Draw generous bounds, the zero-bleed mathematical shape is handling the edges now.
            ctx.fillRect(-gl, -gl * 0.08, gl * 2, gl * 2.5);
            ctx.restore();

            // ── 3. DESK SURFACE POOL (copy / notebook) ─────────────────
            const cx1 = Math.sin(t * 1.2) * 2; 
            const cy1 = Math.cos(t * 0.8) * 1;
            const pw  = w * 0.12; // pool width
            const ph  = h * 0.035; // pool height

            ctx.save();
            ctx.globalAlpha = ma * fl;
            ctx.translate(dx + cx1, dy + cy1);
            // Angle the pool slightly to match desk perspective
            ctx.rotate(-0.05);
            ctx.scale(1, ph / pw);
            const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, pw);
            pool.addColorStop(0.00, `rgba(255,245,180, ${0.85 * fl})`);
            pool.addColorStop(0.15, `rgba(255,215, 90, ${0.60 * fl})`);
            pool.addColorStop(0.40, `rgba(235,165, 40, ${0.25 * fl})`);
            pool.addColorStop(0.70, `rgba(180, 80,  5, ${0.06 * fl})`);
            pool.addColorStop(1.00, 'rgba(0,0,0,0)');
            ctx.fillStyle = pool;
            ctx.fillRect(-pw, -pw, pw * 2, pw * 2);
            ctx.restore();

            // ── 4. WALL AND BEAR AMBIENT BOUNCE ─────────────────────────
            // Very faint scattered environmental interaction over the desktop & wall
            ctx.save();
            ctx.globalAlpha = ma * 0.16 * fl;
            // Elliptical radial burst coming outwards from the focal hit-point
            ctx.translate(dx, dy);
            ctx.scale(1, 0.75); // squished vertically
            const bounce = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.35);
            bounce.addColorStop(0,   'rgba(200,120,20, 0.45)');
            bounce.addColorStop(0.4, 'rgba(150, 80, 5, 0.15)');
            bounce.addColorStop(1,   'rgba(0,0,0,0)');
            ctx.fillStyle = bounce;
            ctx.fillRect(-w, -h, w*2, h*2);
            ctx.restore();

            // ── 6. RIGHT-WALL SCATTER ─────────────────────────────────────
            // Wall is to the right of the lamp — scatter from lamp position rightward
            ctx.save();
            ctx.globalAlpha = ma * 0.55 * fl;
            const wall = ctx.createRadialGradient(lx + w*0.06, ly, 0, lx + w*0.06, ly + h*0.05, w*0.32);
            wall.addColorStop(0,   'rgba(175,100,16, 0.18)');
            wall.addColorStop(0.4, 'rgba(130, 70, 8, 0.07)');
            wall.addColorStop(1,   'rgba(0,0,0,0)');
            ctx.fillStyle = wall;
            ctx.fillRect(0,0,w,h);
            ctx.restore();

            // ── 7. DUST MOTES ─────────────────────────────────────────────
            const motes = motesRef.current;
            const maxR  = w * 0.38; // max illuminated radius
            for (let i = 0; i < motes.length; i++) {
                const m = motes[i];
                m.vx += (Math.random() - 0.5) * 0.012;
                m.vy += (Math.random() - 0.5) * 0.006;
                m.vx  = clamp(m.vx * 0.97, -0.22, 0.22);
                m.vy  = clamp(m.vy * 0.97, -0.18, 0.04);
                m.x  += m.vx;
                m.y  += m.vy;
                m.life++;

                const dx    = m.x - lx;
                const dy    = m.y - ly;
                const dist  = Math.sqrt(dx*dx + dy*dy);
                const dead  = m.life > m.maxLife || dist > maxR;
                if (dead) { motes[i] = spawnMote(lx, ly, dx, dy); continue; }

                const isq   = clamp(1 - dist / maxR, 0, 1);
                const lifeA = Math.sin((m.life / m.maxLife) * Math.PI);
                const a     = ma * m.alpha * isq * isq * lifeA * fl; // isq² = realistic falloff
                if (a < 0.004) continue;

                ctx.save();
                ctx.globalAlpha = a;
                const mg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 2);
                mg.addColorStop(0,   'rgba(255,235,155,1)');
                mg.addColorStop(0.5, 'rgba(255,210, 90,0.5)');
                mg.addColorStop(1,   'rgba(255,190, 50,0)');
                ctx.fillStyle = mg;
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.r * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => {
            ro.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [containerRef]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 1, mixBlendMode: 'normal' }}
        />
    );
}
