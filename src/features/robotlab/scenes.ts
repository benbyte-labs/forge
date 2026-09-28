import type { SceneId } from '../../content/types';
import { ARENAS, ARENA_REQUIREMENTS } from './arenas';

/**
 * Every arena the Robot Lab can render. Content referencing a scene not in
 * this list fails the content test rather than rendering an empty canvas.
 */
export const SCENE_IDS: SceneId[] = Object.keys(ARENAS) as SceneId[];

export const SCENE_REQUIREMENTS = ARENA_REQUIREMENTS;
