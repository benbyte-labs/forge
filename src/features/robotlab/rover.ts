/**
 * The rover's motion, as pure functions.
 *
 * Keeping the physics out of the Three.js scene means the behaviour a mission
 * is judged on can be tested without a canvas, and the renderer only ever draws
 * what these functions computed.
 */

export interface RoverState {
  /** Centimetres from the arena centre. */
  x: number;
  z: number;
  /** Degrees, 0 = towards +x, 90 = towards +z. */
  heading: number;
  gripping: boolean;
}

export interface Obstacle {
  x: number;
  z: number;
  r: number;
}

export interface World {
  bounds: { x: number; z: number };
  obstacles: Obstacle[];
  goal: { x: number; z: number; r: number } | null;
  /** Waypoints of a line to follow, if the arena has one. */
  line: { x: number; z: number }[] | null;
}

export type RoverCommand =
  | { k: 'forward'; cm: number }
  | { k: 'turn'; deg: number }
  | { k: 'grip'; closed: boolean };

/** Body radius used for collision, in centimetres. */
export const ROVER_RADIUS = 6;

/** How far the rover advances per simulation step when driving. */
const STEP_CM = 1;

export function initialRover(): RoverState {
  return { x: 0, z: 0, heading: 0, gripping: false };
}

export function normaliseHeading(deg: number): number {
  const n = deg % 360;
  return n < 0 ? n + 360 : n;
}

function hitsSomething(x: number, z: number, world: World): boolean {
  if (Math.abs(x) > world.bounds.x || Math.abs(z) > world.bounds.z) return true;
  return world.obstacles.some((o) => Math.hypot(o.x - x, o.z - z) < o.r + ROVER_RADIUS);
}

/**
 * Advance the rover by one command.
 *
 * Driving is stepped a centimetre at a time rather than teleported to the end
 * point, so the rover stops at the surface of an obstacle instead of tunnelling
 * straight through it.
 */
export function stepRover(
  state: RoverState,
  cmd: RoverCommand,
  world: World,
): { state: RoverState; collided: boolean } {
  switch (cmd.k) {
    case 'turn': {
      if (!Number.isFinite(cmd.deg)) return { state, collided: false };
      return { state: { ...state, heading: normaliseHeading(state.heading + cmd.deg) }, collided: false };
    }

    case 'grip':
      return { state: { ...state, gripping: cmd.closed }, collided: false };

    case 'forward': {
      if (!Number.isFinite(cmd.cm) || cmd.cm === 0) return { state, collided: false };

      const rad = (state.heading * Math.PI) / 180;
      const dir = cmd.cm >= 0 ? 1 : -1;
      const total = Math.abs(cmd.cm);
      const dx = Math.cos(rad) * STEP_CM * dir;
      const dz = Math.sin(rad) * STEP_CM * dir;

      let { x, z } = state;
      let travelled = 0;

      while (travelled < total) {
        const step = Math.min(STEP_CM, total - travelled);
        const nx = x + (dx * step) / STEP_CM;
        const nz = z + (dz * step) / STEP_CM;
        if (hitsSomething(nx, nz, world)) return { state: { ...state, x, z }, collided: true };
        x = nx;
        z = nz;
        travelled += step;
      }

      return { state: { ...state, x, z }, collided: false };
    }
  }
}

/** Distance to the nearest obstacle or wall straight ahead, in centimetres. */
export function distanceAhead(state: RoverState, world: World, maxCm = 200): number {
  const rad = (state.heading * Math.PI) / 180;
  for (let d = ROVER_RADIUS; d < maxCm; d += 1) {
    const x = state.x + Math.cos(rad) * d;
    const z = state.z + Math.sin(rad) * d;
    if (Math.abs(x) > world.bounds.x || Math.abs(z) > world.bounds.z) return d - ROVER_RADIUS;
    if (world.obstacles.some((o) => Math.hypot(o.x - x, o.z - z) < o.r)) return d - ROVER_RADIUS;
  }
  return maxCm;
}
