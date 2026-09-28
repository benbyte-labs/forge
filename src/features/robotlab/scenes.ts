import type { SceneId } from '../../content/types';

/**
 * Every arena the Robot Lab can render. Content referencing a scene not in
 * this list fails the content test rather than rendering an empty canvas.
 */
export const SCENE_IDS: SceneId[] = ['flat', 'obstacle', 'line', 'warehouse', 'arm-bench'];

/** Arenas that only open once a reward has unlocked them. */
export const SCENE_REQUIREMENTS: Partial<Record<SceneId, string>> = {
  warehouse: 'arena-warehouse',
};
