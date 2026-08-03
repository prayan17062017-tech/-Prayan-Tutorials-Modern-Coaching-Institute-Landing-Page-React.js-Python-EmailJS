import { useEffect, useRef, useCallback } from 'react';
import {
  Magnet, Lightbulb, Zap, Satellite, Telescope,
  Waves, Radio, Orbit, Antenna, Sun,
  Pi, Sigma, Infinity, Calculator, Compass,
  Divide, FunctionSquare, Grid, Crosshair, Spline,
  Dna, Leaf, Brain, Heart, Activity,
  Bug, Sprout, Droplets, Eye, Scan,
  GraduationCap, BookOpen, NotebookPen, Pencil, Pen,
  Ruler, Globe, Trophy, Medal, Rocket,
  Target, Timer, PenTool, BookMarked, Aperture,
  FlaskConical, TestTube, Beaker, Atom, Microscope,
  FlaskRound, Radiation, Thermometer, Syringe, Hexagon,
  CircuitBoard, Cpu, Binary, Network, Waypoints,
} from 'lucide-react';

// All 60 required icons in exact order
const ICON_POOL = [
  // Physics (10)
  Magnet, Lightbulb, Zap, Satellite, Telescope,
  Waves, Radio, Orbit, Antenna, Sun,
  // Mathematics (10)
  Pi, Sigma, Infinity, Calculator, Compass,
  Divide, FunctionSquare, Grid, Crosshair, Spline,
  // Biology (10)
  Dna, Leaf, Brain, Heart, Activity,
  Bug, Sprout, Droplets, Eye, Scan,
  // Education (15)
  GraduationCap, BookOpen, NotebookPen, Pencil, Pen,
  Ruler, Globe, Trophy, Medal, Rocket,
  Target, Timer, PenTool, BookMarked, Aperture,
  // Chemistry (10)
  FlaskConical, TestTube, Beaker, Atom, Microscope,
  FlaskRound, Radiation, Thermometer, Syringe, Hexagon,
  // Technology (5)
  CircuitBoard, Cpu, Binary, Network, Waypoints,
];

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
const rand = seeded(42);

// 3 depth tiers with strong enough opacity to be visible
const TIERS = [
  { sizePx: 52, opacityLight: 0.22, opacityDark: 0.28, blur: 0.6, baseSpeed: 0.50 },
  { sizePx: 38, opacityLight: 0.16, opacityDark: 0.22, blur: 1.2, baseSpeed: 0.36 },
  { sizePx: 26, opacityLight: 0.11, opacityDark: 0.16, blur: 2.0, baseSpeed: 0.22 },
];

// 120 icons: all 60 used exactly twice
const TOTAL = 70;
const REPEL_R = 150;
const REPEL_F = 2.8;

const iconCfg = Array.from({ length: TOTAL }, (_, i) => {
  const tier  = TIERS[i % 3];
  const angle = rand() * 2 * Math.PI;          // truly random 0–360°
  const spd   = tier.baseSpeed * (0.5 + rand() * 1.0);
  return {
    Icon   : ICON_POOL[i % ICON_POOL.length],  // each icon used exactly twice
    tier,
    initVx : Math.cos(angle) * spd,
    initVy : Math.sin(angle) * spd,
    rotSpd : (rand() - 0.5) * 0.45,
    // Spread initial positions uniformly across viewport using a grid
    // 12 cols × 10 rows = 120 cells, one icon per cell
    col    : i % 12,
    row    : Math.floor(i / 12),
    jx     : (rand() - 0.5) * 0.6,            // jitter within cell
    jy     : (rand() - 0.5) * 0.6,
  };
});

function getCount() {
  const w = window.innerWidth;
  if (w >= 1024) return 120;
  if (w >= 640)  return 72;
  return 36;
}

export default function BackgroundPattern() {
  const mouse    = useRef({ x: -9999, y: -9999 });
  const elRefs   = useRef([]);
  const ps       = useRef(null);   // live position state: { x, y, vx, vy, rot }
  const rafRef   = useRef(null);
  const countRef = useRef(TOTAL);
  const isDark   = useRef(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });
    const obs = new MutationObserver(() => {
      isDark.current = document.documentElement.classList.contains('dark');
    });
    obs.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => { window.removeEventListener('mousemove', onMove); obs.disconnect(); };
  }, []);

  useEffect(() => {
    const update = () => {
      countRef.current = getCount();
      elRefs.current.forEach((el, i) => {
        if (el) el.style.display = i < countRef.current ? '' : 'none';
      });
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  const loop = useCallback(() => {
    const vw   = window.innerWidth;
    const vh   = window.innerHeight;
    const n    = countRef.current;
    const dark = isDark.current;

    // Initialise: spread all 120 icons evenly across the full viewport (12×10 grid)
    if (!ps.current) {
      const cellW = vw / 12;
      const cellH = vh / 10;
      ps.current = iconCfg.map((cfg) => ({
        x  : (cfg.col + 0.5 + cfg.jx) * cellW,
        y  : (cfg.row + 0.5 + cfg.jy) * cellH,
        vx : cfg.initVx,
        vy : cfg.initVy,
        rot: rand() * 360,
      }));
    }

    for (let i = 0; i < n; i++) {
      const el = elRefs.current[i];
      if (!el) continue;

      const cfg  = iconCfg[i];
      const p    = ps.current[i];
      const half = cfg.tier.sizePx / 2;

      // Repulsion — all in viewport coords
      const dx   = p.x - mouse.current.x;
      const dy   = p.y - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_R && dist > 0) {
        const force = ((REPEL_R - dist) / REPEL_R) ** 1.5 * REPEL_F;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Speed cap + restore
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const cap = cfg.tier.baseSpeed * 4;
      if (spd > cap) { p.vx = (p.vx / spd) * cap; p.vy = (p.vy / spd) * cap; }
      if (spd > cfg.tier.baseSpeed * 1.1) { p.vx *= 0.983; p.vy *= 0.983; }

      p.x   += p.vx;
      p.y   += p.vy;
      p.rot  = (p.rot + cfg.rotSpd + 360) % 360;

      // Bounce off viewport edges
      if (p.x < half)      { p.x = half;      p.vx =  Math.abs(p.vx); }
      if (p.x > vw - half) { p.x = vw - half; p.vx = -Math.abs(p.vx); }
      if (p.y < half)      { p.y = half;       p.vy =  Math.abs(p.vy); }
      if (p.y > vh - half) { p.y = vh - half;  p.vy = -Math.abs(p.vy); }

      el.style.left      = `${p.x}px`;
      el.style.top       = `${p.y}px`;
      el.style.transform = `rotate(${p.rot}deg)`;
      el.style.opacity   = String(dark ? cfg.tier.opacityDark : cfg.tier.opacityLight);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[-1]">

      {/* Radial glows */}
      <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 68%)' }} />
      <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 68%)' }} />

      {/* Icons */}
      <div className="absolute inset-0 text-blue-700 dark:text-blue-300">
        {iconCfg.map((cfg, i) => (
          <div
            key={i}
            ref={el => { elRefs.current[i] = el; }}
            className="absolute will-change-transform"
            style={{
              marginLeft : -cfg.tier.sizePx / 2,
              marginTop  : -cfg.tier.sizePx / 2,
              filter     : `blur(${cfg.tier.blur}px)`,
            }}
          >
            <cfg.Icon
              width={cfg.tier.sizePx}
              height={cfg.tier.sizePx}
              strokeWidth={1.2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
