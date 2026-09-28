import type { SceneId } from '../../content/types';
import { hasReward } from '../../engine/rewards';
import type { AppState } from '../../engine/types';
import { ROVER_RADIUS, type RoverState, type World } from './rover';

export interface Mission {
  id: string;
  sceneId: SceneId;
  titleKey: string;
  briefKey: string;
  /** Reward id that has to be held before this mission appears. */
  requires?: string;
  /** Decide, from the run the rover actually made, whether it succeeded. */
  check(trace: RoverState[], world: World): boolean;
}

/** Extra clearance a mission demands beyond merely not colliding. */
const CLEARANCE_CM = 3;
const LINE_TOLERANCE_CM = 18;

function finishedInGoal(trace: RoverState[], world: World): boolean {
  if (trace.length === 0 || !world.goal) return false;
  const last = trace[trace.length - 1];
  return Math.hypot(last.x - world.goal.x, last.z - world.goal.z) <= world.goal.r;
}

function keptClear(trace: RoverState[], world: World): boolean {
  return trace.every((p) =>
    world.obstacles.every((o) => Math.hypot(p.x - o.x, p.z - o.z) >= o.r + ROVER_RADIUS + CLEARANCE_CM),
  );
}

function distanceToSegment(p: { x: number; z: number }, a: { x: number; z: number }, b: { x: number; z: number }) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const lengthSq = dx * dx + dz * dz;
  if (lengthSq === 0) return Math.hypot(p.x - a.x, p.z - a.z);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / lengthSq));
  return Math.hypot(p.x - (a.x + t * dx), p.z - (a.z + t * dz));
}

function stayedOnLine(trace: RoverState[], world: World): boolean {
  const line = world.line;
  if (!line || line.length < 2) return false;
  return trace.every((p) => {
    let best = Infinity;
    for (let i = 0; i < line.length - 1; i++) best = Math.min(best, distanceToSegment(p, line[i], line[i + 1]));
    return best <= LINE_TOLERANCE_CM;
  });
}

function visitedCorners(trace: RoverState[], world: World): boolean {
  const corners = [
    { x: -world.bounds.x + 25, z: -world.bounds.z + 25 },
    { x: world.bounds.x - 25, z: -world.bounds.z + 25 },
    { x: -world.bounds.x + 25, z: world.bounds.z - 25 },
    { x: world.bounds.x - 25, z: world.bounds.z - 25 },
  ];
  return corners.every((c) => trace.some((p) => Math.hypot(p.x - c.x, p.z - c.z) < 30));
}

function mission(
  id: string,
  sceneId: SceneId,
  check: Mission['check'],
  requires?: string,
): Mission {
  return { id, sceneId, titleKey: `mission.${id}.title`, briefKey: `mission.${id}.brief`, requires, check };
}

/**
 * Every mission is decided by what the rover actually did, not by reading the
 * learner's code. A solution nothing like the model answer passes if it works,
 * and a plausible-looking one that drives into a wall does not.
 */
export const MISSIONS: Mission[] = [
  mission('park', 'flat', (trace, world) => trace.length > 1 && finishedInGoal(trace, world)),

  mission('reach-goal', 'obstacle', (trace, world) => trace.length > 1 && finishedInGoal(trace, world)),

  mission(
    'avoid',
    'obstacle',
    (trace, world) => trace.length > 1 && finishedInGoal(trace, world) && keptClear(trace, world),
  ),

  mission(
    'follow-line',
    'line',
    (trace, world) => trace.length > 1 && stayedOnLine(trace, world) && finishedInGoal(trace, world),
  ),

  mission(
    'warehouse-tour',
    'warehouse',
    (trace, world) => trace.length > 1 && visitedCorners(trace, world) && keptClear(trace, world),
    'arena-warehouse',
  ),

  mission(
    'warehouse-stack',
    'warehouse',
    (trace, world) =>
      trace.length > 1 &&
      finishedInGoal(trace, world) &&
      keptClear(trace, world) &&
      trace[trace.length - 1].gripping,
    'arena-warehouse',
  ),
];

export function missionById(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

/** The missions this learner can see, given what they have unlocked. */
export function availableMissions(state: AppState): Mission[] {
  return MISSIONS.filter((m) => !m.requires || hasReward(state, m.requires));
}

export function missionsForScene(state: AppState, sceneId: SceneId): Mission[] {
  return availableMissions(state).filter((m) => m.sceneId === sceneId);
}
