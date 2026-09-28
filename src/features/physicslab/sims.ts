import type { SimId } from '../../content/types';
import {
  balanceTorque,
  dcMotor,
  flightTime,
  inclineAcceleration,
  ohmCurrent,
  parallelR,
  projectileAt,
  projectileRange,
  seriesR,
  springEnergy,
  springState,
} from './physics';

export interface SimParam {
  key: string;
  /** Physical symbol — the same in every language, so it needs no translation. */
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export interface SimReadout {
  label: string;
  value: string;
}

export interface SimDef {
  id: SimId;
  /** TeX for the governing relationship. */
  formula: string;
  params: SimParam[];
  /** Seconds after which the animation loops. */
  period(p: Record<string, number>): number;
  draw(ctx: CanvasRenderingContext2D, size: { w: number; h: number }, p: Record<string, number>, t: number): void;
  readout(p: Record<string, number>, t: number): SimReadout[];
}

export const SIM_IDS: SimId[] = ['projectile', 'spring', 'incline', 'torque', 'circuit', 'motor'];

// ── drawing helpers ──────────────────────────────────────────────────

const INK = {
  grid: 'rgba(34, 230, 255, 0.10)',
  axis: 'rgba(143, 166, 191, 0.55)',
  accent: '#22e6ff',
  accent2: '#ff3ea5',
  warn: '#ffb454',
  ok: '#3ddc97',
  dim: 'rgba(143, 166, 191, 0.85)',
};

function grid(ctx: CanvasRenderingContext2D, w: number, h: number, step = 32) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = INK.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = 0; y <= h; y += step) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = INK.dim) {
  ctx.fillStyle = color;
  ctx.font = '12px ui-monospace, monospace';
  ctx.fillText(text, x, y);
}

const n = (v: number, d = 2) => (Number.isFinite(v) ? v.toFixed(d) : '∞');

// ── the simulations ──────────────────────────────────────────────────

const projectile: SimDef = {
  id: 'projectile',
  formula: 'R = \\frac{v_0^2 \\sin 2\\alpha}{g}',
  params: [
    { key: 'v0', label: 'v₀', unit: 'm/s', min: 2, max: 40, step: 1, value: 20 },
    { key: 'angleDeg', label: 'α', unit: '°', min: 5, max: 85, step: 1, value: 45 },
    { key: 'g', label: 'g', unit: 'm/s²', min: 1.6, max: 25, step: 0.1, value: 9.81 },
  ],
  period: (p) => Math.max(0.6, flightTime({ v0: p.v0, angleDeg: p.angleDeg, g: p.g })),
  draw(ctx, { w, h }, p, t) {
    grid(ctx, w, h);
    const params = { v0: p.v0, angleDeg: p.angleDeg, g: p.g };
    const total = flightTime(params);
    const range = Math.max(1, projectileRange(params));
    const peak = Math.max(1, projectileAt(params, total / 2).y);
    const scale = Math.min((w - 60) / range, (h - 50) / (peak * 1.25));

    const px = (x: number) => 30 + x * scale;
    const py = (y: number) => h - 26 - y * scale;

    ctx.strokeStyle = INK.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, h - 26);
    ctx.lineTo(w - 10, h - 26);
    ctx.stroke();

    ctx.strokeStyle = INK.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const pt = projectileAt(params, (total * i) / 120);
      if (i === 0) ctx.moveTo(px(pt.x), py(pt.y));
      else ctx.lineTo(px(pt.x), py(pt.y));
    }
    ctx.stroke();

    const now = projectileAt(params, Math.min(t, total));
    dot(ctx, px(now.x), py(now.y), 6, INK.accent2);
    label(ctx, `${n(range, 1)} m`, Math.min(px(range) - 30, w - 60), h - 8);
  },
  readout(p, t) {
    const params = { v0: p.v0, angleDeg: p.angleDeg, g: p.g };
    const pt = projectileAt(params, Math.min(t, flightTime(params)));
    return [
      { label: 'R', value: `${n(projectileRange(params), 1)} m` },
      { label: 't', value: `${n(flightTime(params))} s` },
      { label: 'x', value: `${n(pt.x, 1)} m` },
      { label: 'y', value: `${n(pt.y, 1)} m` },
    ];
  },
};

const spring: SimDef = {
  id: 'spring',
  formula: 'm\\ddot{x} + c\\dot{x} + kx = 0',
  params: [
    { key: 'k', label: 'k', unit: 'N/m', min: 1, max: 60, step: 1, value: 12 },
    { key: 'm', label: 'm', unit: 'kg', min: 0.2, max: 5, step: 0.1, value: 1 },
    { key: 'x0', label: 'x₀', unit: 'm', min: 0.05, max: 0.5, step: 0.01, value: 0.25 },
    { key: 'c', label: 'c', unit: 'N·s/m', min: 0, max: 6, step: 0.1, value: 0.4 },
  ],
  period: (p) => 4 * Math.PI * Math.sqrt(p.m / p.k),
  draw(ctx, { w, h }, p, t) {
    grid(ctx, w, h);
    const params = { k: p.k, m: p.m, x0: p.x0, c: p.c };
    const span = 4 * Math.PI * Math.sqrt(p.m / p.k);
    const s = springState(params, t);
    const mid = h / 2;
    const scale = (h * 0.32) / Math.max(0.05, p.x0);

    ctx.strokeStyle = INK.axis;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, mid);
    ctx.lineTo(w, mid);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(34, 230, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const tt = (span * i) / 240;
      const x = 40 + (i / 240) * (w - 60);
      const y = mid - springState(params, tt).x * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const cx = 40 + (Math.min(t, span) / span) * (w - 60);
    dot(ctx, cx, mid - s.x * scale, 8, INK.accent2);
    label(ctx, `x = ${n(s.x, 3)} m`, 12, 18);
  },
  readout(p, t) {
    const params = { k: p.k, m: p.m, x0: p.x0, c: p.c };
    const s = springState(params, t);
    return [
      { label: 'x', value: `${n(s.x, 3)} m` },
      { label: 'v', value: `${n(s.v, 3)} m/s` },
      { label: 'E', value: `${n(springEnergy(s, params), 3)} J` },
      { label: 'T', value: `${n(2 * Math.PI * Math.sqrt(p.m / p.k))} s` },
    ];
  },
};

const incline: SimDef = {
  id: 'incline',
  formula: 'a = g(\\sin\\alpha - \\mu\\cos\\alpha)',
  params: [
    { key: 'angleDeg', label: 'α', unit: '°', min: 0, max: 60, step: 1, value: 25 },
    { key: 'mu', label: 'μ', unit: '', min: 0, max: 1.2, step: 0.02, value: 0.3 },
    { key: 'g', label: 'g', unit: 'm/s²', min: 1.6, max: 25, step: 0.1, value: 9.81 },
  ],
  period: () => 3,
  draw(ctx, { w, h }, p, t) {
    grid(ctx, w, h);
    const a = inclineAcceleration({ angleDeg: p.angleDeg, mu: p.mu, g: p.g });
    const rad = (p.angleDeg * Math.PI) / 180;

    const y0 = h - 30;
    const len = Math.min(w - 90, (h - 70) / Math.max(0.12, Math.tan(rad)));
    const topX = 40 + len;
    const topY = y0 - len * Math.tan(rad);

    ctx.strokeStyle = INK.axis;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, y0);
    ctx.lineTo(topX, y0);
    ctx.lineTo(topX, topY);
    ctx.closePath();
    ctx.stroke();

    const travelled = Math.min(0.5 * a * t * t, len * 0.85);
    const frac = len === 0 ? 0 : travelled / len;
    const bx = topX - frac * len;
    const by = topY + frac * (y0 - topY);

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(Math.atan2(y0 - topY, -len));
    ctx.fillStyle = a > 0 ? INK.accent : INK.warn;
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 12;
    ctx.fillRect(-14, -16, 28, 16);
    ctx.restore();
    ctx.shadowBlur = 0;

    label(ctx, a > 0 ? `a = ${n(a)} m/s²` : 'a = 0 — μ > tan α', 12, 18, a > 0 ? INK.accent : INK.warn);
  },
  readout(p, t) {
    const a = inclineAcceleration({ angleDeg: p.angleDeg, mu: p.mu, g: p.g });
    return [
      { label: 'a', value: `${n(a)} m/s²` },
      { label: 'v', value: `${n(a * t)} m/s` },
      { label: 's', value: `${n(0.5 * a * t * t)} m` },
      { label: 'μ_crit', value: n(Math.tan((p.angleDeg * Math.PI) / 180)) },
    ];
  },
};

const torque: SimDef = {
  id: 'torque',
  formula: 'M = \\sum m_i\\,g\\,r_i',
  params: [
    { key: 'mLeft', label: 'm₁', unit: 'kg', min: 0, max: 10, step: 0.5, value: 3 },
    { key: 'rLeft', label: 'r₁', unit: 'm', min: 0.2, max: 2, step: 0.1, value: 1 },
    { key: 'mRight', label: 'm₂', unit: 'kg', min: 0, max: 10, step: 0.5, value: 2 },
    { key: 'rRight', label: 'r₂', unit: 'm', min: 0.2, max: 2, step: 0.1, value: 1.5 },
  ],
  period: () => 2,
  draw(ctx, { w, h }, p) {
    grid(ctx, w, h);
    const net = balanceTorque([
      { mass: p.mLeft, arm: -p.rLeft },
      { mass: p.mRight, arm: p.rRight },
    ]);
    const tilt = Math.max(-0.32, Math.min(0.32, net / 120));

    const cx = w / 2;
    const cy = h / 2 + 18;
    const beam = Math.min(w * 0.38, 210);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);

    ctx.strokeStyle = INK.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-beam, 0);
    ctx.lineTo(beam, 0);
    ctx.stroke();

    const box = (side: 1 | -1, mass: number, arm: number, color: string) => {
      const x = side * (arm / 2) * beam;
      const size = 12 + mass * 3;
      ctx.fillStyle = color;
      ctx.fillRect(x - size / 2, -size, size, size);
    };
    box(-1, p.mLeft, p.rLeft, INK.accent2);
    box(1, p.mRight, p.rRight, INK.ok);
    ctx.restore();

    ctx.fillStyle = INK.axis;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 16, cy + 26);
    ctx.lineTo(cx + 16, cy + 26);
    ctx.closePath();
    ctx.fill();

    label(ctx, `M = ${n(net, 1)} N·m`, 12, 18, Math.abs(net) < 0.5 ? INK.ok : INK.warn);
  },
  readout(p) {
    const left = p.mLeft * 9.81 * p.rLeft;
    const right = p.mRight * 9.81 * p.rRight;
    return [
      { label: 'M₁', value: `${n(left, 1)} N·m` },
      { label: 'M₂', value: `${n(right, 1)} N·m` },
      { label: 'M', value: `${n(right - left, 1)} N·m` },
    ];
  },
};

const circuit: SimDef = {
  id: 'circuit',
  formula: 'I = \\frac{U}{R},\\quad \\frac{1}{R_p} = \\sum \\frac{1}{R_i}',
  params: [
    { key: 'volts', label: 'U', unit: 'V', min: 1, max: 24, step: 0.5, value: 12 },
    { key: 'r1', label: 'R₁', unit: 'Ω', min: 10, max: 1000, step: 10, value: 220 },
    { key: 'r2', label: 'R₂', unit: 'Ω', min: 10, max: 1000, step: 10, value: 470 },
    { key: 'mode', label: '0=soros 1=párh.', unit: '', min: 0, max: 1, step: 1, value: 0 },
  ],
  period: () => 2,
  draw(ctx, { w, h }, p, t) {
    grid(ctx, w, h);
    const series = p.mode < 0.5;
    const r = series ? seriesR([p.r1, p.r2]) : parallelR([p.r1, p.r2]);
    const i = ohmCurrent(p.volts, r);
    const y = h / 2;

    const resistor = (x: number, yy: number, value: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 26, yy - 10, 52, 20);
      label(ctx, `${value.toFixed(0)} Ω`, x - 24, yy + 30, color);
    };

    ctx.strokeStyle = INK.axis;
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (series) {
      ctx.moveTo(40, y);
      ctx.lineTo(w - 40, y);
      ctx.stroke();
      resistor(w * 0.38, y, p.r1, INK.accent);
      resistor(w * 0.66, y, p.r2, INK.accent2);
    } else {
      ctx.moveTo(40, y);
      ctx.lineTo(w * 0.35, y);
      ctx.moveTo(w * 0.65, y);
      ctx.lineTo(w - 40, y);
      ctx.moveTo(w * 0.35, y - 40);
      ctx.lineTo(w * 0.65, y - 40);
      ctx.moveTo(w * 0.35, y + 40);
      ctx.lineTo(w * 0.65, y + 40);
      ctx.moveTo(w * 0.35, y - 40);
      ctx.lineTo(w * 0.35, y + 40);
      ctx.moveTo(w * 0.65, y - 40);
      ctx.lineTo(w * 0.65, y + 40);
      ctx.stroke();
      resistor(w * 0.5, y - 40, p.r1, INK.accent);
      resistor(w * 0.5, y + 40, p.r2, INK.accent2);
    }

    // Charge carriers crawl faster when more current flows.
    const speed = Math.min(1.2, i * 14);
    for (let k = 0; k < 8; k++) {
      const x = ((t * speed + k / 8) % 1) * (w - 80) + 40;
      dot(ctx, x, y, 3, INK.ok);
    }

    label(ctx, `I = ${(i * 1000).toFixed(0)} mA`, 12, 18, INK.ok);
  },
  readout(p) {
    const series = p.mode < 0.5;
    const r = series ? seriesR([p.r1, p.r2]) : parallelR([p.r1, p.r2]);
    const i = ohmCurrent(p.volts, r);
    return [
      { label: 'R', value: `${n(r, 0)} Ω` },
      { label: 'I', value: `${(i * 1000).toFixed(1)} mA` },
      { label: 'P', value: `${n(p.volts * i, 2)} W` },
      { label: '', value: series ? 'soros / series' : 'párhuzamos / parallel' },
    ];
  },
};

const motor: SimDef = {
  id: 'motor',
  formula: 'M = k_t\\,\\frac{U - k_e\\omega}{R}',
  params: [
    { key: 'volts', label: 'U', unit: 'V', min: 3, max: 24, step: 0.5, value: 12 },
    { key: 'resistance', label: 'R', unit: 'Ω', min: 0.5, max: 10, step: 0.1, value: 2 },
    { key: 'kt', label: 'kt', unit: 'Nm/A', min: 0.01, max: 0.2, step: 0.005, value: 0.05 },
    { key: 'rpm', label: 'n', unit: 'rpm', min: 0, max: 3000, step: 10, value: 600 },
  ],
  period: () => 2,
  draw(ctx, { w, h }, p, t) {
    grid(ctx, w, h);
    const args = { volts: p.volts, resistance: p.resistance, kt: p.kt, ke: p.kt };
    const noLoadRpm = ((p.volts / p.kt) * 60) / (2 * Math.PI);
    const maxT = Math.max(1e-6, dcMotor({ ...args, rpm: 0 }).torque);

    const px = (rpm: number) => 45 + (rpm / Math.max(1, noLoadRpm)) * (w - 110);
    const py = (tq: number) => h - 34 - (tq / maxT) * (h - 70);

    ctx.strokeStyle = INK.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, h - 30);
    ctx.lineTo(w - 50, h - 30);
    ctx.moveTo(42, 20);
    ctx.lineTo(42, h - 28);
    ctx.stroke();

    ctx.strokeStyle = INK.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px(0), py(maxT));
    ctx.lineTo(px(noLoadRpm), py(0));
    ctx.stroke();

    const now = dcMotor({ ...args, rpm: p.rpm });
    dot(ctx, px(Math.min(p.rpm, noLoadRpm)), py(Math.max(0, now.torque)), 6, INK.accent2);

    const cx = w - 34;
    const cy = 40;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((t * p.rpm) / 60);
    ctx.strokeStyle = INK.ok;
    ctx.lineWidth = 3;
    for (let k = 0; k < 3; k++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(16, 0);
      ctx.stroke();
    }
    ctx.restore();

    label(ctx, `M = ${n(now.torque, 3)} N·m`, 12, 18);
    label(ctx, `n₀ = ${noLoadRpm.toFixed(0)} rpm`, 12, h - 10);
  },
  readout(p) {
    const now = dcMotor({ volts: p.volts, resistance: p.resistance, kt: p.kt, ke: p.kt, rpm: p.rpm });
    return [
      { label: 'I', value: `${n(now.current)} A` },
      { label: 'M', value: `${n(now.torque, 3)} N·m` },
      { label: 'P', value: `${n(now.mechanicalW, 1)} W` },
      { label: 'η', value: `${(now.efficiency * 100).toFixed(0)} %` },
    ];
  },
};

export const SIMS: Record<SimId, SimDef> = { projectile, spring, incline, torque, circuit, motor };
