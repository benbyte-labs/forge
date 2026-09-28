import type { SceneId } from '../../content/types';
import type { World } from './rover';

/** Every arena the Robot Lab can render, keyed by the id content refers to. */
export const ARENAS: Record<SceneId, World> = {
  flat: {
    bounds: { x: 100, z: 100 },
    obstacles: [],
    goal: null,
    line: null,
  },

  obstacle: {
    bounds: { x: 100, z: 100 },
    obstacles: [
      { x: 30, z: 0, r: 10 },
      { x: -20, z: 35, r: 8 },
      { x: 10, z: -40, r: 12 },
    ],
    goal: { x: 70, z: 60, r: 12 },
    line: null,
  },

  line: {
    bounds: { x: 100, z: 100 },
    obstacles: [],
    goal: { x: 60, z: 60, r: 10 },
    line: [
      { x: -60, z: -60 },
      { x: -20, z: -40 },
      { x: 0, z: 0 },
      { x: 30, z: 30 },
      { x: 60, z: 60 },
    ],
  },

  warehouse: {
    bounds: { x: 120, z: 120 },
    obstacles: [
      { x: -40, z: -40, r: 14 },
      { x: 40, z: -40, r: 14 },
      { x: -40, z: 40, r: 14 },
      { x: 40, z: 40, r: 14 },
      { x: 0, z: 0, r: 10 },
    ],
    goal: { x: 90, z: 0, r: 14 },
    line: null,
  },

  'arm-bench': {
    bounds: { x: 60, z: 60 },
    obstacles: [],
    goal: null,
    line: null,
  },
};

export const ARENA_IDS = Object.keys(ARENAS) as SceneId[];

/** Arenas that a reward has to unlock first. */
export const ARENA_REQUIREMENTS: Partial<Record<SceneId, string>> = {
  warehouse: 'arena-warehouse',
};

/** Scenes that show the arm rather than the rover. */
export function isArmScene(scene: SceneId): boolean {
  return scene === 'arm-bench';
}
