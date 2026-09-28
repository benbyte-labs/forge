/**
 * The physics behind the Physics Lab.
 *
 * Closed-form wherever a closed form exists, so the simulations can be checked
 * against the answer a textbook gives. A teaching tool that gets the physics
 * subtly wrong is worse than no tool at all.
 */

const rad = (deg: number) => (deg * Math.PI) / 180;

// ── Projectile ───────────────────────────────────────────────────────

export interface ProjectileParams {
  /** Launch speed, m/s. */
  v0: number;
  angleDeg: number;
  /** Gravity, m/s². */
  g: number;
}

export function flightTime({ v0, angleDeg, g }: ProjectileParams): number {
  if (g <= 0) return 0;
  return (2 * v0 * Math.sin(rad(angleDeg))) / g;
}

export function apexTime({ v0, angleDeg, g }: ProjectileParams): number {
  if (g <= 0) return 0;
  return (v0 * Math.sin(rad(angleDeg))) / g;
}

export function projectileRange(p: ProjectileParams): number {
  if (p.g <= 0) return 0;
  return (p.v0 * p.v0 * Math.sin(2 * rad(p.angleDeg))) / p.g;
}

export function projectileAt(p: ProjectileParams, t: number): { x: number; y: number } {
  const vx = p.v0 * Math.cos(rad(p.angleDeg));
  const vy = p.v0 * Math.sin(rad(p.angleDeg));
  return { x: vx * t, y: Math.max(0, vy * t - 0.5 * p.g * t * t) };
}

// ── Spring ───────────────────────────────────────────────────────────

export interface SpringParams {
  /** Stiffness, N/m. */
  k: number;
  /** Mass, kg. */
  m: number;
  /** Release displacement, m. */
  x0: number;
  /** Damping coefficient, N·s/m. */
  c: number;
}

export interface SpringState {
  x: number;
  v: number;
}

/**
 * Displacement and velocity at time `t`, solved analytically for the
 * under-damped case. Integrating numerically would accumulate error and make
 * "does this conserve energy?" a question about the integrator instead of
 * about the physics.
 */
export function springState(p: SpringParams, t: number): SpringState {
  const omega0 = Math.sqrt(p.k / p.m);
  const zeta = p.c / (2 * Math.sqrt(p.k * p.m));

  if (zeta >= 1) {
    // Over-damped: falls back to the exponential solution with equal roots.
    const decay = Math.exp(-omega0 * t);
    return { x: p.x0 * decay * (1 + omega0 * t), v: -p.x0 * omega0 * omega0 * t * decay };
  }

  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * omega0 * t);
  const x = p.x0 * decay * (Math.cos(omegaD * t) + ((zeta * omega0) / omegaD) * Math.sin(omegaD * t));
  const v =
    -p.x0 * decay * ((omega0 * omega0) / omegaD) * Math.sin(omegaD * t);
  return { x, v };
}

/** Total mechanical energy: ½kx² + ½mv². */
export function springEnergy(s: SpringState, p: SpringParams): number {
  return 0.5 * p.k * s.x * s.x + 0.5 * p.m * s.v * s.v;
}

// ── Incline ──────────────────────────────────────────────────────────

export interface InclineParams {
  angleDeg: number;
  /** Coefficient of friction. */
  mu: number;
  g: number;
}

/**
 * Acceleration down a slope. Zero when friction wins — a block that stays put
 * must not be reported as accelerating backwards up the hill.
 */
export function inclineAcceleration({ angleDeg, mu, g }: InclineParams): number {
  const a = g * (Math.sin(rad(angleDeg)) - mu * Math.cos(rad(angleDeg)));
  return Math.max(0, a);
}

// ── Torque ───────────────────────────────────────────────────────────

export interface Load {
  /** kg. */
  mass: number;
  /** Signed distance from the pivot, m. Negative is to the left. */
  arm: number;
}

/** Net torque about the pivot, N·m. Positive tips to the right. */
export function balanceTorque(loads: Load[], g = 9.81): number {
  return loads.reduce((sum, l) => sum + l.mass * g * l.arm, 0);
}

// ── Circuit ──────────────────────────────────────────────────────────

export function seriesR(resistances: number[]): number {
  return resistances.reduce((a, b) => a + b, 0);
}

/** Parallel resistance. No branches is an open circuit; a 0 Ω branch is a short. */
export function parallelR(resistances: number[]): number {
  if (resistances.length === 0) return Infinity;
  if (resistances.some((r) => r === 0)) return 0;
  return 1 / resistances.reduce((sum, r) => sum + 1 / r, 0);
}

export function ohmCurrent(volts: number, resistance: number): number {
  return resistance === 0 ? Infinity : volts / resistance;
}

// ── DC motor ─────────────────────────────────────────────────────────

export interface MotorParams {
  volts: number;
  /** Winding resistance, Ω. */
  resistance: number;
  /** Torque constant, N·m/A. */
  kt: number;
  /** Back-EMF constant, V·s/rad. */
  ke: number;
  rpm: number;
}

export interface MotorState {
  current: number;
  torque: number;
  backEmf: number;
  mechanicalW: number;
  electricalW: number;
  efficiency: number;
}

/**
 * The standard DC motor model: the faster it spins, the more back-EMF it makes,
 * the less current flows, and the less torque it produces. That trade is the
 * whole lesson.
 */
export function dcMotor(p: MotorParams): MotorState {
  const omega = (p.rpm * 2 * Math.PI) / 60;
  const backEmf = p.ke * omega;
  const current = p.resistance === 0 ? 0 : (p.volts - backEmf) / p.resistance;
  const torque = p.kt * current;
  const mechanicalW = torque * omega;
  const electricalW = p.volts * current;
  return {
    current,
    torque,
    backEmf,
    mechanicalW,
    electricalW,
    efficiency: electricalW === 0 ? 0 : Math.max(0, mechanicalW / electricalW),
  };
}
